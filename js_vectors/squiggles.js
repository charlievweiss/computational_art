var BORDER = true;
var SQUIGGLE_SIZE;
var NUM_SQUIGGLES = 1;
var SQUIGGLE_POINTS = 20;

function setup(){
    createCanvas(750, 750, SVG);
    noLoop();
    if (BORDER) {
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(0, 0, width, height);
    }
    SQUIGGLE_SIZE = width/2;
}

function draw() {
    // drawMountains();
    for (var i = 0; i < NUM_SQUIGGLES; i++) {
        drawSquiggle();
    }
}

function drawSquiggle() {
    push();
    beginShape();
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

}