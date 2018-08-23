import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
        return { year: this.toInteger(dateParts[0]), month: null, day: null };
      } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
        return { year: this.toInteger(dateParts[0]), month: this.toInteger(dateParts[1]), day: null };
      } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
        return { year: this.toInteger(dateParts[0]), month: this.toInteger(dateParts[1]), day: this.toInteger(dateParts[2]) };
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    if (!date) return '';
    const day = `${this.isNumber(date.day) ? this.padNumber(date.day) : ''}`;
    const month = `${this.isNumber(date.month) ? this.padNumber(date.month) : ''}`;
    return `${day}-${month}-${date.year}`;
  }

  private toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  private isNumber(value: any): value is number {
    return !isNaN(this.toInteger(value));
  }

  private padNumber(value: number) {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

}
