/*
Displays two images overlapped and saves them
individually.

This won't work well -- can't modify sketches outside
them
*/

var name = '';
var color_index = 0;
var x = 0;
var y = 0;
// PALETTE = [];

var sketch = function(p) {
    p.x = 0;
    p.y = 0;

    // p.color = color;
    // p.name = name;

    p.setup = function() {
        var canvas = p.createCanvas(500, 500, p.SVG);
        canvas.position(0, 0);
        p.noLoop();
        p.x = p.random(p.width);
        p.y = p.random(p.height);
        p.PALETTE = [
            p.color(255, 57, 354), // pink
            p.color(4, 0, 152), // blue
        ];
        // console.log(name)
        p.stroke(p.PALETTE[color_index]);
        // p.fill(p.PALETTE[color_index]);
        // p.fill(p.col);
    }

    p.draw = function() {
        console.log(name);
        p.ellipse(p.x, p.y, p.width/4, p.height/4);
        // p.save(name);
    }
}

var sketch1 = function(p) {
    p.x = 0;
    p.y = 0;

    // p.color = color;
    // p.name = name;

    p.setup = function() {
        var canvas = p.createCanvas(500, 500, p.SVG);
        // canvas.position(0, 0);
        p.noLoop();
        p.x = p.random(p.width);
        p.y = p.random(p.height);
        p.PALETTE = [
            p.color(255, 57, 354), // pink
            p.color(4, 0, 152), // blue
        ];
        // console.log(name)
        p.stroke(p.PALETTE[color_index]);
        // p.fill(p.PALETTE[color_index]);
        // p.fill(p.col);
    }

    p.draw = function() {
        console.log(name);
        p.ellipse(p.x, p.y, p.width/4, p.height/4);
        // p.save(name);
    }
}

name = "thing";
color_index = 0;
let thing1 = new p5(sketch);
name = "thing2"
let thing2 = new p5(sketch1);

function resetColor(thingthing) {
    thing2.fill(4, 0, 152);
    // thing2.background(55);
}

// thing1.background(244);
setTimeout(resetColor, 0);
// resetColor();