// Grid Container 
const gridContainer = document.querySelector('#grid-container');
const changeSize = document.querySelector('#size-container');

changeSize.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        makeGrid(e.target.value);
    }
})

// Note for later: 
// 8 * 8 = 60px;
// 16 * 16 = 30px;
// 24 * 24 = 20px;
function makeGrid(squaresBy = 16) {
    gridContainer.replaceChildren();
    for (let i = 0; i < squaresBy; i++) {
        let row = document.createElement('div');
        //console.log(row)
        row.classList.add("row");
        for (let j = 0; j < squaresBy; j++) {
            const square = document.createElement('div');
            if (squaresBy == 16) {
                square.style.height = "30px";
                square.style.width = "30px";
            } else if (squaresBy == 8) {
                square.style.height = "60px";
                square.style.width = "60px";
            } else if (squaresBy == 24) {
                square.style.height = "20px";
                square.style.width = "20px";
            }
            row.appendChild(square);
            //console.log(square);
        }
        gridContainer.appendChild(row);
        //console.log(gridContainer);
    }
}

