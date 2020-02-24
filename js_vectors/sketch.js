
const CRYSTAL_SIZE = 500;
const SIDES = 6;
let PALETTE = [];
// things for sine wave
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


function setup(){
    createCanvas(500, 500, SVG);
    
    PALETTE = [
        color(255, 57, 354), // pink
        color(4, 0, 152), // blue
    ];
    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    noLoop();
    // angleMode(DEGREES);
    rectMode(CENTER);
}

function draw(){
    // testLines()
    // drawCurves();
    background(0);
    calcWave();
    renderWave();
}

function calcWave() {
    theta += 0.02;
    let x = theta;
    for (let i = 0; i < yvalues.length; i++){
        yvalues[i] = sin(x) * amplitude;
        x += dx;
    }
}

function renderWave() {
    noStroke()
    fill(255)
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    }
}

function drawCurves() {
    background(255);
    noFill();
    stroke(0);
    let coords = [40, 40, 80, 60, 100, 100, 60, 120, 50, 150];
    beginShape();
    for (let i=0; i < coords.length; i++){
        curveVertex(coords[i], coords[i+1]);
    }
    endShape();
}

function testLines() {
    // background('teal')
    noFill();
    stroke(0);
    push(); // make actions temporary
        translate(width/2, height/2); //move xy axis to middle
        // rotate(45)
        stroke(PALETTE[0]);
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
        stroke(PALETTE[1]);
        const angle = 360/SIDES;
        for (let i=0; i < SIDES; i++) {
            line(0, 0, CRYSTAL_SIZE/2,0)   ; 
            rotate(angle);
        }
    pop();
}