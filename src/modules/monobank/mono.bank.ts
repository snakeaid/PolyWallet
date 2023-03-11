import { AbstractBank } from '../../shared/abstractions/bank.interface';

export class MonoBank extends AbstractBank {
  public name = 'monobank';

  protected getRequest() {}

  protected postRequest() {}
}
