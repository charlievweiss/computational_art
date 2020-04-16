/*
Make splines with petals facing out certain directions
*/

function setup() {
    WIDTH = 750;
    HEIGHT = 750;
    createCanvas(WIDTH, HEIGHT);
    noLoop();
    noFill();
}

function draw() {
    // translate(WIDTH/2, HEIGHT/2);
    var Nodes = make_spline();
    var point1 = Nodes[0];
    var x1 = point1[0];
    var y1 = point1[1];
    console.log(point1[2]);
    for (let i = 0; i < Nodes.length; i++) {
        var point = Nodes[i];
        var x = point[0];
        var y = point[1];
        var angle = point[2];
        angle = angle + PI/2;
        var length = 20;
        // var x2 = x + (length)*cos(angle);
        // var y2 = y + (length)*sin(angle);
        // // line(x, y, x2, y2);
        petal_cluster(x, y, angle, length, 10, PI);
    }
}

function make_spline() {
    style = "spiral";
    stroke(10);
    var Nodes = [];
    if (style == "spiral") {
        push();
        var x_trans = WIDTH/2;
        var y_trans = HEIGHT/2;
        translate(x_trans, y_trans);
        beginShape();
        var spiral_points = 5;
        var num_points = 10;
        var radius = 100;
        var increase = 20;
        var x = 0;
        var y = 0;
        var angle = 0;
        var angle_increase = PI*2/spiral_points;
        var point;
        curveVertex(x, y);
        curveVertex(x, y); // control point
        Nodes.push([x+x_trans, y+y_trans, angle, radius]);
        for (let i = 0; i < num_points; i++){
            angle = angle + angle_increase;
            radius = radius + increase;
            x = radius * cos(angle);
            y = radius * sin(angle);
            point = [x+x_trans, y+y_trans, angle, radius];
            Nodes.push(point);
            curveVertex(x, y);
        }
        curveVertex(x, y);
        endShape();
        pop();
    }
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