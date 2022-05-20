var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  score = 0;
  

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();
  
  
  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
   
  textSize(40);
  fill(255);   
  text(score, 30, 50);
    
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i = 0; i<asteroids.locations.length; i++) {
        if(isInside(spaceship.location, spaceship.size, asteroids.locations[i],asteroids.diams[i]) == true){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i = 0; i<asteroids.locations.length; i++) {
        if(isInside(asteroids.locations[i],asteroids.diams[i],earthLoc, earthSize.x)== true){
            gameOver();
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size,earthLoc, earthSize.x)== true){
            gameOver();
        }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size,atmosphereLoc, atmosphereSize.x)== true){
            spaceship.setNearEarth();
        }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for(var i = 0; i<spaceship.bulletSys.bullets.length; i++) {
        for(var j = 0; j<asteroids.locations.length; j++) {
        if(isInside(spaceship.bulletSys.bullets[i], spaceship.bulletSys.diam,asteroids.locations[j],asteroids.diams[j])== true){
            asteroids.destroy(j);
            score++;
            }
        }
    }
    
    
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var aRad = sizeA/2;
    var bRad = sizeB/2;
    if(dist(locA.x, locA.y, locB.x, locB.y)<aRad+bRad){
        return true;
        print("collide");
    }
    else {
        return false;
    }
    
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
    
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("Score:  " + score, width/2, height/2 + 60);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
