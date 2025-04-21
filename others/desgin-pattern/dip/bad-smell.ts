class BadButton {
  private lamp: BadLamp

  constructor(lamp: BadLamp) {
    this.lamp = lamp
  }

  pull() {
    if (this.lamp.activated) {
      this.lamp.turnOff()
    } else {
      this.lamp.turnOn()
    }
  }
}

class BadLamp {
  activated: boolean

  constructor() {}

  turnOn() {
    this.activated = true
    console.log('light is on')
  }

  turnOff() {
    this.activated = false
    console.log('light is off')
  }
}

const badLamp = new BadLamp()
const badButton = new BadButton(badLamp)

badButton.pull()
setTimeout(() => badButton.pull(), 1000)
