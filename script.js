const container = document.getElementById('container');
const cells = [];

for (let i = 0; i < 30; i++) {
  cells[i] = [];
  for (let j = 0; j < 50; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.alive = false;
    cell.addEventListener('click', toggleCell);
    container.appendChild(cell);
    cells[i][j] = cell;
  }
}

function toggleCell() {
  const alive = this.dataset.alive === 'true';
  this.dataset.alive = !alive;
  this.style.backgroundColor = alive ? 'white' : 'black';
}

function startGame() {
  gameInterval = setInterval(nextGeneration, 500);
}

function stopGame() {
  clearInterval(gameInterval);
}

function clearGame() {
  stopGame();
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 50; j++) {
      cells[i][j].dataset.alive = false;
      cells[i][j].style.backgroundColor = 'white';
    }
  }
}

function selectPattern() {
  const pattern = document.getElementById('patterns').value;
  if (pattern === 'block') {
    cells[5][5].dataset.alive = true;
    cells[5][6].dataset.alive = true;
    cells[6][5].dataset.alive = true;
    cells[6][6].dataset.alive = true;
  } else if (pattern === 'beehive') {
    cells[6][5].dataset.alive = true;
    cells[6][6].dataset.alive = true;
    cells[7][4].dataset.alive = true;
    cells[7][7].dataset.alive = true;
    cells[8][5].dataset.alive = true;
    cells[8][6].dataset.alive = true;
  } else if (pattern === 'blinker') {
    cells[5][6].dataset.alive = true;
    cells[6][6].dataset.alive = true;
    cells[7][6].dataset.alive = true;
  } else if (pattern === 'toad') {
    cells[5][6].dataset.alive = true;
    cells[5][7].dataset.alive = true;
    cells[5][8].dataset.alive = true;
    cells[6][5].dataset.alive = true;
    cells[6][6].dataset.alive = true;
    cells[6][7].dataset.alive = true;
  } else if (pattern === 'glider') {
    cells[5][6].dataset.alive = true;
    cells[6][7].dataset.alive = true;
    cells[7][5].dataset.alive = true;
    cells[7][6].dataset.alive = true;
    cells[7][7].dataset.alive = true;
  } else if (pattern === 'lwss') {
    cells[5][6].dataset.alive = true;
    cells[5][7].dataset.alive = true;
    cells[5][8].dataset.alive = true;
    cells[5][9].dataset.alive = true;
    cells[6][5].dataset.alive = true;
    cells[6][9].dataset.alive = true;
    cells[7][9].dataset.alive = true;
    cells[8][6].dataset.alive = true;
    cells[8][8].dataset.alive = true;
    cells[8][9].dataset.alive = true;
} else if (pattern === 'rpentomino') {
    cells[5][6].dataset.alive = true;
    cells[5][7].dataset.alive = true;
    cells[6][5].dataset.alive = true;
    cells[6][6].dataset.alive = true;
    cells[7][6].dataset.alive = true;
  }
  // Si se ha seleccionado un patrón, actualizamos el estilo de las celdas correspondientes.
  if (pattern !== '') {
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 50; j++) {
        const cell = cells[i][j];
        const alive = cell.dataset.alive === 'true';
        if (alive) {
          cell.style.backgroundColor = 'black';
        } else {
          cell.style.backgroundColor = 'white';
        }
      }
    }
  }
}

function nextGeneration() {
  const nextGen = [];
  for (let i = 0; i < 30; i++) {
    nextGen[i] = [];
    for (let j = 0; j < 50; j++) {
      const neighbors = getNeighbors(i, j);
      const alive = cells[i][j].dataset.alive === 'true';
      if (alive && (neighbors < 2 || neighbors > 3)) {
        nextGen[i][j] = false;
      } else if (!alive && neighbors === 3) {
        nextGen[i][j] = true;
      } else {
        nextGen[i][j] = alive;
      }
    }
  }
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 50; j++) {
      const cell = cells[i][j];
      cell.dataset.alive = nextGen[i][j];
      const alive = cell.dataset.alive === 'true';
      cell.style.backgroundColor = alive ? 'black' : 'white';
    }
  }
}

function getNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const neighborX = x + i;
      const neighborY = y + j;
      if (neighborX < 0 || neighborX >= 30 || neighborY < 0 || neighborY >= 50) {
        continue;
      }
      const neighbor = cells[neighborX][neighborY];
      if (neighbor.dataset.alive === 'true') {
        count++;
      }
    }
  }
  return count;
}

