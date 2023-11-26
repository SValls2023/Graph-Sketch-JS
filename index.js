// Query Selectors
const gridContainer = document.querySelector('#grid-container');
const slider = document.querySelector('#slider');
const slideValue = document.querySelector('#value');
const colorPicker = document.querySelector("#color-picker");

// Pen Color
let penColor = "#000000";

// Change Color of Pen
colorPicker.addEventListener("input", (e) => {
    penColor = e.target.value;
});

// Slider Event Listeners
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
        // console.log(row)
        row.classList.add("row");
        for (let j = 0; j < squaresBy; j++) {
            const square = document.createElement('div');
            square.classList.add("square");
            square.style.height = `${squarePixels}px`;
            square.style.width = `${squarePixels}px`;
            row.appendChild(square);

            //console.log(square);
        }
        gridContainer.appendChild(row);
        //console.log(gridContainer);
    }
}

// Draw
gridContainer.addEventListener("mousedown", (e) => {
    if(e.target.className === "square") {
        e.target.style.backgroundColor = penColor;
        gridContainer.addEventListener("mouseover", paintSquare);
        gridContainer.addEventListener("mouseup", () => {
                gridContainer.removeEventListener("mouseover", paintSquare)
            }
        )
    }
});

function paintSquare(e) {
    if (e.target.className === "square") {
        e.target.style.backgroundColor = penColor;
    }
}


