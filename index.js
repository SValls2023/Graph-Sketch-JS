// Query Selectors
const colorPicker = document.querySelector('#color-picker');
const rainbowToggle = document.querySelector('#rainbow');
const eraserToggle = document.querySelector('#eraser')
const gridContainer = document.querySelector('#grid-container');
const slider = document.querySelector('#slider');
const slideValue = document.querySelector('#value');

// Pen Color
let penColor = "#000000";

// Change Color of Pen
colorPicker.addEventListener("input", (e) => {
    penColor = e.target.value;
});

// Slider Event Listeners (For changing grid size)
slider.oninput = function () {
    slideValue.textContent = `${this.value} x ${this.value}`;
};

slider.onchange = function () {
    makeGrid(this.value);
}

// Create Grid 
function makeGrid(squaresBy = 16) {
    gridContainer.replaceChildren();
    let squarePixels = 480/parseFloat(squaresBy);
    for (let i = 0; i < squaresBy; i++) {
        const row = document.createElement('div');
        row.classList.add("row");
        for (let j = 0; j < squaresBy; j++) {
            const square = document.createElement('div');
            square.classList.add("square");
            square.style.height = `${squarePixels}px`;
            square.style.width = `${squarePixels}px`;
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

// Draw Event Listener
gridContainer.addEventListener("pointerdown", (e) => {
    if (eraserToggle.checked) {
        eraseSquare(e);
        gridContainer.addEventListener("pointermove", eraseSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointermove", eraseSquare)
            }
        )
    }
    else if (rainbowToggle.checked) {
        rainbowSquare(e);
        gridContainer.addEventListener("pointermove", rainbowSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointermove", rainbowSquare)
            }
        )
    }
    else {
        paintSquare(e);
        gridContainer.addEventListener("pointermove", paintSquare);
        gridContainer.addEventListener("pointerup", () => {
                gridContainer.removeEventListener("pointermove", paintSquare)
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

function eraseSquare(e) {
    if (e.target.className === "square") {
        e.target.style.backgroundColor = "#ffffff";
    }
}


