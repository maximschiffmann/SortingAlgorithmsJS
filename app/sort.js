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
                insertionSortStart();
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
                await new Promise(resolve =>
                    setTimeout(() => {
                        resolve();
                    }, -1)
                );
            }
        }
        allowSort = true;
    }

    function reset() {
        elements = [];
        setupElements();
        allowSort = true;
        draw();
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