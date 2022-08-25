import p5 from "p5";
import P5PointerEvents from "./pointer-events";

const myp5 = new p5((s: p5) => {

  let pointerEvents: P5PointerEvents;
  var pressure = 0;

  s.setup = () => {
    const renderer = s.createCanvas(1200, 800);
    pointerEvents = new P5PointerEvents(s, renderer);
    s.background(128);
  };

  s.draw = () => {
    s.stroke(0);

    let p = pointerEvents;
    if(p.isDown) {
      // let dist = s.dist(p.currX, p.currY, p.lastX, p.lastY);
      // let normalizedDist = dist / 100;
      let strokeWeight = 1 + 20 * s.pow(pressure, 4);
      console.log(pressure);
      s.strokeWeight(strokeWeight);
      s.line(p.currX, p.currY, p.lastX, p.lastY);
    }
  };

  s.pointerMove = (ev) => {
    if(ev !== undefined) {
      pressure = ev.pressure;
    }
  };

  s.pointerUp = (ev) => {
    console.log(ev);
  }

});

export default myp5;