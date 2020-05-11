var BORDER = true;
var SQUIGGLE_SIZE;
var NUM_SQUIGGLES = 1;
var SQUIGGLE_POINTS = 20;
let PALETTE = [];
let COLOR;
var FILL = true;
var SAVE = false;

function setup(){
    var canvas = createCanvas(500, 500, SVG);
    canvas.position(0, 0);
    fill(255);
    noLoop();
    PALETTE = [
        color(255, 57, 354), // pink
        color(4, 0, 152), // blue
    ];
    if (BORDER) {
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(0, 0, width, height);
    }
    SQUIGGLE_SIZE = width/2;
}

function draw() {
    // for (var i = 0; i < NUM_SQUIGGLES; i++) {
    //     drawSquiggle();
    // }
    COLOR = PALETTE[0];
    test = drawSquiggle();
    COLOR = PALETTE[1];
    test2 = drawSquiggle();
    if (SAVE) {
        saveSVG(test, "check.svg")
        saveSVG(tes2, "check2.svg")
    }
}

function drawSquiggle() {
    if (FILL) {
        fill(COLOR)
    }
    stroke(COLOR)
    push();
    shape = beginShape();
    var x = 0;
    var y = 0;
    translate(random(width-SQUIGGLE_SIZE), random(height-SQUIGGLE_SIZE));
    for (var i = 0; i < SQUIGGLE_POINTS; i++) {
        x = random(SQUIGGLE_SIZE);
        y = random(SQUIGGLE_SIZE);
        curveVertex(x, y);
    }
    endShape();
    pop();

    return shape
}