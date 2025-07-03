class Ship {
  #hits;
  #length;

  constructor(length=0) {
    this.#length = length;
    this.#hits = 0;    
  }

  hit() {
    this.#hits += 1;
    return this.isSunk();
  }

  isSunk() {
    return this.#hits >= this.#length;
  }

  get hits() {
    return this.#hits;
  }

  get length() {
    return this.#length;
  }
}

export default Ship;
