let data = [
    [6, "", "", 9, "", "", "", "", 3],
    [8, "", "", 2, "", 4, 1, "", 7],
    [4, "", "", "", 7, "", "", 9, ""],
    ["", 4, "", 7, "", "", "", 6, ""],
    ["", 3, "", "", 2, "", 9, 7, ""],
    [7, "", 1, 3, "", 8, "", "", 2],
    ["", 7, "", 6, 1, "", 2, "", 4],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", 5, "", "", "", "", 9]
];

let solution = [
    [6, 1, 7, 9, 8, 5, 4, 2, 3],
    [8, 9, 3, 2, 6, 4, 1, 5, 7],
    [4, 5, 2, 1, 7, 3, 8, 9, 6],
    [2, 4, 9, 7, 5, 1, 3, 6, 8],
    [5, 3, 8, 4, 2, 6, 9, 7, 1],
    [7, 6, 1, 3, 9, 8, 5, 4, 2],
    [3, 7, 5, 6, 1, 9, 2, 8, 4],
    [9, 2, 4, 8, 3, 7, 6, 1, 5],
    [1, 8, 6, 5, 4, 2, 7, 3, 9],
]

let table = document.getElementById("tableTwo");
// console.log(table.rows);
let populateSudoku = (n) => {
    for (let i = 0; i < table.rows.length; i++) {
        // Create a row element
        let row = table.rows[i];
        //   console.log(row);
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            let input = cell.children;
            input[0].value = n[i][j];
            // console.log(input[0]);
            if (n[i][j] != "") {
                input[0].disabled = true;
            }
        }
    }
}

let updateData = (number) => {
    let columnIndex = number.target.parentElement.cellIndex;
    let rowIndex = number.target.parentElement.parentElement.rowIndex;
    data[rowIndex][columnIndex] = parseInt(number.target.value);
    // console.log(data);
}

let solveSudoku = (solve) => {
    for (let i = 0; i < table.rows.length; i++) {
        // Create a row element
        let row = table.rows[i];
        //   console.log(row);
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            let input = cell.children;
            input[0].value = solve[i][j];
        }
    }
    data = solve;
}


let inputs = document.querySelectorAll("input");
for (let input of inputs) {
    input.addEventListener("input", updateData);
}

populateSudoku(data);

let checkArray = (array) => {
    // console.log(row);

    // 1. Find out if there are all numbers from 1 to 9
    for (let num = 1; num <= 9; num++) {
        // console.log(row.includes(num));

        // 2. If one of the numbers is not in the row, the row is not valid => returning false
        if (array.includes(num) == false) {
            return false;
        }
    }
    return true;
}

let findBox = (row, column) => {
    if (row < 3 && column < 3) {
        return 0;
    }
    if (row < 3 && column >= 3 && column < 6) {
        return 1;
    }
    if (row < 3 && column > 5) {
        return 2;
    }
    if (row >= 3 && row < 6 && column < 3) {
        return 3;
    }
    if (row >= 3 && row < 6 && column >= 3 && column < 6) {
        return 4;
    }
    if (row >= 3 && row < 6 && column > 5) {
        return 5;
    }
    if (row > 5 && column < 3) {
        return 6;
    }
    if (row > 5 && column >= 3 && column < 6) {
        return 7;
    }
    if (row > 5 && column > 5) {
        return 8;
    }
}

let isValidSudoku = (data) => {
    let columns = [[], [], [], [], [], [], [], [], []];
    let boxes = [[], [], [], [], [], [], [], [], []];
    // console.log(columns);
    // console.log(boxes);

    // 1. Validate rows
    // 1.1 Create a loop to go through each row
    for (let r = 0; r < data.length; r++) {
        // console.log(data[r]);
        let row = data[r];

        // 1.2 Check row for duplicates
        if (checkArray(row) == false) {
            return false;
        }

        // 2. Validate columns
        // 3. Validate boxes

        // Create a loop to go through each number in row
        for (let cell = 0; cell < row.length; cell++) {
            // 2.1 Add number from row to appropriate column
            columns[cell].push(row[cell]);
            // console.log(columns[cell]);
            // console.log(row[cell]);

            // 3.1 Add number from row to correct box
            // Calculate boxNum
            let boxNum = findBox(r, cell);
            boxes[boxNum].push(row[cell]);
        }
    }

    // 2.2 Go through each column and check the validity
    for (let column of columns) {
        if (checkArray(column) == false) {
            return false;
        }
    }

    // 3.2 Create a loop to go through each box and check validity
    for (let box of boxes) {
        if (checkArray(box) == false) {
            return false;
        }
    }
    return true
};

console.log(isValidSudoku(data));

table.addEventListener("input", limitNumber);
function limitNumber(e) {
    // console.log(e.target.value);
    if (e.target.value !== '' && (e.target.value > 9 || e.target.value < 1)) {
        e.target.value = '';
        alert("You can input only from 1 to 9 at maximum.");
    }
}

let checkBtn = document.getElementById("checkVal");
checkBtn.addEventListener("click", checkSudoku);

function checkSudoku() {
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            let input = cell.children;
            if (input[0].value == "") {
                alert("You need to fill all the fields");
                return;
            }
        }
    }
    let isSudokuValid = isValidSudoku(data);
    if (isSudokuValid) {
        alert("Congrats, no mistakes found!🎉");
    } else {
        alert("Looks like there's a mistake, try again.");
    }
}

let resetButton = document.getElementById("resetBtn");
resetButton.addEventListener("click", resetSudoku);

function resetSudoku() {
    let inputs = document.querySelectorAll('#tableTwo input[type="number"]');
    for (let input of inputs) {
        if (!input.disabled) {
            input.value = '';
        }
    }
}