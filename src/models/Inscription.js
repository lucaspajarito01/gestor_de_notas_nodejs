export class Inscription {
  #id; #courseScheduleId; #studentId; #registerDate; #active;

  constructor({ id, courseScheduleId, studentId, registerDate = new Date(), active = 1 }) {
    this.#id = id;
    this.#courseScheduleId = courseScheduleId;
    this.#studentId = studentId;
    this.#registerDate = new Date(registerDate);
    this.#active = Boolean(active);
  }

  get id() { return this.#id; }
}