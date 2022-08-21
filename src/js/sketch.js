let myp5 = new p5((s) => {

  let pointerEvents;
  var pressure = 0;

  s.setup = () => {
    pointerEvents = new p5PointerEvents(s);
    s.createCanvas(1200, 800);
    s.background(128);
  };

  s.draw = () => {
    s.stroke(0);

    let p = pointerEvents;
    if(p.isDown) {
      // let dist = s.dist(p.currX, p.currY, p.lastX, p.lastY);
      // let normalizedDist = dist / 100;
      let strokeWeight = 1 + 20 * s.pow(pressure, 4);
      // console.log(pressure);
      s.strokeWeight(strokeWeight);
      s.line(p.currX, p.currY, p.lastX, p.lastY);
    }
  };

  s.pointerMove = (ev) => {
    pressure = ev.pressure;
  }

});