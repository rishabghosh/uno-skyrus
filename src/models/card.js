class Card {}

class NumberedCard extends Card {
  constructor(number, color) {
    super();
    this.number = number;
    this.color = color;
  }

  canPlayOnTopOf(otherCard, runningColor, hasDrawnTwo) {
    if (otherCard.isSkipCard || !otherCard.isDrawTwo || hasDrawnTwo) {
      return runningColor == this.color || otherCard.number == this.number;
    }
    return false;
  }

  action(currentPlayerIndex) {
    return ++currentPlayerIndex;
  }

  getColor() {
    return this.color;
  }

  logMessage() {
    return this.number + ' ' + this.color;
  }
}

class WildCard extends Card {
  constructor() {
    super();
    this.isWildCard = true;
    this.isColorDeclared = false;
  }

  action(currentPlayerIndex) {
    this.isColorDeclared = false;
    return currentPlayerIndex;
  }

  canPlayOnTopOf() {
    return true;
  }

  logMessage() {
    return 'wildcard';
  }

  setColorAsDeclared() {
    this.isColorDeclared = true;
  }
}

class DrawTwo extends Card {
  constructor(color) {
    super();
    this.symbol = '+2';
    this.color = color;
    this.isDrawTwo = true;
  }

  action(currentPlayerIndex) {
    return ++currentPlayerIndex;
  }

  canPlayOnTopOf(otherCard, runningColor) {
    return runningColor == this.color || otherCard.symbol === this.symbol;
  }

  getColor() {
    return this.color;
  }

  logMessage() {
    return this.symbol + ' ' + this.color;
  }
}

class SkipCard extends Card {
  constructor(symbol, color) {
    super();
    this.color = color;
    this.isSkipCard = true;
    this.symbol = symbol;
  }

  action(currentPlayerIndex) {
    return currentPlayerIndex + 2;
  }

  canPlayOnTopOf(topDiscard, runningColor) {
    return runningColor == this.color || topDiscard.isSkipCard === true;
  }

  logMessage() {
    return `Skip ${this.color}`;
  }

  getColor() {
    return this.color;
  }
}

module.exports = { NumberedCard, WildCard, SkipCard, DrawTwo };
