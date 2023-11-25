// Element queries
const gridContainer = document.querySelector('#grid-container');
const slider = document.querySelector('#slider');
const slideValue = document.querySelector('#value');

// Grid slider event listeners
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
        let row = document.createElement('div');
        //console.log(row)
        row.classList.add("row");
        for (let j = 0; j < squaresBy; j++) {
            const square = document.createElement('div');
            square.style.height = `${squarePixels}px`;
            square.style.width = `${squarePixels}px`;
            row.appendChild(square);
            //console.log(square);
        }
        gridContainer.appendChild(row);
        //console.log(gridContainer);
    }
}

