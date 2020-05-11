/*
Make splines with petals facing out certain directions

Next up:
Fix spiral
Geometric shapes -- shapes at the corners/vertices
*/

var WIDTH = 750;
var HEIGHT = 750;
var V_BORDER = 100;
var H_BORDER = WIDTH/3;

var NUM_NODES = 5;
var TYPE = "row_split"; // options: spiral, row_split, random

var NUM_PETALS = 10;
var PETAL_SIZE = 40;
var ANGLE_RANGE;
var ANGLE_MODIFIER = 1/2;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    noLoop();
    noFill();
    ANGLE_RANGE = 2*PI*ANGLE_MODIFIER;
}

function draw() {
    // translate(WIDTH/2, HEIGHT/2);
    var Nodes = make_spline();
    for (let i = 0; i < Nodes.length; i++) {
        var point = Nodes[i];
        var x = point[0];
        var y = point[1];
        var angle = point[2];
        angle = angle;// + PI/2;
        var length = PETAL_SIZE;
        petal_cluster(x, y, angle, length, NUM_PETALS, ANGLE_RANGE);
    }
}

function make_spline_old() {
    style = "spiral";
    stroke(10);
    var Nodes = [];
    var x = 0;
    var y = 0;
    var angle = 0;
    if (TYPE == "spiral") {
        push();
        var x_trans = WIDTH/2;
        var y_trans = HEIGHT/2;
        translate(x_trans, y_trans);
        beginShape();
        var spiral_points = 5;
        var num_points = 10;
        var radius = 100;
        var increase = 20;
        var angle_increase = PI*2/spiral_points;
        var point;
        curveVertex(x, y);
        curveVertex(x, y); // control point
        Nodes.push([x+x_trans, y+y_trans, angle]);
        for (let i = 0; i < num_points; i++){
            angle = angle + angle_increase;
            radius = radius + increase;
            x = radius * cos(angle);
            y = radius * sin(angle);
            point = [x+x_trans, y+y_trans, angle];
            Nodes.push(point);
            curveVertex(x, y);
        }
        curveVertex(x, y);
        endShape();
        pop();
    }
    if (TYPE == "row_split") {
        var row_space = (HEIGHT-(2*V_BORDER))/NUM_NODES;
        var adder = V_BORDER;
        beginShape();
        for (let i = 0; i < NUM_NODES; i++) {
            // TODO: fill this in
            x = random(H_BORDER, WIDTH-H_BORDER);
            y = (random(0, 1) * row_space) + adder;
            adder = adder + row_space;
            // make angle between -PI/6 and PI/6 left and right
            angle = random(-PI/6, PI/6) + Math.ceil(random(0, 10));
            console.log(angle);
            point = [x, y, angle];
            Nodes.push(point);
            curveVertex(x, y);
            if (i == 0 || i == NUM_NODES-1) {
                curveVertex(x, y);
            }
        }
    }
        endShape();
    if (TYPE == "random") {
        beginShape();
        for (let i = 0; i < NUM_NODES; i++) {
            x = random(H_BORDER, WIDTH-H_BORDER);
            y = random(V_BORDER, HEIGHT-V_BORDER);
            angle = random(0, 2*PI);
            point = [x, y, angle];
            Nodes.push(point);
            curveVertex(x, y);
            if (i == 0 || i == NUM_NODES-1) {
                curveVertex(x, y);
            }
        }
        endShape();
    }
    return Nodes;
}

function make_spline() {
    style = "spiral";
    stroke(10);
    var Nodes = [];
    var x = 0;
    var y = 0;
    var angle = 0;
    var point;
    // make spline
    push();
    // special variables for spiral
    if (TYPE == "spiral") {
        var x_trans = WIDTH/2;
        var y_trans = HEIGHT/2;
        // translate(x_trans, y_trans);
        var num_turns = 5;
        var radius = (WIDTH - (2*H_BORDER))/2;
        var r_increase = radius / NUM_NODES;
        var angle_increase = PI*2 / (NUM_NODES / num_turns); 
    }
    if (TYPE == "row_split") {
        var row_space = (HEIGHT-(2*V_BORDER))/NUM_NODES;
        var adder = V_BORDER;
    }
    beginShape();
    for (let i = 0; i < NUM_NODES; i++) {
        if (TYPE == "spiral") {
            if (i > 0) {
                radius = radius + r_increase;
                angle = angle + angle_increase;
            }
            x = radius * cos(angle);
            y = radius * sin(angle);
        }
        if (TYPE == "row_split") {
            x = random(H_BORDER, WIDTH-H_BORDER);
            y = (random(0, 1) * row_space) + adder;
            adder = adder + row_space;
            // make angle between -PI/6 and PI/6 left and right
            angle = random(-PI/6, PI/6) + Math.ceil(random(0, 10));
        }
        if (TYPE == "random") {
            x = random(H_BORDER, WIDTH-H_BORDER);
            y = random(V_BORDER, HEIGHT-V_BORDER);
            angle = random(0, 2*PI);
        }
        // for everyone
        curveVertex(x, y);
        if (i == 0 || i == NUM_NODES - 1) {
            curveVertex(x, y); // double up at start and end
        }
        if (TYPE == "spiral") {
            point = [x + x_trans, y + y_trans, angle];
        }
        else {
            point = [x, y, angle];
        }
        console.log(point);
        Nodes.push(point);
    }
    endShape();
    pop();

    return Nodes;
}

function petal_cluster(x, y, angle, length, num_petals, angle_range) {
    var width = random(1, length);
    var bulge_point = random(0, 1);
    var bulge_factor = random(0, 2);
    var angle_diff = angle_range / num_petals;
    var curr_angle = angle - (num_petals/2)*angle_diff;
    push();
    translate(x, y);
    for (let i = 0; i < num_petals; i++){
        push();
        rotate(curr_angle);
        bezier_petal(length, width, bulge_point, bulge_factor);
        curr_angle = curr_angle + angle_diff;
        pop();
    }
    pop();
}

function bezier_petal(length, width, bulge_point, bulge_factor) {
    var size = length;
    var bulge_size = size*bulge_factor;

    var coord1 = [0,0];
    var coord2 = [size, 0];

    var cp1 = [(size*bulge_point)-bulge_size, width]; // first control point
    var cp2 = [(size*bulge_point)+bulge_size, width];
    bezier(coord1[0], coord1[1], cp1[0],cp1[1], cp2[0], cp2[1], coord2[0], coord2[1]);

    // now reflect it
    bezier(coord1[0], coord1[1], cp1[0],cp1[1]*-1, cp2[0], cp2[1]*-1, coord2[0], coord2[1]);
}