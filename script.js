const TicTacToe = (() => {
         
        const gameBoard = (function() {
            'use strict';
            let board = ["", "", "", "", "","","","",""]; 
            let turn = "";

            function updateBoard(){
                for(let i=0; i<9; i++){
                    let gameSquare = document.getElementById(i);
                    gameSquare.innerHTML = board[i];
                }
            }

            function addToBoard(i){
                board[i] = turn;
                updateBoard();
            }

            function getPlayerTurn(){
                return turn;
            }
            function setPlayerTurn(theTurn){
                turn = theTurn;
            }

            return {
                updateBoard: updateBoard,
                addToBoard: addToBoard,
                getPlayerTurn: getPlayerTurn,
                setPlayerTurn: setPlayerTurn
            };
            
        })();

        /*The player factory (to create player objects from)
            */
        const playerFactory = (name, XorO) =>{
            let score = 0;
            let characterSymbol = XorO;
            let playerName = name; 
            let isTurn = false;
            
            return{
                getname(){
                    return playerName;
                },
                setname(name){
                    playerName = name;
                },
                getcharacterSymbol(){
                    return XorO;
                },
                setcharacterSymbol(XorO){
                    characterSymbol = XorO;
                },
                getTurn(){
                    return isTurn;
                },
                setTurn(theTurn){
                    isTurn = theTurn;
                }

            }

        }

        const gameController = (() => {
                // Create two player objects (only two players for Tic Tac Toe)
                //################ MANUALLY ADDED NAMES - TO BE REMOVED ################
                let player1 = playerFactory("Aaron", "X");
                let player2 = playerFactory("Bob", "O");

                player1.setTurn(true);
                gameBoard.setPlayerTurn(player1.getcharacterSymbol());
                console.log("The game board current symbol is: " + gameBoard.getPlayerTurn());

                // Add event listeners to each square
                for(let i=0; i<9; i++){
                    let gameSquare = document.getElementById(i);
                    gameSquare.addEventListener("click", function(){
                        console.log("i: " + i);
                        gameBoard.addToBoard(i);
                        changeTurn();
                        console.log("The game board current symbol is: " + gameBoard.getPlayerTurn());
                    });
                }

                function changeTurn(){
                    if(player1.getTurn()){
                        player2.setTurn(true);
                        player1.setTurn(false);
                        let player2Symbol = player2.getcharacterSymbol();
                        console.log("player2Symbol " + player2Symbol);
                        gameBoard.setPlayerTurn(player2Symbol);
                    }else{
                        player2.setTurn(false);
                        player1.setTurn(true);
                        let player1Symbol = player1.getcharacterSymbol();
                        console.log("player1Symbol " + player1Symbol);
                        gameBoard.setPlayerTurn(player1Symbol);
                    }
                }

                
                //gameBoard.createBoard();
            
            
        })();

    
  })();
  
