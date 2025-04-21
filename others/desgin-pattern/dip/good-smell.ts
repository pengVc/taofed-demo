abstract class SwitchableDevice {
  abstract activated: boolean

  abstract turnOn(): void

  abstract turnOff(): void
}

class Button {
  private device: SwitchableDevice

  constructor(device: SwitchableDevice) {
    this.device = device
  }

  pull() {
    if (this.device.activated) {
      this.device.turnOff()
    } else {
      this.device.turnOn()
    }
  }
}

class Lamp extends SwitchableDevice {
  activated: boolean = false

  turnOn() {
    this.activated = true
    console.log('light is on')
  }

  turnOff() {
    this.activated = false
    console.log('light is off')
  }
}

const lamp = new Lamp()
const button = new Button(lamp)

button.pull()
setTimeout(() => button.pull(), 1000)
