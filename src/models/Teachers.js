import { Person } from './Person.js';

export class Teacher extends Person {
  constructor(id, firstName, lastName, identificationTypeId, identificationNumber, email) {
    super(id, firstName, lastName, identificationTypeId, identificationNumber, email);
  }
}