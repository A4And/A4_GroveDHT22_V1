// Grove DHT22 (Temperature & Humidity Sensor Pro) - MakeCode micro:bit extension
// Single exposed block: read temperature or humidity on a selected pin.

//% color=#2F5597 icon="\uf2c9" block="Grove DHT22"
namespace groveDHT22 {

    export enum DHT22Data {
        //% block="Temperature (°C)"
        TemperatureC = 0,
        //% block="Humidity (%HR)"
        Humidity = 1
    }

    export enum DHT22Pin {
        //% block="P0"
        P0 = 0,
        //% block="P1"
        P1 = 1,
        //% block="P2"
        P2 = 2,
        //% block="P8"
        P8 = 8,
        //% block="P15"
        P15 = 15
    }

    function toDigitalPin(pin: DHT22Pin): DigitalPin {
        switch (pin) {
            case DHT22Pin.P0: return DigitalPin.P0
            case DHT22Pin.P1: return DigitalPin.P1
            case DHT22Pin.P2: return DigitalPin.P2
            case DHT22Pin.P8: return DigitalPin.P8
            case DHT22Pin.P15: return DigitalPin.P15
            default: return DigitalPin.P0
        }
    }

    let lastReadMs = -999999
    let lastTempC = NaN
    let lastHum = NaN
    let lastOk = false
    let hasValidSample = false
    let lastPin = -1
    let sensorBootstrapped = false

    const MIN_INTERVAL_MS = 2000
    const PULSE_TIMEOUT_US = 10000
    const MAX_RETRIES = 3
    const RETRY_PAUSE_MS = 60

    function waitForLevel(pin: DigitalPin, level: number, timeoutUs: number): boolean {
        const start = control.micros()
        while (pins.digitalReadPin(pin) != level) {
            if (control.micros() - start > timeoutUs) return false
        }
        return true
    }

    function measureHighPulse(pin: DigitalPin, timeoutUs: number): number {
        if (!waitForLevel(pin, 1, timeoutUs)) return 0

        const start = control.micros()
        while (pins.digitalReadPin(pin) == 1) {
            if (control.micros() - start > timeoutUs) return 0
        }
        return control.micros() - start
    }

    function readOnce(pin: DigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        pins.digitalWritePin(pin, 1)
        control.waitMicros(40)

        pins.digitalWritePin(pin, 0)
        basic.pause(2)

        pins.digitalWritePin(pin, 1)
        control.waitMicros(40)

        pins.digitalReadPin(pin)
        pins.setPull(pin, PinPullMode.PullUp)

        if (!waitForLevel(pin, 0, PULSE_TIMEOUT_US)) return false
        if (!waitForLevel(pin, 1, PULSE_TIMEOUT_US)) return false
        if (!waitForLevel(pin, 0, PULSE_TIMEOUT_US)) return false

        const data: number[] = [0, 0, 0, 0, 0]

        for (let i = 0; i < 40; i++) {
            const highPulse = measureHighPulse(pin, PULSE_TIMEOUT_US)
            if (highPulse == 0) return false

            const bit = highPulse > 50 ? 1 : 0
            const byteIndex = Math.idiv(i, 8)
            const bitIndex = 7 - (i % 8)
            if (bit) data[byteIndex] |= (1 << bitIndex)
        }

        const sum = (data[0] + data[1] + data[2] + data[3]) & 0xFF
        if (sum != data[4]) return false

        const rawHum = (data[0] << 8) | data[1]
        const hum = rawHum / 10.0

        const rawTemp = ((data[2] & 0x7F) << 8) | data[3]
        let temp = rawTemp / 10.0
        if (data[2] & 0x80) temp = -temp

        if (hum < 0 || hum > 100) return false
        if (temp < -40 || temp > 80) return false

        lastHum = hum
        lastTempC = temp
        hasValidSample = true
        return true
    }

    function readWithRetry(pin: DigitalPin): boolean {
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            if (readOnce(pin)) return true
            basic.pause(RETRY_PAUSE_MS)
        }
        return false
    }

    function ensureFresh(pin: DigitalPin): void {
        const currentPin = pin as number
        if (currentPin != lastPin) {
            lastPin = currentPin
            lastReadMs = -999999
            hasValidSample = false
            sensorBootstrapped = false
        }

        if (!sensorBootstrapped) {
            basic.pause(1200)
            sensorBootstrapped = true
        }

        const now = control.millis()
        if (now - lastReadMs < MIN_INTERVAL_MS) return

        lastReadMs = now
        lastOk = readWithRetry(pin)
    }

    //% block="Read %what|on %pin"
    export function read(what: DHT22Data, pin: DHT22Pin): number {
        const dpin = toDigitalPin(pin)
        ensureFresh(dpin)
        if (!lastOk && !hasValidSample) return NaN
        return what == DHT22Data.TemperatureC ? lastTempC : lastHum
    }
}
