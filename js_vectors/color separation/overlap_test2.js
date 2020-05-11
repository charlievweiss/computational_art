/*
THIS COULD WORK WOO
For some reason I can't save the graphics individually
from an array, but I can view them like that.
My work around is to save them when the individual 
graphic is complete.
*/

let Graphics = [];
let PALETTE = [];
let save = false;

function setup() {
  createCanvas(710, 400, SVG);
  PALETTE = [
    color(255, 57, 354), // pink
    color(4, 0, 152), // blue
    ];
  noLoop();
}

function draw() {
    col_index = 0;
    for (var i = 0; i < 3; i++) {
        drawCircle(col_index);
        col_index = 1;
    }
    viewGraphic(); // for loop
}

function drawCircle(col_index) {
    // clear();
    let graphic = createGraphics(width, height);
    graphic.stroke(255);
    // col = random(PALETTE)
    col = PALETTE[col_index];
    graphic.fill(col);
    var x = random(0, width);
    var y = random(0, height);
    graphic.ellipse(x, y, x, y);
    image(graphic, 0, 0);
    if (save){
        save(graphic, 'check.svg');
    }
    Graphics.push(graphic);
    clear();
}

function viewGraphic() {
    for (let i = 0; i < Graphics.length; i++) {
        image(Graphics[i], 0, 0);
    }
}
