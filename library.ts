
/**
 * Functions to operate a Led Light
 */
//% block="LED Light"
//% weight=9 color=#e86800 icon="\uf0a9"
namespace rb0ledlight {

    const MAXBRIGHTNESS = 1023;

    let brightness_pins: DigitalPin[] = []
    let brightness_values: number[] = []

    function setBrightness(pin: DigitalPin, value: number): void {
        let index = brightness_pins.indexOf(pin)

        //set brightness between 0-100%
        value = Math.max(0, Math.min(100, value));

        if (index < 0) {
            brightness_pins.push(pin)
            brightness_values.push(value)
        } else {
            brightness_values[index] = value
        }

        const aBright = (value / 100) * MAXBRIGHTNESS;
        pins.analogWritePin(pin, aBright);
    }

    function getBrightness(pin: DigitalPin): number {
        let index = brightness_pins.indexOf(pin)
        return index < 0 ? 0 : brightness_values[index]
    }

    /**
    * Initialize Led Light
    * @param port Keyestudio port where the LED is connected
    */
    //% blockId="rb0ledlight_simplecreate"
    //% block="LED light at port %port" 
    //% weight=90 color=100 blockGap=24
    //% port.defl=KeyestudioPort.P0
    export function rb0ledlight_simplecreate(port: KeyestudioPort) {
        let pin1 = rb0base.getPinFromKeyestudioPort(port);
        rb0base.enablePin(pin1);
        setBrightness(pin1, 0);
    }

    /**
    * Initialize Led Light
    * @param pin1 pin that led light is connected
    */
    //% blockId="rb0ledlight_advancedcreate"
    //% block="LED light at pin %pin2" 
    //% weight=90 color=100 blockGap=24 advanced=true
    //% pin1.defl=DigitalPin.P0
    export function rb0ledlight_advancedcreate(pin1: DigitalPin) {
        rb0base.enablePin(pin1);
        setBrightness(pin1, 0);
    }

    /**
    * Turn on led light
    * @param port Keyestudio port where the LED is connected
    */
    //% blockId="rb0ledlight_simpleturnon"
    //% block="turn on LED light at port %port" 
    //% weight=90 blockGap=8
    //% port.defl=KeyestudioPort.P0
    export function rb0ledlight_simpleturnon(port: KeyestudioPort) {
        let pin1 = rb0base.getPinFromKeyestudioPort(port);
        rb0base.enablePin(pin1);
        setBrightness(pin1, 0);
    }

    /**
    * Turn off led light
    * @param port Keyestudio port where the LED is connected
    */
    //% blockId="rb0ledlight_simpleturnoff"
    //% block="turn off LED light at port %port" 
    //% weight=90 blockGap=24
    //% port.defl=KeyestudioPort.P0
    export function rb0ledlight_simpleturnoff(port: KeyestudioPort) {
        let pin1 = rb0base.getPinFromKeyestudioPort(port);
        rb0base.enablePin(pin1);
        setBrightness(pin1, 0);
    }

    /**
    * Set Led Light Brightness
    * @param port Keyestudio port where the LED is connected
    * @param value brightness value in percentage
    */
    //% blockId="rb0ledlight_simpleSetBrightnesss"
    //% block="set %port LED brightness to %value\\%"
    //% weight=90 blockGap=8
    //% port.defl=KeyestudioPort.P0
    //% value.defl=100 value.min=0 value.max=100
    export function rb0ledlight_simpleSetBrightness(port: KeyestudioPort, value: number) {
        let pin1 = rb0base.getPinFromKeyestudioPort(port);
        setBrightness(pin1, value);
    }

    /**
    * Change Led Light Brightness
    * @param port Keyestudio port where the LED is connected
    * @param step how much to change the current led light brightness
    */
    //% blockId="rb0ledlight_simpleChangeBrightnesss"
    //% block="change %port LED brightness by %step\\%"
    //% weight=90 blockGap=8
    //% port.defl=KeyestudioPort.P0
    //% step.defl=1
    export function rb0ledlight_simpleChangeBrightness(port: KeyestudioPort, step: number) {
        let pin1 = rb0base.getPinFromKeyestudioPort(port);
        let br1 = getBrightness(pin1);
        setBrightness(pin1, br1 + step);
    }

    /**
    * Writes a digital value to the selected port.
    * @param port Keyestudio port where the LED is connected
    * @param bit Digital value (0 or 1)
    */
    //% blockId="rb0ledlight_advancedsetbit"
    //% block="set %port LED light to %bit" 
    //% weight=90 blockGap=8 advanced=true
    //% port.defl=KeyestudioPort.P0
    //% bit.min=0 bit.defl=1 bit.max=1
    export function rb0ledlight_setBit(port: KeyestudioPort, bit: number) {
        let pin1 = rb0base.getPinFromKeyestudioPort(port);
        pins.digitalWritePin(pin1, bit)
    }
}