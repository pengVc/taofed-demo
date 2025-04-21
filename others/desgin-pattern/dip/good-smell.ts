abstract class SwitchableDevice {
  abstract turnOn(): void

  abstract turnOff(): void
}

class Button {
  private device: SwitchableDevice
  private activated: boolean

  constructor(device: SwitchableDevice) {
    this.device = device
    this.activated = false
  }

  pull() {
    if (this.activated) {
      this.device.turnOff()
    } else {
      this.device.turnOn()
    }
  }
}

class Lamp extends SwitchableDevice {
  turnOn() {
    console.log('light is on')
  }

  turnOff() {
    console.log('light is off')
  }
}

const lamp = new Lamp()
const button = new Button(lamp)

button.pull()
setTimeout(() => button.pull(), 1000)
