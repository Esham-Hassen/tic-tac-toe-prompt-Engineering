let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
let gameOver = false;
let Audio_success = new Audio('audio/success.mp3');


function init() {
  render();
}

function render() {
  const contentDiv = document.getElementById("content");
  let tableHtml = '<table>'

  for (let i = 0; i < 3; i++) {
    tableHtml += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = "";
      if (fields[index] === "circle") {
        symbol = generateSvgCircle();
      } else if (fields[index] === "cross") {
        symbol = generateSvgCross();
      }
      tableHtml += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
    }
    tableHtml += "</tr>";
  }

  tableHtml += "</table>";
  contentDiv.innerHTML = tableHtml;
}


function restartGame() {
    fields = [null, null, null, null, null, null, null, null, null];
    gameOver = false; // Reset gameOver flag
    currentPlayer = "circle"; // Reset currentPlayer
    render(); // Re-render the game board
}



function handleClick(index, cell) {
  if (fields[index] === null && !gameOver) {
    fields[index] = currentPlayer;
    if (currentPlayer === "circle") {
      cell.innerHTML = generateSvgCircle();
      currentPlayer = "cross";
    } else {
      cell.innerHTML = generateSvgCross();
      currentPlayer = "circle";
    }
    cell.onclick = null;
  }

  const winLine = checkWin();
  if (winLine) {
    gameOver = true;
    drawWinningLine(winLine);
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical lines
    [0, 4, 8],
    [2, 4, 6], // diagonal lines
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i]; // Get the three positions in this combination

    // Check if all three positions have the same symbol (either 'circle' or 'cross')
    //The cell at index a is not empty.
    //The cell at index a has the same value as the cell at index b.
    //The cell at index a has the same value as the cell at index c.
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return winConditions[i]; // Return the winning combination
    }
  }

  return null; // No winner found, return null
}

// function drawWinningLine(winLine) {
//   const cells = document.querySelectorAll("td");
//   const startCell = cells[winLine[0]];
//   const endCell = cells[winLine[2]];

//   const startPos = startCell.getBoundingClientRect();
//   const endPos = endCell.getBoundingClientRect();

//   const tablePos = document.querySelector("table").getBoundingClientRect();

//   const svgHtml = `
//       <svg width="${tablePos.width}" height="${tablePos.height}" viewBox="0 0 ${
//     tablePos.width
//   } ${
//     tablePos.height
//   }" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">
//         <line x1="${
//           startPos.left - tablePos.left + startCell.clientWidth / 2
//         }" y1="${startPos.top - tablePos.top + startCell.clientHeight / 2}" 
//               x2="${
//                 endPos.left - tablePos.left + endCell.clientWidth / 2
//               }" y2="${endPos.top - tablePos.top + endCell.clientHeight / 2}" 
//               stroke="white" stroke-width="5">
//           <animate attributeName="stroke-dasharray" from="0 300" to="300 0" dur="1s" fill="freeze" />
//         </line>
//       </svg>
//     `;
//   document.querySelector("table").innerHTML += svgHtml;
// }


function drawWinningLine(winLine) {
  const cells = document.querySelectorAll("td");
  const startCell = cells[winLine[0]];
  const endCell = cells[winLine[2]];

  const startPos = startCell.getBoundingClientRect();
  const endPos = endCell.getBoundingClientRect();

  const tablePos = document.querySelector("table").getBoundingClientRect();

  const svgHtml = `
      <svg width="${tablePos.width}" height="${tablePos.height}" viewBox="0 0 ${tablePos.width} ${tablePos.height}" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">
        <line x1="${startPos.left - tablePos.left + startCell.clientWidth / 2}" y1="${startPos.top - tablePos.top + startCell.clientHeight / 2}" 
              x2="${endPos.left - tablePos.left + endCell.clientWidth / 2}" y2="${endPos.top - tablePos.top + endCell.clientHeight / 2}" 
              stroke="white" stroke-width="5">
          <animate attributeName="stroke-dasharray" from="0 300" to="300 0" dur="1s" fill="freeze" />
        </line>
      </svg>
    `;
  document.querySelector("table").innerHTML += svgHtml;

  // Play the winning sound
  const winSound = document.getElementById("winSound");
  Audio_success.play();
}



function generateSvgCircle() {
  const color = "#FFC000";
  const width = 70;
  const height = 70;

  return `
      <svg width="${width}" height="${height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none" stroke-dasharray="188.4" stroke-dashoffset="188.4">
          <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="200ms" fill="freeze" />
        </circle>
      </svg>
    `;
}

function generateSvgCross() {
  const color = "#00B0EF";
  const width = 70;
  const height = 70;

  return `
      <svg width="${width}" height="${height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line x1="15" y1="15" x2="55" y2="55" stroke="${color}" stroke-width="5">
          <animate attributeName="stroke-dasharray" from="0 56" to="56 0" dur="200ms" fill="freeze" />
        </line>
        <line x1="15" y1="55" x2="55" y2="15" stroke="${color}" stroke-width="5">
          <animate attributeName="stroke-dasharray" from="0 56" to="56 0" dur="200ms" fill="freeze" />
        </line>
      </svg>
    `;
}
