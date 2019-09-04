let rainDrops = [];
let splashes = [];
const RAIN_DROP_COUNT = 20;

const RAIN_ANGLE = -0.2;
const RAIN_MIN_SIZE = 32;
const RAIN_MAX_SIZE = 80;
const RAIN_MIN_FALL_SPEED = 8;
const RAIN_MAX_FALL_SPEED = 24;

function setup()  {
  createCanvas(document.documentElement.clientWidth	, document.documentElement.clientHeight);
  rainDrops = [...Array(RAIN_DROP_COUNT)].map((unused) => new drop());
}

function draw() {
  background(0);
  background('rgba(36, 104, 140, 0.25)');
  noStroke();
  fill('rgb(149, 199, 255)');
  rainDrops.forEach((item) => {
    item.update();
    item.show();
  });
  noFill();
  for(let i = splashes.length - 1; i >= 0; i--) {
    if(!splashes[i].update()) {
      splashes.splice(i, 1);
    } else {
      splashes[i].show(); 
    }
  }
}

function drop() {
  this.reset = function(x, y) {
    if(x && y) {
      this.pos = { x: x, y: y };
    } else {
      this.pos = { x: random(width + width * 0.25) - width * 0.5, y: -height };
    }
    this.impact = false;
    this.size = random(RAIN_MAX_SIZE) + RAIN_MIN_SIZE;
    this.width = this.size / 32;
    this.fallSpeed = map(this.size, RAIN_MIN_SIZE, RAIN_MAX_SIZE + RAIN_MIN_SIZE, RAIN_MIN_FALL_SPEED, RAIN_MAX_FALL_SPEED);
    
    this.zClip = map(this.size, RAIN_MIN_SIZE, RAIN_MAX_SIZE + RAIN_MIN_SIZE, 0, height);
  }
  // initially try to spread the drops out so they don't fall in waves
  this.reset(random(width * 2) - width, random(height * 2) - height);
  
  this.update = function() {
    if(!this.impact) {
      this.pos.x += cos(RAIN_ANGLE + HALF_PI) * this.fallSpeed;
      this.pos.y += sin(RAIN_ANGLE + HALF_PI) * this.fallSpeed;

      if(this.pos.y > this.zClip) {
        this.impact = true;
        for(let i = 0; i < random(3) + 1; i++) {
          splashes.push(new splash(this.pos.x, this.pos.y));
        }
      }
    } else {
      if(this.size > 0) {
        this.size -= this.fallSpeed;
      } else {
        this.reset();
      }
    }
  }
  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(RAIN_ANGLE);
    triangle(-this.width, this.width, this.width, this.width, 0, -this.size);
    pop();
  }
}

function splash(x, y) {
  this.pos = { x: x, y: y };
  this.splashSize = 0;
  this.alpha = 1;
  this.splashSpeed = random(map(y, 0, height, 0, 5)) + 2;
  this.strokeWeight = random(2) + 1;
  this.update = function() {
    this.splashSize += this.splashSpeed;
    this.alpha -= 0.045;
    return this.alpha > 0;
  }
  this.show = function() {
    strokeWeight(this.strokeWeight);
    stroke(`rgba(130, 178, 255, ${this.alpha})`);
    ellipse(this.pos.x, this.pos.y, this.splashSize, this.splashSize * 0.5);
  }
}