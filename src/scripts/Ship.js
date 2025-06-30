class Ship {
  #hits;
  #length;
  #sunk;

  constructor(length=0) {
    this.#length = length;
    this.#hits = 0;
    this.#sunk = false;
  }

  hit() {
    this.#hits += 1;
    return this.isSunk();
  }

  isSunk() {
    this.#sunk = this.#hits >= this.#length;
    return this.#sunk;
  }

  get hits() {
    return this.#hits;
  }
}

export default Ship;
