import { Person } from './Person.js';

export class Student extends Person {
  #code; #gender; #birthdate; #address; #cityId;

  constructor(id, code, firstName, lastName, identificationTypeId, identificationNumber, gender, birthdate, email, address, cityId) {
    super(id, firstName, lastName, identificationTypeId, identificationNumber, email);
    this.#code = code;
    this.#gender = gender;
    this.#birthdate = birthdate;
    this.#address = address;
    this.#cityId = cityId;
  }

  get code() { return this.#code; }
  set code(value) { this.#code = value; }

  get gender() { return this.#gender; }
  set gender(value) { this.#gender = value; }

  get birthdate() { return this.#birthdate; }
  set birthdate(value) { this.#birthdate = value; }

  get address() { return this.#address; }
  set address(value) { this.#address = value; }

  get cityId() { return this.#cityId; }
  set cityId(value) { this.#cityId = value; }
}