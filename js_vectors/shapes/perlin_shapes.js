let rainbow = [];
let shapes = [];
let transparency = 150;
let name = "default";

function setup() {
    // Sets the screen to be 720 pixels wide and 400 pixels high
    createCanvas(600, 600, SVG);
    noLoop();
    background(0);
    noStroke();

    rainbow = [color(255, 0, 0, transparency),
      color(255, 127, 0, transparency),
      color(255, 255, 0, transparency),
      color(0, 255, 0, transparency),
      color(0, 0, 255, transparency),
      color(75, 0, 130, transparency),
      color(148, 0, 211, transparency)];

  };

function draw() {
    // draw_rainbow();
    // rotating_squares();
    squares_on_line();
    save(name + ".svg");
    save(name + ".png");
};

function rotating_squares() {
    name = "rotating_squares";
    let num_squares = 1000;
    let amplitude = 300;
    let rot_amp = amplitude*200;
    let color;
    let size;

    // translate(rot_amp, rot_amp);
    translate(width/2, height/2);

    for (let i = 0; i < num_squares; i++) {
        color = rainbow[i%rainbow.length]; // pick color
        fill(color);

        push();
        size = noise(i)*amplitude;
        // translate(size, size);
        rotate(rot_amp*PI/size);
        rect(0, 0, size, size);
        pop();
    };
};

function squares_on_line() {
    name = "squares_on_line";
    let num_squares = 100;
    let x_space = width/num_squares;
    let size = 20;
    let amplitude = height;
    let perlin_step = 5/num_squares;
    // translate(0, height/3);
    let y_off;
    let y;

    for (let i =0; i < num_squares; i++) {
        color = rainbow[i%rainbow.length]; // pick color
        fill(color);
        y = noise(i*perlin_step) * amplitude;
        if (i==0){
            y_off = (height/2)-y;
            y = height/2;
        }
        else {
            y = y + y_off;
        };
        
        push();
        translate(0,y);
        rotate(num_squares*PI/i);
        rect(0,0,size,size);
        pop();
        translate(x_space, 0);
    };
};