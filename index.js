// Query Selectors
const colorContainer = document.querySelector('#color-container');
const penContainer = document.querySelector('#pen-container');
const gridContainer = document.querySelector('#grid-container');
const slider = document.querySelector('#slider');
const slideValue = document.querySelector('#value');
const clearGrid = document.querySelector('#clear-container');

// Grid Creation //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create Grid 
function makeGrid(squaresBy = 16, color = `rgb(255, 255, 255)`) {
    gridContainer.replaceChildren();
    let squarePixels = 30/parseFloat(squaresBy);
    for (let i = 0; i < squaresBy; i++) {
        const row = document.createElement('div');
        row.classList.add("row");
        for (let j = 0; j < squaresBy; j++) {
            const square = document.createElement('div');
            square.classList.add("square");
            square.style.cssText = `height: ${squarePixels}em;
                                    width: ${squarePixels}em;
                                    border-style: solid;
                                    border-width: 0.25px;
                                    border-color: black;`
            row.appendChild(square);
        }
        row.style.backgroundColor = `${color}`;
        gridContainer.appendChild(row);
    }
}

// Grid and Color Toggle Menu ///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Grid Size Sliders */
// Change Size of Grid
slider.oninput = function () {
    slideValue.textContent = `${this.value} x ${this.value}`;
};

slider.onchange = function () {
    makeGrid(this.value, gridColor);
}

/* Pen Color and Background Color Pickers */
// Pen Color
let penColor = `rgb(0, 0, 0)`;
let gridColor = `rgb(255, 255, 255)`;

// Change Color of Pen and Background
colorContainer.addEventListener("input", (e) => {
    if (e.target.id === 'pen-color') {
        penColor = e.target.value;
    } else if (e.target.id === 'background-color') {
        changeBackground(e.target.value);
        gridColor = e.target.value;
    }
});

// Change Background as user makes selection
colorContainer.addEventListener("change", (e) => {
    if(e.target.id === 'background-color') {
        changeBackground(e.target.value);
    }
})

// Function to change background color of grid
function changeBackground (color) {
    const row = document.querySelectorAll('.row');
    for (let i = 0; i < row.length; i++) {
        row[i].style.backgroundColor = color;
    }
}

/* Pen Toggles */
let eraser = document.querySelector('#eraser');
let rainbow = document.querySelector('#rainbow');
let darken = document.querySelector('#darken');
let lighten = document.querySelector('#lighten');
penContainer.addEventListener("click", (e) => {
    if(e.target.id === 'eraser') {
        if (eraser.value === "ON") {
            eraser.value = "OFF"
        }
        else {
            eraser.value = "ON"
        }
        rainbow.value = "OFF";
        darken.value = "OFF";
        lighten.value = "OFF";
    }
    if(e.target.id === 'rainbow') {
        if (rainbow.value === "ON") {
            rainbow.value = "OFF"
        }
        else {
            rainbow.value = "ON"
        }
        eraser.value = "OFF"
        darken.value = "OFF";
        lighten.value = "OFF";
    }
    if(e.target.id === 'darken') {
        if (darken.value === "ON") {
            darken.value = "OFF"
        }
        else {
            darken.value = "ON"
        }
        eraser.value = "OFF"
        rainbow.value = "OFF";
        lighten.value = "OFF";
    }
    if(e.target.id === 'lighten') {
        if (lighten.value === "ON") {
            lighten.value = "OFF"
        }
        else {
            lighten.value = "ON"
        }
        eraser.value = "OFF"
        rainbow.value = "OFF";
        darken.value = "OFF";
    }
});

/* Clear Grid */
// Clear Grid where Draw Events Trigger
clearGrid.addEventListener("click", () => {
    const square = gridContainer.querySelectorAll('.row .square');
    for (let i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = '';
    }
})

// Draw Features //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Draw Event Listener
gridContainer.addEventListener("pointerdown", (e) => {
    if (eraser.value === "ON") {
        eraseSquare(e);
        gridContainer.addEventListener("pointerover", eraseSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointerover", eraseSquare)
            }
        )
    }
    else if (rainbow.value === "ON") {
        rainbowSquare(e);
        gridContainer.addEventListener("pointerover", rainbowSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointerover", rainbowSquare)
            }
        )
    }
    else if (darken.value === "ON") {
        shadeSquare(e);
        gridContainer.addEventListener("pointerover", shadeSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointerover", shadeSquare)
            }
        )
    }
    else if (lighten.value === "ON") {
        lightenSquare(e);
        gridContainer.addEventListener("pointerover", lightenSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointerover", lightenSquare)
            }
        )
    }
    else {
        paintSquare(e);
        gridContainer.addEventListener("pointerover", paintSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointerover", paintSquare)
            }
        )
    }
});

// Change Background Color of Sqaure
function paintSquare(e) {
    if (e.target.className === "square") {
        e.target.style.backgroundColor = penColor;
    }
}

function eraseSquare(e) {
    if (e.target.className === "square") {
        e.target.style.backgroundColor = ``;
    }
}

function rainbowSquare(e) {
    if (e.target.className === "square") {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
}

function shadeSquare(e, color = gridColor) {
    if (e.target.className === "square") {
        if(e.target.style.backgroundColor === `rgb(0, 0, 0)`) {
            e.target.style.backgroundColor = `rgb(0, 0, 0)`;
        }
        else {
            if (e.target.style.backgroundColor === ``) {
                e.target.style.backgroundColor = color;
            }
            let newColor = e.target.style.backgroundColor;
            newColor = changeRGBString(newColor, 'd');
            e.target.style.backgroundColor = newColor;
        }
    }
}

function lightenSquare(e, color = gridColor) {
    if (e.target.className === "square") {
        if(e.target.style.backgroundColor === `rgb(255, 255, 255)`) {
            e.target.style.backgroundColor = `rgb(255, 255, 255)`;
        }
        else {
            if (e.target.style.backgroundColor === ``) {
                e.target.style.backgroundColor = color;
            }
            let newColor = e.target.style.backgroundColor;
            newColor = changeRGBString(newColor, 'l');
            e.target.style.backgroundColor = newColor;
        }
    }
}

function changeRGBString(rgbString, request) {
    rgbString = rgbString.slice(4, (rgbString.length - 1));
    console.log(rgbString);
    const rgbArray = rgbString.split(',').map(Number);

    if (request === 'd') {
        for(let i = 0; i < rgbArray.length; i++) {
            console.log('Before: ' + rgbArray[i]);
            rgbArray[i] = Math.round(Math.min(255, Math.max(0, rgbArray[i] - (0.1 * 255))));
            console.log('After: ' + rgbArray[i]);
        }
    }

    else {
        for(let i = 0; i < rgbArray.length; i++) {
            console.log('Before: ' + rgbArray[i]);
            rgbArray[i] = Math.round(Math.min(255, Math.max(0, rgbArray[i] + (0.1 * 255))));
            console.log('After: ' + rgbArray[i]);
        }
    }

    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
}