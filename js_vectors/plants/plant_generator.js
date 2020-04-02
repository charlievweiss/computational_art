// I think there's a memory problem -- fails above certain amount of lines
// SOLVED: It was Google Chrome. Use Firefox instead

/*
Stitch reference: https://www.sew-embroidery.com/types-embroidery-stitches/

Leaf reference: https://www.thoughtco.com/id-trees-using-leaf-shape-venation-1343511

flower reference: http://theseedsite.co.uk/flowershapes.html
*/

/* developer notes:
in the middle of bottom func, need it to go forward
with ones above.
*/

var STEM_TYPES; // defined by curve angle?
var LEAF_ARRANGMENTS = ['simple', 'compound'];
var LEAF_SHAPES = ['oval', 'truncate'];//, //'ellipse', 'lancolate', 'linear']; //
var FLOWER_TYPES = ['campanulate',
                    'bowl'];//,
                    // 'stellate',
                    // 'saucer']; //
var LINE_STITCHES = ['running',
                    'back',
                    'split',
                    'stem',
                    'chain',
                    'lazydaisy',
                    'feather',
                    'moss',
                    'couching']; 
var FILL_STITCHES = ['frenchknot',
                    'damask'];

function setup(){
    createCanvas(750, 750, SVG);
    background(220,220,220);
    noLoop();
}

function draw() {
    var areas = define_plant_area();
    for (let i = 0; i<areas.length; i++) {
        generate_plant(areas[i]);
    }
}

function define_plant_area() {
    // split space into area for plant
    // TODO: This is just three boxes for now

    var x1 = 0;
    var x2 = 0;
    var yrange = [0, height];
    var area = [];
    var areas = [];
    var num_plants = 5;

    // TODO: make more interesting
    for (let i = 0; i<num_plants; i++){
        x1 = (width/num_plants) * i;
        x2 = (width/num_plants) * (i+1);
        area = [[x1, x2], yrange];
        areas.push(area);
    }

    return areas;
}

function generate_plant(area) {
    // console.log(area)
    // make stem
    var num_leaves = 5;
    noFill()
    var stem_vals = generate_stem(area, num_leaves);
    var stem_points = stem_vals[0];
    var leaf_nodes = stem_vals[1];

    // make leaves on nodes of stem
    for (let i = 0; i<leaf_nodes.length; i++) {
        var x = leaf_nodes[i][0];
        var y = leaf_nodes[i][1];
        fill(255);
        generate_leaf(x, y);
    }

    // make flowers
    var endpoint = stem_points.pop();
    generate_flower(endpoint[0], endpoint[1]);
}

function generate_flower(x, y) {
    /* make ellipses around x, y centerpoint
    */
    push();
    translate(x, y);
    for (var radius = 0; radius < 10; radius++) {
        ellipse(0, 40, 20, 60);
        rotate(PI/5);
    }
    ellipse(0, 0, 30, 30);
    pop();
}

function generate_leaf(x, y) {
    push();
    translate(x, y);
    ellipse(40, 0, 50, 20);
    pop();
}

function generate_stem(area, num_leaves) {
    /* makes a curved vertex of a stem and
    returns points for the start of leaves
    
    TODO: change straight to interesting curves
    */
    var xrange = area[0];
    var yrange = area[1];
    var leaf_nodes = [];
    var stem_points = [];
    var type = "straight";
    // var type = "random";
    
    stroke(0);
    beginShape();
    noFill();
    // make simple, straight stem
    var max = num_leaves+2
    let x = xrange[1] - ((xrange[1] - xrange[0])/2); // place halfway between borders
    let y;
    let y_iterator = ((yrange[1]-yrange[0]) * (3/4)) / max;

    for (let i = 0; i<max; i++) {
        // y = height-(i*100);
        if (type=="straight") {
            y = (yrange[1] - i*y_iterator) - 10;
        }
        if (type == "random") {
            x = xrange[0] + Math.random()*(xrange[1]-xrange[0]);
            y = yrange[0] + Math.random()*(yrange[1]-yrange[0]);
        }
        curveVertex(x, y);
        // double control points
        if (i == 0 || i == max-1) {
            curveVertex(x, y);
        }
        else {
            leaf_nodes.push([x, y]); // exclude first and last points
        }
        stem_points.push([x, y])
    }
    endShape();
    return [stem_points, leaf_nodes];
}

