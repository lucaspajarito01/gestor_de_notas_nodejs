export class Topic {
  #id; #courseId; #code; #title; #description; #active;

  constructor(id, courseId, code, title, description, active = 1) {
    this.#id = id;
    this.#courseId = courseId;
    this.#code = code;
    this.#title = title;
    this.#description = description;
    this.#active = active;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get courseId() { return this.#courseId; }
  set courseId(value) { this.#courseId = value; }

  get code() { return this.#code; }
  set code(value) { this.#code = value; }

  get title() { return this.#title; }
  set title(value) { this.#title = value; }

  get description() { return this.#description; }
  set description(value) { this.#description = value; }

  get active() { return this.#active; }
  set active(value) { this.#active = value; }
}