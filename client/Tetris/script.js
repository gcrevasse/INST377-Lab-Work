document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const grid = document.querySelector('.grid');
    
    const Scoredisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    let squares = document.querySelectorAll('.grid div');

    //The Tetrominoes
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
    let random = Math.floor(Math.random()*tetrominoShapes.length);
    let current = tetrominoShapes[random][0];

  // draw the tetromino
    function draw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }


    //dont draw tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }


    //make tetromino move down
    timerID = setInterval(moveDown, 500);


    //assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        }
    }

    document.addEventListener('keyup', control)

    //move down function
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze()
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            random = Math.floor(Math.random() * tetrominoShapes.length)
            current = tetrominoShapes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    //move the tetromino left, unless it is at the edge
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }


});