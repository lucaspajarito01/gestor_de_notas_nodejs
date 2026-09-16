export class Rate {
  #id; #inscriptionId; #rate; #comments;

  constructor({ id, inscriptionId, rate, comments }) {
    this.#id = id;
    this.#inscriptionId = inscriptionId;
    this.#rate = rate;
    this.#comments = comments;
  }

  get rate() { return this.#rate; }
}