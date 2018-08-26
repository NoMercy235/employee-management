import moment from 'moment';

export const EMPLOYEE_STEPS = {
  zero: '0',
  one: 'I',
  two: 'II',
  three: 'II',
};

export class EmployeeModel {
  public name: string;
  public hireDate: string;
  public step: string;

  constructor(metadata: any = {}) {
    this.name = metadata.name || '';
    this.hireDate = metadata.hireDate || '';
    this.step = metadata.step || EMPLOYEE_STEPS.zero;
  }

  public getExpectedStep(): string {
    const today = moment();
    const hiredOn = moment(this.hireDate);
    const months = today.diff(hiredOn, 'months', true);
    console.log(months.toFixed(2));
    return this.getStepFromMonths(months);
  }

  public getFriendlyHireDate(): string {
    return moment(this.hireDate).format('DD-MM-YYYY');
  }

  private getStepFromMonths(months: number): string {
    if (months < 12) {
      return EMPLOYEE_STEPS.zero;
    } else if (months >= 12 && months < 60) {
      return EMPLOYEE_STEPS.one;
    } else if (months >= 60 < 120) {
      return EMPLOYEE_STEPS.two;
    } else if (months >= 120) {
      return EMPLOYEE_STEPS.three;
    }
  }
}
