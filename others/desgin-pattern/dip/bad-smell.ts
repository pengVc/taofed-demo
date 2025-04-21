class BadButton {
  private lamp: BadLamp
  private activated: boolean

  constructor(lamp: BadLamp) {
    this.lamp = lamp
    this.activated = false
  }

  pull() {
    if (this.activated) {
      this.lamp.turnOff()
    } else {
      this.lamp.turnOn()
    }
  }
}

class BadLamp {
  constructor() {}

  turnOn() {
    console.log('light is on')
  }

  turnOff() {
    console.log('light is off')
  }
}

const badLamp = new BadLamp()
const badButton = new BadButton(badLamp)

badButton.pull()
setTimeout(() => badButton.pull(), 1000)
