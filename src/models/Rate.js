export class Rate {
  #id; #inscriptionId; #rate; #comments;

  constructor(id, inscriptionId, rate, comments) {
    this.#id = id;
    this.#inscriptionId = inscriptionId;
    this.#rate = rate;
    this.#comments = comments;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get inscriptionId() { return this.#inscriptionId; }
  set inscriptionId(value) { this.#inscriptionId = value; }

  get rate() { return this.#rate; }
  set rate(value) { this.#rate = value; }

  get comments() { return this.#comments; }
  set comments(value) { this.#comments = value; }
}