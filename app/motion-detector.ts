import { Gpio } from 'onoff';

export default class MotionDetector {
    private interval: any; // delegate to interval function
    private led: Gpio; // LED Pin on raspberry PI
    private motionDetector: Gpio; // Motion Detector Pin on raspberry PI
    private lastDetectorValue: number = 0; //Last motion detector value

    constructor(ledPin: number, motionDetectorPin: number) { 

        this.led = new Gpio(ledPin, "out");
        this.motionDetector = new Gpio(motionDetectorPin, "in");

        //context binding
        this.run = this.run.bind(this);
        this.checkMotionDetectorState = this.checkMotionDetectorState.bind(this);
        this.turnOffLed = this.turnOffLed.bind(this);
    }

    run() {
        this.interval = setInterval(this.checkMotionDetectorState, 500);

        //the operation if user use ctrl + c
        process.on('SIGINT', this.turnOffLed);
    }

    private checkMotionDetectorState(): void {
        //get motion detector vaalue
        let value = this.motionDetector.readSync();

        if (value !== this.lastDetectorValue) {//if motion detector current value is different than last value - update it
            this.lastDetectorValue = value;
            this.led.writeSync(value); // turn on/off led 
            console.log(value == 1 ? 'Motion detected!' : 'No movement.');
        }
    }

    private turnOffLed(): void {
        console.log("-- Thank you for use Motion Detector app --")

        this.led.writeSync(0);

        //clear delegate to interval function
        clearInterval(this.interval);
    }
}