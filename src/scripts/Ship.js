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
  #name;

  constructor(name) {
    if (!Ship.SHIPS_TYPES[name]) {
      throw new Error("Invalid ship type!");
    }
    this.#length = Ship.SHIPS_TYPES[name];
    this.#hits = 0;
    this.#name = name;
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

  get name() {
    return this.#name.slice();
  }
}

export default Ship;
