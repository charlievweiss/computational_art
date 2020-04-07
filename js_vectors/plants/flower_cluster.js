/*
Concept: Testing flower shapes in p5.js

functions copied from flower_examples because
I don't want to figure out how to import things

next step: translate away from existing object
idea: make grid of valid spaces, and remove point when filled
*/
var STYLES;
var WIDTH;
var HEIGHT;
var PALETTE;

function setup(){
    WIDTH = 750;
    HEIGHT = 750;
    createCanvas(WIDTH, HEIGHT);
    background(220,220,220);
    noLoop();
    // translate to center
    // translate(width/2, height/2);
    STYLES = ["simple ellipse",
            "hollow circles",
            "outer_petals", //uses bezier
            "bezier"];
    PALETTE = [color(255, 181, 197),
            color(219,112,147),
            color(255,130,171),
            color(255,191,0),
            color(255,210,76)];
}

function draw() {
    var xlb = 0; // width lower bound
    var xub = WIDTH - xlb; // width upper bound
    var ylb = 350;
    var yub = HEIGHT - ylb;
    var x;
    var y;
    var num_petals;
    var radius;
    var width;
    var bulge_point;
    var bulge_factor;
    var temp;

    var num_flowers = 30;
    var background_likelihood = 100;
    var palette = false;

    var grid_style = "circle";
    var position_grid =  make_grid(grid_style, num_flowers);
    
    for (var i = 0; i < num_flowers; i++) {
        temp = Math.floor(random(0, STYLES.length));
        style = STYLES[temp];
        console.log(style);

        // general flower variables
        temp = Math.floor(random(0, position_grid.length));
        coord = position_grid[temp];
        // x = Math.floor(random(xlb, xub));
        // y = Math.floor(random(ylb, yub));
        x = coord[0];
        y = coord[1];
        num_petals = Math.floor(random(7, 20));
        radius = random(10, 60);
        width = (random(0, 1))*radius;
        
        push();
        translate(x, y);
        if (palette) {
            temp = Math.floor(random(0, PALETTE.length));
            color = PALETTE[temp];
            fill(color);
        }
        else {
            fill(255);
        }

        background = random(0, 100);
        if (background < background_likelihood) {
            strokeWeight(0);    
            ellipse(0, 0, radius*2, radius*2);
            noFill();
            strokeWeight(1);
        }
        
        if (style == "simple ellipse") {
            console.log('simple ellipse');
            simple_ellipses(x, y, num_petals, radius, width);
        }
        else if (style == "hollow circles") {
            console.log('hollow circles');
            hollow_circles(x, y, num_petals, radius);
        }
        else if (style == "outer_petals") {
            console.log('outer petals');
            outer_petals(x, y, num_petals, radius);
        }
        else if (style == "bezier") {
            console.log('bezier');
            width = random(1, radius);
            bulge_point = random(0, 1);
            bulge_factor = random(0, 2);
            bezier_flower(x, y, num_petals, radius, width, bulge_point, bulge_factor);
        }
        pop();
        var index = position_grid.indexOf(coord);
        if (index > -1) {
            position_grid.splice(index, 1);
        }
    }
    save('flower_circle.png');
}

function simple_ellipses(x, y, num_petals, radius, width) {
    /* make ellipses around x, y centerpoint*/
    push();
    for (var i = 0; i < num_petals; i++) {
        ellipse(0, radius/2, width, radius); // determines petal shape/size
        rotate(PI/(num_petals/2));
    }
    ellipse(0, 0, radius/3, radius/3); // middle of flower
    pop();
}

function hollow_circles(x, y, num_petals, radius) {
    /* Make circles around x, y centerpoint, with edge touching middle */
    noFill();
    push();
    // translate(x, y);
    for (var i = 0; i < num_petals; i++) {
        ellipse(radius/2, 0, radius, radius);
        rotate(2*PI/num_petals);
    }
    pop();
}

function outer_petals(x, y, num_petals, radius) {
    // petals along outer diameter of circle
    // fill(255);
    // noFill();
    push();
    // translate(x, y);
    ellipse(0, 0, radius, radius);
    for (var i = 0; i < num_petals; i++) {
        // modify these numbers for extra fun!
        // x, y, length, width, bulge point, bulge factor
        bezier_petal(radius/2, 0, radius/2, radius/4, .5, .2);
        rotate(2*PI/num_petals);
    }
    pop();
}

function bezier_flower(x, y, num_petals, length, width, bulge_point, bulge_factor) {
    push();
    // translate(x, y);
    for (var i = 0; i < num_petals; i++){
        bezier_petal(0, 0, length, width, bulge_point, bulge_factor)
        rotate(2*PI/num_petals)
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

/* HELPER FUNCTIONS FOR GRID POPULATING */

function make_grid(style, num_flowers) {
    position_grid = [];
    if (style == "spread") {
        // iterate through squares of upper and lower bound, pick
        // random point from each one
        var rows = Math.ceil(Math.sqrt(num_flowers));
        var cols = Math.floor(Math.sqrt(num_flowers));
        var row_area = (yub-ylb)/rows;
        var col_area = (xub-xlb)/cols;
        var extra_space = row_area / 2.5;
        var es2 = col_area / 2.5;
        // var extra_space = 0;
        // var es2 = 0;
        for (var i = 0; i < rows; i++){
            for (var j = 0; j < cols; j++){
                var row_lower = ylb + (row_area*i) + extra_space;
                var row_upper = row_lower + row_area - extra_space;
                var col_lower = xlb + (col_area*j) + es2;
                var col_upper = col_lower + col_area - es2;
                x = random(col_lower, col_upper);
                y = random(row_lower, row_upper);
                // x = col_lower + col_area / 2;
                // y = row_lower + row_area / 2;
                position_grid.push([x, y]);
            }
        }

        // TESTING: visualize where spawn points are
        // for (var i = 0; i < position_grid.length; i++) {
        //     coord = position_grid[i];
        //     ellipse(coord[0], coord[1], 30, 30);
        // }
        }
    if (style = "circle") {
        var theta_change = 2*PI / num_flowers;
        var radius = WIDTH / 3;
        for (var i = 0; i < num_flowers; i++) {
            var theta = theta_change * i;
            var x = WIDTH / 2 + (radius * Math.cos(theta));
            var y = HEIGHT / 2 + (radius * Math.sin(theta));
            position_grid.push([x, y]);
        }
    }
    return position_grid;
}