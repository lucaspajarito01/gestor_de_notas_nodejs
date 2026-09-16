export class Teacher {
  #id; 
  #firstName; 
  #lastName; 
  #identificationTypeId; 
  #identificationNumber; 
  #email;

  constructor({ id, firstName, lastName, identificationTypeId, identificationNumber, email }) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#identificationTypeId = identificationTypeId;
    this.#identificationNumber = identificationNumber;
    this.#email = email;
  }

  get id() { return this.#id; }
  get fullName() { return `${this.#firstName} ${this.#lastName}`; }
  get email() { return this.#email; }
}