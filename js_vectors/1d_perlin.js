// I think there's a memory problem -- fails above certain amount of lines
// SOLVED: It was Google Chrome. Use Firefox instead

var BORDER = true;

function setup(){
    createCanvas(750, 750, SVG);
    noLoop();
    if (BORDER) {
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(0, 0, width, height);
    }
}

function draw() {
    drawMountains();   
}

function drawMountains() {
    // background(0);
    stroke(0);
    noFill();
    var smooth = true; // offsets xoff
    var spacing = 6;
    var x_start = 0;
    var max_y = height/3;
    var num_lines = max_y / spacing; 
    var max_amplitude = 400;
    var amplitude = 0;
    // var amplitude = -1 * max_amplitude;
    var amp_off = max_amplitude / num_lines; // positive to negative
    var xoff = 0;
    var xoff_amp = .5; // controls change of offset
    var xoff_ampoff = xoff_amp/30; // controls jaggedness
    for (var i = 0; i < max_y; i += spacing) {
        if (smooth) { // change between -xoff_amp and positive xoff_amp
            if (xoff > xoff_amp || (xoff < -1*xoff_amp)) { //switch at boundaries
                xoff_ampoff *= -1; // controls wave variance?
            }
            xoff += xoff_ampoff;
        }
        drawLine(i, x_start, amplitude, xoff);
        amplitude += amp_off;
    }
    save("mountains.svg");
    save("mountains.png");
}

function drawLine(y_start, x_start, amplitude, xoff) {
    // draw line from starting point
    beginShape();
    // var xoff = 0;
    for (let x = 0; x < width; x++) {
        var y = y_start + (noise(xoff+x_start) * amplitude);
        curveVertex(x, y);

        xoff += 0.01;
    }
    endShape();
    // save("test.svg")
}