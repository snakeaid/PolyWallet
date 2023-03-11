export abstract class AbstractBank {
  public name: string;

  protected abstract getRequest();

  protected abstract postRequest();
}
