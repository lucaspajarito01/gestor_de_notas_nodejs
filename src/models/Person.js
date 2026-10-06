export class Person {
  #id; #firstName; #lastName; #identificationTypeId; #identificationNumber; #email;

  constructor(id, firstName, lastName, identificationTypeId, identificationNumber, email) {
    if (new.target === Person) {
      throw new Error("No se puede instanciar una clase abstracta directamente.");
    }
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#identificationTypeId = identificationTypeId;
    this.#identificationNumber = identificationNumber;
    this.#email = email;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get firstName() { return this.#firstName; }
  set firstName(value) { this.#firstName = value; }

  get lastName() { return this.#lastName; }
  set lastName(value) { this.#lastName = value; }

  get identificationTypeId() { return this.#identificationTypeId; }
  set identificationTypeId(value) { this.#identificationTypeId = value; }

  get identificationNumber() { return this.#identificationNumber; }
  set identificationNumber(value) { this.#identificationNumber = value; }

  get email() { return this.#email; }
  set email(value) { this.#email = value; }
}