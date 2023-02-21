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

function nextGeneration() {
  const newCells = [];
  for (let i = 0; i < 30; i++) {
    newCells[i] = [];
    for (let j = 0; j < 50; j++) {
      const cell = cells[i][j];
      const isAlive = cell.dataset.alive === 'true';
      const neighbors = countNeighbors(i, j);
      let willLive = isAlive;
      if (isAlive && (neighbors < 2 || neighbors > 3)) {
        willLive = false;
      } else if (!isAlive && neighbors === 3) {
        willLive = true;
      }
      newCells[i][j] = willLive;
    }
  }
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 50; j++) {
      const cell = cells[i][j];
      const willLive = newCells[i][j];
      cell.dataset.alive = willLive;
      cell.style.backgroundColor = willLive ? 'black' : 'white';
    }
  }
}

function countNeighbors(i, j) {
  let count = 0;
  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (x >= 0 && x < 30 && y >= 0 && y < 50 && !(x === i && y === j)) {
        const cell = cells[x][y];
        if (cell.dataset.alive === 'true') {
          count++;
        }
      }
    }
  }
  return count;
}

setInterval(nextGeneration, 1000);
