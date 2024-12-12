let cells = document.querySelectorAll(".cell");
let statusEle = document.querySelector("#status");
let reset = document.querySelector("#reset");
const audio1 = document.getElementById("myAudio");

const winPatt = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let count = 0;;
let Winner = 0;
let initial = "O";

const checkWinner = () => {
    for (pattern of winPatt) {

        let first = cells[pattern[0]].innerText;
        let second = cells[pattern[1]].innerText;
        let third = cells[pattern[2]].innerText;

        if (first != "" && second != "" && third != "") {
            if (first === second && second === third) {
                audio1.play();
                for (let index = 0; index < 3; index++) {
                    cells[pattern[index]].style.backgroundColor = "red";
                    cells[pattern[index]].style.color = "white";
                }
                if (first === "X") {
                    statusEle.style.color = "red";
                    statusEle.style.backgroundColor = "white";
                    statusEle.style.borderRadius = "10px";

                }
                if (first === "O") {
                    statusEle.style.color = "red";
                    statusEle.style.backgroundColor = "white";
                    statusEle.style.borderRadius = "10px";

                }
                statusEle.innerHTML = `🎉🎉${first} Won The Game...🎉🎉 <br> Press Reset..`;

                cells.forEach(cell => {
                    cell.style.pointerEvents = "none";
                });
                Winner = 1;
                return;
            }
        }
    }
    if (count === 8 && Winner === 0) {
        audio1.play();

        statusEle.innerHTML = "Match draw! click reset <br> Press Reset..";
        statusEle.style.backgroundColor = "white";
        statusEle.style.borderRadius = "10px";

        cells.forEach(cell => {
            cell.style.pointerEvents = "none";
        });
    }

};

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.innerText === "") {
            if (initial === "O") {
                statusEle.innerText = "Player O's turn";
                cell.innerText = "X";
                cell.classList.add("X");
                initial = "X";
            } else {
                statusEle.innerText = "Player X's turn";
                cell.innerText = "O";
                cell.classList.add("O");
                initial = "O";
            }
        }
        cell.style.pointerEvents = "none";
        checkWinner();
        count++;
    });
});



reset.onclick = () => {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.pointerEvents = "all";
        cell.style.backgroundColor = "";
        cell.style.color = "";
        cell.classList.remove("X", "O");
    });
    initial = "O";
    count = 0;
    statusEle.innerText = "Player X's turn";
    statusEle.style.color = "black";
    statusEle.style.backgroundColor = "";
};
