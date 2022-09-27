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
    ]
    
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
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]


    const tetrominoShapes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;


    //random selection and its first rotation
    let random = Math.floor(Math.random()*tetrominoShapes.length);
    let current = tetrominoShapes[0][0]

  // draw the first rotation in the tetromino
    function draw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    draw();

});