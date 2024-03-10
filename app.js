let cells = [];

function generateBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      cells.push([i, j]);
    }
  }
}

generateBoard();

function makeRoutes(start) {
  const [a, b] = start;
  const optionsArr = [
    [a + 2, b + 1],
    [a + 2, b - 1],
    [a - 2, b + 1],
    [a - 2, b - 1],

    [a + 1, b + 2],
    [a + 1, b - 2],
    [a - 1, b + 2],
    [a - 1, b - 2],
  ];

  const filtered = optionsArr.filter((option) => {
    if (option[0] >= 0 && option[0] < 8 && option[1] >= 0 && option[1] < 8) {
      return true;
    }
  });

  return filtered;
}

const adjList = new Map();
function addNode(cell) {
  adjList.set(cell, makeRoutes(cell));
}

cells.forEach(addNode);

function returnCell(arr) {
  const [a, b] = arr;
  const index = cells.findIndex((cell) => {
    if (cell[0] == a && cell[1] == b) {
      return true;
    }
  });
  return cells[index];
}

function bfs(start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    let next = queue.shift();

    const cell = returnCell(next);
    const destinations = adjList.get(cell);

    for (const dest of destinations) {
      queue.push(dest);

      if (dest[0] == 4 && dest[1] == 3) {
        console.log(`found at ${dest}`);
        return;
      }

      if (!visited.has(dest)) {
        visited.add(dest);
        queue.push(dest);
        console.log(dest);
      }
    }
  }
}

// bfs(test);

function knights(begin, end) {
  const beginning = returnCell(begin);
  const ending = returnCell(end);
  const allPaths = [];

  function dfs(start, visited = new Set()) {
    allPaths.push(start);
    visited.add(start);

    const cell = returnCell(start);
    const destinations = adjList.get(cell);

    for (const dest of destinations) {
      if (dest[0] === ending[0] && dest[1] === ending[1]) {
        allPaths.push(dest);
        return;
      }
      if (!visited.has(dest)) {
        dfs(dest, visited);
      }
    }
  }

  dfs(beginning);

  const index = allPaths.findIndex((path) => {
    if (path[0] === ending[0] && path[1] === ending[1]) {
      return true;
    }
  });
  const final = allPaths.slice(0, index).join(' => ');

  console.log(`Here is your path: [${beginning}] => [${final}] => [${ending}]`);
}

knights([0, 1], [6, 2]);
