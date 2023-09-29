"use strict";

let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');
let sliderImg = document.querySelector('.sliderImg');
let sliderContainer = document.querySelector('.sliderContainer');

let images = [
    "src/img/1.jpg",
    "src/img/2.jpg",
    "src/img/3.jpg",
    "src/img/4.jpg",
    "src/img/5.jpg",
];

let currentIndex = 0;

function slider() {
    if (currentIndex < 0) {
        currentIndex = images.length - 1
    } else if (currentIndex >= images.length) {
        currentIndex = 0
    }
    sliderImg.src = images[currentIndex]
}

prevBtn.addEventListener('click', () => {
    currentIndex--
    slider()
})

nextBtn.addEventListener('click', () => {
    currentIndex++
    slider()
})

let autoSlider = setInterval( () => {
    currentIndex++
    slider()
},2000)

sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlider)
})

sliderContainer.addEventListener('mouseleave', () => {
    autoSlider = setInterval( () => {
        currentIndex++
        slider()        
    },2000)
})




var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var w = (canvas.width = window.innerWidth);
var h = (canvas.height = window.innerHeight);
var colorrange = [0, 50, 220];
var stars = [];
var count = 0;
var starMultiplier = 0.3;
var half = 50;
var maxStars;
var delta;
var $window = window;
var prev;
var move;
var scrollTop;

var canvas2 = document.createElement("canvas");
var ctx2 = canvas2.getContext("2d");
canvas2.width = 100;
canvas2.height = 100;

var canvas3 = document.createElement("canvas");
var ctx3 = canvas3.getContext("2d");
canvas3.width = 100;
canvas3.height = 100;

var canvas4 = document.createElement("canvas");
var ctx4 = canvas4.getContext("2d");
canvas4.width = 100;
canvas4.height = 100;

var gradient1 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient1.addColorStop(0.025, "hsla(" + colorrange[0] + ", 0%, 100%, 0.5)");
gradient1.addColorStop(0.1, "hsla(" + colorrange[0] + ", 0%, 33%, 0.1)");
gradient1.addColorStop(0.25, "hsla(" + colorrange[0] + ", 0%, 6%, 0.05)");
gradient1.addColorStop(1, "transparent");

var gradient2 = ctx3.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, "hsla(" + colorrange[1] + ", 20%, 100%, 1)");
gradient2.addColorStop(0.1, "hsla(" + colorrange[1] + ", 20%, 33%, 1)");
gradient2.addColorStop(0.25, "hsla(" + colorrange[1] + ", 20%, 6%, 0.5)");
gradient2.addColorStop(1, "transparent");

var gradient3 = ctx4.createRadialGradient(half, half, 0, half, half, half);
gradient3.addColorStop(0.025, "hsl(" + colorrange[2] + ", 20%, 100%)");
gradient3.addColorStop(0.1, "hsl(" + colorrange[2] + ", 20%, 33%)");
gradient3.addColorStop(0.25, "hsl(" + colorrange[2] + ", 20%, 6%)");
gradient3.addColorStop(1, "transparent");

ctx2.fillStyle = gradient1;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

ctx3.fillStyle = gradient2;
ctx3.beginPath();
ctx3.arc(half, half, half, 0, Math.PI * 2);
ctx3.fill();

ctx4.fillStyle = gradient3;
ctx4.beginPath();
ctx4.arc(half, half, half, 0, Math.PI * 2);
ctx4.fill();

var gradients = [canvas2, canvas3, canvas4];

function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }

    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }

    return Math.random() * (max - min) + min;
}

function Star() {
    var val = Math.floor(random(2));
    this.gradient = gradients[val];
    this.x = random(w);
    this.y = random(h);
    this.distance = random(0, 0.5);
    if (this.distance < 0.1) this.distance = 0.04;
    this.moving = Math.random() < 0.75;
    if (this.moving) {
        this.directionX = random(-0.035, 0.035);
        this.directionY = random(-0.035, 0.035);
    } else {
        this.directionX = 0;
        this.directionY = 0;
    }

    if (Math.random() > 0.75) {
        this.radius = random(40, 400) / 10;
    } else {
        this.radius = random(40, 150) / 10;
    }
    this.timePassed = random(0, maxStars);
    this.speed = random(100) / 50000;
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
}

Star.prototype.draw = function () {
    var twinkle = random(200);

    var dist = 0;
    if (delta != 0) {
        dist = this.distance * delta;
    }

    this.x += this.directionX;
    this.y += this.directionY + dist;

    if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
        this.x = random(w);
        this.y = random(h);
    }

    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.01;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.01;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
        this.gradient,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
    );
};

function init() {
    count = 0;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    maxStars = w * starMultiplier;
    stars = [];
    for (var i = 0; i < maxStars; i++) {
        new Star();
    }
}

window.addEventListener("resize", init);

function animation() {
    scrollTop = window.scrollY;
    delta = (prev - scrollTop) / 100;
    prev = scrollTop;

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#10141b";
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    }

    window.requestAnimationFrame(animation);
}

animation();
init();