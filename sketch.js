var cur_population;
var population_size = 100;
var lifespan = 300;

function setup(){
	createCanvas(900, 900);
	cur_population = new Population();
}

function draw(){
	background(200, 200, 200);
	cur_population.run();
}

function Population(){
	this.rockets = [];

	for(var i = 0; i < population_size; i++){
		this.rockets[i] = new Rocket();
	}

	this.run = function(){
		for(var i = 0; i < population_size; i++){
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
}

function DNA(){
	this.genes = [];
	for(var i = 0; i < lifespan; i++){
		this.genes[i] = p5.Vector.random2D();
		this.genes[i].setMag(0.25);
	}
}

function Rocket(){
	this.pos = createVector(width / 2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.dna = new DNA();
	this.count = 0;

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.update = function(){
		this.applyForce(this.dna.genes[this.count]);
		this.count++;

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.show = function(){
		push();
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 50, 10);
		pop();
	}
}