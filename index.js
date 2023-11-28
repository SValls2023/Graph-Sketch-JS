// Query Selectors
const penPicker = document.querySelector('#pen-color');
const rainbowToggle = document.querySelector('#rainbow');
const eraserToggle = document.querySelector('#eraser')
const gridContainer = document.querySelector('#grid-container');
const slider = document.querySelector('#slider');
const slideValue = document.querySelector('#value');

// Color and Toggle Menu //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pen Color
let penColor = `rgb(0, 0, 0)`;
let gridColor = `rgb(255, 255, 255)`;

// Change Color of Pen
penPicker.addEventListener("input", (e) => {
    penColor = e.target.value;
});

// Change Size of Grid
slider.oninput = function () {
    slideValue.textContent = `${this.value} x ${this.value}`;
};

slider.onchange = function () {
    makeGrid(this.value, gridColor);
}

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
                                    border-color: black;
                                    background-color: ${color};`
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

// Draw Features //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Draw Event Listener
gridContainer.addEventListener("pointerdown", (e) => {
    if (eraserToggle.checked) {
        eraseSquare(e);
        gridContainer.addEventListener("pointerover", eraseSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointerover", eraseSquare)
            }
        )
    }
    else if (rainbowToggle.checked) {
        rainbowSquare(e);
        gridContainer.addEventListener("pointerover", rainbowSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointerover", rainbowSquare)
            },
            { once: true }
        )
    }
    else {
        console.log('call paintsquare')
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
        console.log('paint');
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
        console.log('test');
        e.target.style.backgroundColor = `${color}`;
    }
}