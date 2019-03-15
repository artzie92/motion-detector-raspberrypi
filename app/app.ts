import MotionDetector from './motion-detector';
const LED_PIN = 18;
const MOTION_DETECTOR_PIN = 15;

console.log("-- Welcome in motion detector app --",);

//Initialize application
new MotionDetector(LED_PIN, MOTION_DETECTOR_PIN).run();