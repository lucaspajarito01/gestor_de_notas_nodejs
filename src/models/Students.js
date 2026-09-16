export class Student {
  #id; #code; #firstName; #lastName; #identificationTypeId; #identificationNumber; #gender; #birthdate; #email; #address; #cityId;

  constructor({ id, code, firstName, lastName, identificationTypeId, identificationNumber, gender, birthdate, email, address, cityId }) {
    this.#id = id;
    this.#code = code;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#identificationTypeId = identificationTypeId;
    this.#identificationNumber = identificationNumber;
    this.#gender = gender;
    this.#birthdate = new Date(birthdate);
    this.#email = email;
    this.#address = address;
    this.#cityId = cityId;
  }

  get id() { return this.#id; }
  get fullName() { return `${this.#firstName} ${this.#lastName}`; }
  get email() { return this.#email; }
}