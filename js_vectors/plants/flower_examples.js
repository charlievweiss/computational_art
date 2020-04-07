/*
Concept: Testing flower shapes in p5.js
*/
var SPACE;

function setup(){
    createCanvas(750, 750, SVG);
    background(220,220,220);
    noLoop();
    SPACE = width/5;
}

function draw() {
    simple_ellipses(SPACE, SPACE, 10);
    outer_petals(SPACE*2, SPACE, 10, 20);

    // row of circle flowers with increasing petals
    for (i = 1; i < 5; i++) {
        hollow_circles(SPACE*i, SPACE*2, i*5);
    }
    petal_test(SPACE, SPACE*3);
}

function simple_ellipses(x, y, num_petals) {
    /* make ellipses around x, y centerpoint*/
    fill(255);
    push();
    translate(x, y);
    for (var i = 0; i < num_petals; i++) {
        ellipse(0, 40, 20, 60); // determines petal shape/size
        rotate(PI/(num_petals/2));
    }
    ellipse(0, 0, 30, 30); // middle of flower
    pop();
}

function hollow_circles(x, y, num_circles) {
    /* Make circles around x, y centerpoint, with edge touching middle */
    noFill();
    push();
    translate(x, y);
    var diam = 70;
    for (var i = 0; i < num_circles; i++) {
        ellipse(diam/2, 0, diam, diam);
        rotate(2*PI/num_circles);
    }
    pop();
}

function outer_petals(x, y, num_petals, radius) {
    // petals along outer diameter of circle
    fill(255);
    // noFill();
    push();
    translate(x, y);
    ellipse(0, 0, radius*2, radius*2);
    for (var i = 0; i < num_petals; i++) {
        // modify these numbers for extra fun!
        bezier_petal(radius, 0, radius, radius/2, .5, .2);
        rotate(2*PI/num_petals);
    }
    pop();
}

function petal_test(x, y) {
    fill(255);
    push();
    translate(x, y);
    var size = 30;
    var style = "sharp";
    square_petal(style, size);
    translate(0, 40);
    style = "round";
    square_petal(style, size);

    // bezier petals
    translate(200, 0);
    for (var i=0; i < 10; i++){
        // x, y, length, width, bulge point, bulge factor
        bezier_petal(0, 0, 80, 10, .1*i, .1);
        rotate(PI/5);
    }

    translate(200, 0);
    for (var i=0; i < 10; i++){
        // x, y, length, width, bulge point, bulge factor
        bezier_petal(0, 0, 80, 15, .8, .15*i);
        rotate(PI/5);
    }

    pop();
}

/* HELPER FUNCTIONS FOR PETAL SHAPE */

function square_petal(style, size) {
    // a rounded rectangle
    // x, y, width, height, tl rad, tr rad, br rad, bl rad
    if (style=="round"){ // circular except in one corner
        rect(0, 0, size, size, size, size, size, size/10);
    }
    if (style == "sharp"){ // pointy on two ends
        rect(0, 0, size, size, size, 0, size, 0);
    }
}

function bezier_petal(x, y, length, width, bulge_point, bulge_factor) {
    var size = length;
    var bulge_size = size*bulge_factor;

    var coord1 = [x, y];
    var coord2 = [x+size, y];

    var cp1 = [x+(size*bulge_point)-bulge_size, y+width]; // first control point
    var cp2 = [x+(size*bulge_point)+bulge_size, y+width];
    bezier(coord1[0], coord1[1], cp1[0],cp1[1], cp2[0], cp2[1], coord2[0], coord2[1]);

    // now reflect it
    bezier(coord1[0], coord1[1], cp1[0],cp1[1]*-1, cp2[0], cp2[1]*-1, coord2[0], coord2[1]);
}