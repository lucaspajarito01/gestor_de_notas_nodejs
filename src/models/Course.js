export class Course {
  #id; #code; #description; #intensity; #weight; #active;

  constructor(id, code, description, intensity, weight, active = 1) {
    this.#id = id;
    this.#code = code;
    this.#description = description;
    this.#intensity = intensity;
    this.#weight = weight;
    this.#active = active;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get code() { return this.#code; }
  set code(value) { this.#code = value; }

  get description() { return this.#description; }
  set description(value) { this.#description = value; }

  get intensity() { return this.#intensity; }
  set intensity(value) { this.#intensity = value; }

  get weight() { return this.#weight; }
  set weight(value) { this.#weight = value; }

  get active() { return this.#active; }
  set active(value) { this.#active = value; }
}