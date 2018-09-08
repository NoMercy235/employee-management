import * as moment from 'moment';
import { Moment } from 'moment';

export const EMPLOYEE_STEPS = {
  zero: '0',
  one: 'I',
  two: 'II',
  three: 'III',
};

export const EMPLOYEE_FIELDS = {
  name: { name: 'name', label: 'Nume' },
  hireDate: { name: 'hireDate', label: 'Data angajare' },
  step: { name: 'step', label: 'Treapta' },
  experienceMonths: { name: 'experienceMonths', label: 'Luni experienta' },
  observations: { name: 'observations', label: 'Observatii' },
};

export class EmployeeModel {
  public name: string;
  public hireDate: Moment;
  public step: string;
  public experienceMonths: number;

  constructor(metadata: any = {}) {
    this.name = metadata.name || '';
    if (typeof <any>metadata.hireDate === 'string') {
      this.hireDate = moment.utc(metadata.hireDate);
    } else {
      this.hireDate = metadata.hireDate;
    }
    this.step = metadata.step || EMPLOYEE_STEPS.zero;
    this.experienceMonths = +metadata.experienceMonths || 0;
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

  public getExpectedStep(offset: number = 0): string {
    const months = this.getHiredMonths() + this.experienceMonths + offset;

    return this.getStepFromMonths(months);
  }

  public getExpectedStepClass(): string {
    if (this.getExpectedStep(1) !== this.step) {
      return 'em-red';
    }

    if (this.getExpectedStep(2) !== this.step) {
      return 'em-yellow';
    }

    return '';
  }

  public getFriendlyHireDate(): string {
    return this.hireDate.format('DD-MM-YYYY');
  }

  public getTotalExpMonths(): number {
    return +(this.experienceMonths + this.getHiredMonths().toFixed(0));
  }

  public getMonthsUntilStepChange(): number {
    const months = this.getHiredMonths() + this.experienceMonths;
    switch (this.step) {
      case EMPLOYEE_STEPS.zero:
        return 12 - months;
      case EMPLOYEE_STEPS.one:
        return 60 - months;
      case EMPLOYEE_STEPS.two:
        return 120 - months;
      case EMPLOYEE_STEPS.three:
        return 0;
    }
  }

  private getStepFromMonths(months: number): string {
    if (months < 12) {
      return EMPLOYEE_STEPS.zero;
    } else if (months >= 12 && months < 60) {
      return EMPLOYEE_STEPS.one;
    } else if (months >= 60 && months < 120) {
      return EMPLOYEE_STEPS.two;
    } else if (months >= 120) {
      return EMPLOYEE_STEPS.three;
    }
  }

  public cleanField(field: string): any {
    switch (field) {
      case EMPLOYEE_FIELDS.name.name:
        return this.getCleanedName();
      case EMPLOYEE_FIELDS.hireDate.name:
        return this.getCleanedHiredDate();
      case EMPLOYEE_FIELDS.step.name:
        return this.getCleanedStep();
      case EMPLOYEE_FIELDS.experienceMonths.name:
        return this.getCleanedExpMonths();
    }
  }

  private getCleanedName(): string {
    return this.name;
  }

  private getCleanedHiredDate(): string {
    return this.getFriendlyHireDate();
  }

  private getCleanedStep(): string {
    return this.step;
  }

  private getCleanedExpMonths(): number {
    return this.getTotalExpMonths();
  }
}
