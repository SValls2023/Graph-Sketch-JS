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
    let squarePixels = 480/parseFloat(squaresBy);
    for (let i = 0; i < squaresBy; i++) {
        const row = document.createElement('div');
        row.classList.add("row");
        for (let j = 0; j < squaresBy; j++) {
            const square = document.createElement('div');
            square.classList.add("square");
            square.style.cssText = `height: ${squarePixels}px;
                                    width: ${squarePixels}px;
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
penContainer.addEventListener("click", (e) => {
    if(e.target.id === 'eraser') {
        if (eraser.value === "ON") {
            eraser.value = "OFF"
        }
        else {
            eraser.value = "ON"
        }
        rainbow.value = "OFF"
    }
    if(e.target.id === 'rainbow') {
        if (rainbow.value === "ON") {
            rainbow.value = "OFF"
        }
        else {
            rainbow.value = "ON"
        }
        eraser.value = "OFF"
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

function rainbowSquare(e) {
    if (e.target.className === "square") {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
}

function eraseSquare(e, color = gridColor) {
    if (e.target.className === "square") {
        e.target.style.backgroundColor = ``;
    }
}