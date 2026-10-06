export class Inscription {
  #id; #courseScheduleId; #studentId; #registerDate; #active;

  constructor(id, courseScheduleId, studentId, registerDate, active = 1) {
    this.#id = id;
    this.#courseScheduleId = courseScheduleId;
    this.#studentId = studentId;
    this.#registerDate = registerDate;
    this.#active = active;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get courseScheduleId() { return this.#courseScheduleId; }
  set courseScheduleId(value) { this.#courseScheduleId = value; }

  get studentId() { return this.#studentId; }
  set studentId(value) { this.#studentId = value; }

  get registerDate() { return this.#registerDate; }
  set registerDate(value) { this.#registerDate = value; }

  get active() { return this.#active; }
  set active(value) { this.#active = value; }
}