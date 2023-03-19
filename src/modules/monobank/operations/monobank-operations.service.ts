import { Injectable } from '@nestjs/common';
import { MonobankCredentialsModel } from '../credentials/monobank-credentials.model';
import { MonobankClientInfoService } from '../client-info/monobank-client-info.service';
import { MoneyOperation } from '../../operations/money-operation';
import { OperationsService } from '../../operations/operations.service';
import { MonobankAPI } from '../monobank.api';
import { ScopeLogger } from 'src/modules/logger/scope-logger';
import { LoggerService } from '../../logger/logger.service';
import * as currencyCodes from 'currency-codes';
import * as mcc from 'merchant-category-code';
import { delay } from '../../../shared/utils/delay';
import { unixSecondsNow } from '../../../shared/utils/unix-seconds-now';

@Injectable()
export class MonobankOperationsService {
  private readonly logger: ScopeLogger;

  public constructor(
    private readonly operationsService: OperationsService,
    private readonly clientInfoService: MonobankClientInfoService,
    private readonly api: MonobankAPI,
    loggerService: LoggerService,
  ) {
    loggerService.setContext(MonobankOperationsService.name);
    this.logger = loggerService.toScopeLogger(null);
  }

  public async saveOldOperations(username: string, credentialsModel: MonobankCredentialsModel) {
    this.logger.debug(`Saving ${username} old operations to DB...`);

    const oldOperations = await this.getOldOperations(username, credentialsModel);
    await Promise.allSettled(
      oldOperations.map(async (operation) => this.operationsService.addOperation(operation)),
    );
  }

  private async getOldOperations(
    username: string,
    credentialsModel: MonobankCredentialsModel,
  ): Promise<MoneyOperation[]> {
    const clientInfo = await this.clientInfoService.getClientInfoByUsername(username);
    const clientAccounts = clientInfo.accounts;

    const operations: MoneyOperation[] = [];

    for (const account of clientAccounts) {
      const accountOperations = await this.getOperationsFromAccount(
        username,
        credentialsModel,
        account.id,
      );
      operations.push(...accountOperations);
    }

    return operations;
  }

  private async getOperationsFromAccount(
    username: string,
    credentialsModel: MonobankCredentialsModel,
    accountId: string,
  ): Promise<MoneyOperation[]> {
    const statement = await this.getAccountStatement(accountId, credentialsModel.token);

    const statementOperations: MoneyOperation[] = statement.map((monobankOperation) =>
      this.createOperationFromMonobankOperation(username, monobankOperation),
    );

    return statementOperations;
  }

  private async getAccountStatement(accountId: string, token: string) {
    const maximumStatementPeriod = (31 * 24 + 1) * 60 * 60; // 31 days + 1 hour

    let toTime = unixSecondsNow();
    let fromTime = toTime - maximumStatementPeriod;

    const accountStatement = [];
    let periodCount = 0;

    while (true) {
      const statementResponse = await this.api.getStatement(accountId, fromTime, toTime, token);
      const periodStatement: [] = statementResponse.data;
      periodCount++;

      await delay(60 * 1000); // because of monobank rate limiting

      if (periodStatement.length === 0 && periodCount >= 12) {
        break;
      }

      accountStatement.push(...periodStatement);

      toTime -= maximumStatementPeriod;
      fromTime -= maximumStatementPeriod;
    }

    return accountStatement;
  }

  private createOperationFromMonobankOperation(
    username: string,
    monobankOperation,
  ): MoneyOperation {
    const operation: MoneyOperation = {
      username: username,
      timestamp: monobankOperation.time,
      description: monobankOperation.description,
      amount: monobankOperation.amount / 100,
      currency: currencyCodes.number(monobankOperation.currencyCode).code,
      category: mcc(monobankOperation.mcc)
        ? mcc(monobankOperation.mcc).edited_description
        : 'Other',
      source: 'monobank',
    };

    return operation;
  }
}
