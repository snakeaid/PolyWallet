import { MoneyOperation } from './money-operation';
import { Query, Resolver } from '@nestjs/graphql';
import { OperationsService } from './operations.service';
import { CurrentUser, GqlGuard } from '../authentication/guards/gql.guard';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => MoneyOperation)
export class OperationsResolver {
  public constructor(private readonly operationsService: OperationsService) {}

  @UseGuards(GqlGuard)
  @Query((returns) => [MoneyOperation])
  public async operations(@CurrentUser() user) {
    const userOperations = await this.operationsService.getOperationsByUsername(user.username);

    return userOperations;
  }
}
