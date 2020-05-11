let rainbow = [];
let shapes = [];

function setup() {
    // Sets the screen to be 720 pixels wide and 400 pixels high
    createCanvas(720, 400);
    background(0);
    noStroke();

    rainbow = [color(255, 0, 0),
      color(255, 127, 0),
      color(255, 255, 0),
      color(0, 255, 0),
      color(0, 0, 255),
      color(75, 0, 130),
      color(148, 0, 211)];
  
    draw_rainbow();
  
    // fill(102);
    // rect(81, 81, 63, 63);
  
    // fill(204);
    // quad(189, 18, 216, 18, 216, 360, 144, 360);
  
    // fill(255);
    // ellipse(252, 144, 72, 72);
  
    // fill(204);
    // triangle(288, 18, 351, 360, 288, 360);
  
    // fill(255);
    // arc(479, 300, 280, 280, PI, TWO_PI);
  };

function draw() {
  // draw_rainbow();
};

function draw_rainbow() {
  size = height / 7;
  spacing = width / rainbow.length;
  rotation = PI / 7;

  x = -size/2;

  // offset to rotate around centroid
  tri_x = -size/3;
  tri_y = -size * 2/3;

  rect_x = -size/2;
  rect_y = rect_x;

  translate(spacing/2, 0); // initial shift right
  // shape samples
  for (let k = 0; k < 2; k++){
    rect(-10, -10, 20, 20); // testing square
    if (k==0) { // first shift down
      translate(0, size);
    }
    else {
      translate(0, size*1.5); // shift down for each shape
    }; 
    
    push(); // start translations to right
    for (let i = 0; i < rainbow.length; i++) {
      color = rainbow[i]; // change colors
      fill(color);

      push(); // start rotation
      rotate(rotation*i); // rotate shape by certain amount
      
      if (k==0) {
        // triangles
        triangle(tri_x, tri_y, 
        tri_x, tri_y+size, // right angle
        tri_x+size, tri_y+size); // bottom right corner)
      };
      if (k==1) {
        // rectangles
        rect(rect_x, rect_y, 
            size, size);
      };

      // quadritlaterals

      // ellipses

      // arcs
      pop(); // end rotation

      translate(spacing, 0);
      
    };
    pop(); // end translation
  };
};