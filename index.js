// Grid Container 
const gridContainer = document.querySelector('#grid-container');


function makeGrid(squaresBy = 16) {
    for (let i = 0; i < squaresBy; i++) {
        let row = document.createElement('div');
        console.log(row)
        row.classList.add("row");
        for (let j = 0; j < squaresBy; j++) {
            const square = document.createElement('div');
            if (squaresBy === 16) {
                square.style.height = "30px";
                square.style.width = "30px";
            }
            row.appendChild(square);
            console.log(square);
        }
        gridContainer.appendChild(row);
        console.log(gridContainer);
    }
}

