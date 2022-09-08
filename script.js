const TicTacToe = (() => {
         
        const gameBoard = (function() {
            'use strict';
            let board = ["O", "X", "X", "X", "O","O","X","O","X"]; 
            const updateBoard = (a, b) => a - b;
            const resetBoard = (a, b) => a * b;

            function createBoard(){
                for(let i=0; i<9; i++){
                    let gameSquare = document.getElementById(i);
                    gameSquare.innerHTML = board[i];
                }
            }

            return {
                createBoard: createBoard
            };
            
        })();

        /*The player factory (to create player objects from)
            */
        const playerFactory = (name, XorO) =>{
            let score = 0;
            let characterSymbol = XorO;
            let playerName = name; 
            
            return{
                get name(){
                    return playerName;
                },
                set name(name){
                    playerName = name;
                },
                get characterSymbol(){
                    return XorO;
                },
                set characterSymbol(XorO){
                    characterSymbol = XorO;
                }

            }

        }

        const gameController = (() => {
                // Create two player objects (only two players for Tic Tac Toe)
                //################ MANUALLY ADDED NAMES - TO BE REMOVED ################
                let player1 = playerFactory("Aaron", "X");
                let player2 = playerFactory("Bob", "O");

                let turn = player1.characterSymbol;

                // Add event listeners to each square
                for(let i=0; i<9; i++){
                    let gameSquare = document.getElementById(i);
                    gameSquare.addEventListener("click", function(i){
                        gameBoard.addToBoard(i);
                    });
                }

                gameBoard.createBoard();
            
            
        })();

    
  })();
  
