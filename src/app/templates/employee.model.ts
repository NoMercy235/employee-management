import moment, { Moment } from 'moment';

export const EMPLOYEE_STEPS = {
  zero: '0',
  one: 'I',
  two: 'II',
  three: 'II',
};

export class EmployeeModel {
  public name: string;
  public hireDate: Moment;
  public step: string;

  constructor(metadata: any = {}) {
    this.name = metadata.name || '';
    if (typeof <any>metadata.hireDate === 'string') {
      this.hireDate = moment.utc(metadata.hireDate);
    } else {
      this.hireDate = metadata.hireDate;
    }
    this.step = metadata.step || EMPLOYEE_STEPS.zero;
  }

  public setStep(months: number): void {
    this.step = this.getStepFromMonths(months);
  }

  public getHiredMonths(): number {
    const today = moment.utc();
    return +(today
      .diff(this.hireDate, 'months', true)
      .toFixed(2));
  }

  public getExpectedStepClass(): string {
    const months = this.getHiredMonths();

    const redMonths = months + 1;
    if (this.getStepFromMonths(redMonths) !== this.step) {
      return 'em-red';
    }

    const yellowMonths = months + 2;
    if (this.getStepFromMonths(yellowMonths) !== this.step) {
      return 'em-yellow';
    }

    return '';
  }

  public getFriendlyHireDate(): string {
    return this.hireDate.format('DD-MM-YYYY');
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
