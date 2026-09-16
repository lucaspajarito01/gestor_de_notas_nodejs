export class Topic {
  #id; #courseId; #code; #title; #description; #active;

  constructor({ id, courseId, code, title, description, active = 1 }) {
    this.#id = id;
    this.#courseId = courseId;
    this.#code = code;
    this.#title = title;
    this.#description = description;
    this.#active = Boolean(active);
  }

  get title() { return this.#title; }
}