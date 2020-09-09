var sort = (function () {
    var context;

    var CANVAS_WIDTH = 1200;
    var CANVAS_HEIGHT = 600;

    var elements = [];
    var filledElements = true;

    var numberOfElements = 100;
    var elementWidth = CANVAS_WIDTH / numberOfElements;

    var allowSort = true;
    var stop = false;

    var steps = 0;
    var milliSec = 0;
    var seconds = 0;
    var minutes = 0;
    var count = false;
    var timeTemp = Date.now();

    function drawSteps() {
        context.fillStyle = "rgba(0,0,0,0.7)";
        context.fillRect(0, 0, 240, 110);
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText("Steps: " + steps, 20, 40);
        context.fillText("Time: " + minutes + ":" + seconds + ":" + milliSec, 20, 80);
    }

    function updateTime() {
        if (count === true) {
            var elapsedTime = Date.now();
            milliSec = (elapsedTime - timeTemp) % 1000;
            seconds = Math.floor((elapsedTime - timeTemp) / 1000) % 60;
            minutes = Math.floor((elapsedTime - timeTemp) / 1000 / 60) % 60;

            seconds = (seconds < 10) ? "0" + seconds : seconds;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
        }
    }

    function resetTime() {
        steps = 0;
        count = false;
        milliSec = 0;
        seconds = 0;
        minutes = 0;
        timeTemp = Date.now();
    }

    function setupButtons() {
        var fillButton = document.getElementById("fillButton");
        fillButton.addEventListener("click", function () {
            if (filledElements === true) {
                filledElements = false;
                fillButton.innerHTML = "Fill Color: Off";
            } else {
                filledElements = true;
                fillButton.innerHTML = "Fill Color: On";
            }
        });
        var insertionSortButton = document.getElementById("insertionSortButton");
        insertionSortButton.addEventListener("click", function () {
            if (allowSort === true) {
                reset();
                insertionSortStart();
                count = true;
            }
            allowSort = false;
        });
        var bubbleSortButton = document.getElementById("bubbleSortButton");
        bubbleSortButton.addEventListener("click", function () {
            if (allowSort === true) {
                reset();
                bubbleSortStart();
                count = true;
            }
            allowSort = false;
        });
        var resetButton = document.getElementById("resetButton");
        resetButton.addEventListener("click", function () {
            stop = true;
            reset();
        });
    }

    function setupSlider() {
        var sizeSlider = document.getElementById("maxSizeSlider");
        var sizeOutput = document.getElementById("sizeSliderValue");
        sizeSlider.oninput = function () {
            numberOfElements = this.value;
            sizeOutput.innerHTML = "Number of elements: " + this.value;
            elementWidth = CANVAS_WIDTH / numberOfElements;
            stop = true;
            reset();
        }
    }

    function init(canvas) {
        setupButtons();
        setupSlider();
        context = canvas.getContext('2d');
        setupElements();
        window.requestAnimationFrame(draw);
        //  draw();
    }

    function setupElements() {
        for (var i = 0; i < numberOfElements; i++) {
            var x = (elementWidth) * i;
            var elementHigh = CANVAS_HEIGHT - Math.floor((Math.random() * (600 + 1)));
            var element = new Element(x, 0, context, elementHigh, elementWidth);
            elements.push(element);
            // console.log(elements[i].xPos + " " + (600 - elements[i].elementHigh));
        }
        //  console.log(elements);
    }

    function draw() {
        drawBackground();
        drawElements();
        drawSteps();
        updateTime();
        drawFrame();
        window.requestAnimationFrame(draw);
    }

    function drawElements() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].draw();
            elements[i].update();
            if (elements[i] != undefined) {
                elements[i].fillElement = filledElements;
            }
        }
    }
    var swap = function (x) {
        return x
    };

    async function insertionSortStart() {
        console.log("Start sort");
        stop = false;
        var i = 0;
        var j = 0;
        for (i = 0; i < elements.length; i++) {
            j = i;
            while (j > 0 && elements[j - 1].elementHigh < elements[j].elementHigh) {
                if (stop === true) i = elements.length - 1;
                elements[j - 1] = swap(elements[j], elements[j] = elements[j - 1]);
                var temp = elements[j].xPos;
                elements[j].xPos = elements[j - 1].xPos;
                elements[j - 1].xPos = temp;
                j = j - 1;
                steps++;
                await new Promise(resolve =>
                    setTimeout(() => {
                        resolve();
                    }, -1)
                );
            }
        }
        count = false;
        allowSort = true;
    }
    async function bubbleSortStart() {
        console.log("Start sort");
        stop = false;
        var i = 0;
        var j = 0;
        for (i = 0; i < elements.length - 1; i++) {
            for (j = 0; j < elements.length - i - 1; j++) {
                if (stop === true) i = elements.length - 1;
                if (elements[j].elementHigh < elements[j + 1].elementHigh) {
                    elements[j + 1] = swap(elements[j], elements[j] = elements[j + 1]);
                    var temp = elements[j].xPos;
                    elements[j].xPos = elements[j + 1].xPos;
                    elements[j + 1].xPos = temp;
                }
                steps++;
                await new Promise(resolve =>
                    setTimeout(() => {
                        resolve();
                    }, -1)
                );
            }
        }
        count = false;
        allowSort = true;
    }

    function reset() {
        elements = [];
        setupElements();
        allowSort = true;
        draw();
        resetTime();
    }

    function drawBackground() {
        context.fillStyle = "black";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    function drawFrame() {
        context.strokeStyle = "#ffffff";
        context.lineWidth = 5;
        context.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.lineWidth = 1;
    }

    return {
        init: init
    }

})();