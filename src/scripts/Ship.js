class Ship {
  static SHIPS_TYPES = {
    "carrier": 5,
    "battleship": 4,
    "destroyer": 3,
    "submarine": 3,
    "patrol boat": 2,
  };
  #hits;
  #length;

  constructor(name) {
    if (!SHIPS_TYPES[name]) {
      throw new Error("Invalid ship type!");
    }
    this.#length = SHIPS_TYPES[name];
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
