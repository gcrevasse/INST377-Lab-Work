document.addEventListener('DOMContentLoaded', () => {
  const width = 10;
  const grid = document.querySelector('.grid');
  const Scoredisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const squares = document.querySelectorAll('.grid div');
  let nextRandom = 0

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const tetrominoShapes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  // random selection and its first rotation
  let random = Math.floor(Math.random() * tetrominoShapes.length);
  let current = tetrominoShapes[random][0];

  // draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }

  // dont draw tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
    });
  }

  // make tetromino move down
  timerID = setInterval(moveDown, 200);

  // assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }

  document.addEventListener('keyup', control);

  // freeze function
  function freeze() {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
      // start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * tetrominoShapes.length);
      current = tetrominoShapes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape()
    }
  }

  // move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // move the tetromino left, unless it is at the edge
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  }

  // move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

  // rotate the tetromino
  function rotate() {
    undraw();
    // eslint-disable-next-line no-plusplus
    currentRotation++;
    if (currentRotation === current.length) { // if the current rotation gets to 4, make it go back to 0
      currentRotation = 0;
    }
    current = tetrominoShapes[random][currentRotation];
    draw();
  }

  //show up next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll('.mini')
  const displayWidth = 4
  let displayIndex = 0
  


  //The tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //L tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //z tetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //t tetromino
    [0, 1, displayWidth, displayWidth + 1], //o tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // i tetromino
  ]

  //display the shape in mini grid
  function displayShape() {
    displaySquares.forEach(square => {
        // remove any trace of a tetromino from the entire grid
        square.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }



});