const TicTacToe = (() => {

        const gameBoard = (function() {
            'use strict';
            let board = ["", "", "", "", "","","","",""]; 
            let turn = "";

            function updateBoard(){
                for(let i=0; i<9; i++){
                    let gameSquare = document.getElementById(i);
                    gameSquare.innerHTML = board[i];
                    if(board[i]=="X"){
                        gameSquare.classList.add("crosses");
                        gameSquare.classList.remove("naughts");
                    }
                    if(board[i]=="O"){
                        gameSquare.classList.add("naughts");
                        gameSquare.classList.remove("crosses");
                    }
                }                
            }
            function resetBoard(){
                board = ["", "", "", "", "","","","",""]; 
                updateBoard();
            }

            function addToBoard(i){
                board[i] = turn;
                updateBoard();
            }

            function getBoard(){
                return board;
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
                setPlayerTurn: setPlayerTurn,
                getBoard: getBoard,
                resetBoard: resetBoard
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
                    return characterSymbol;
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
                let player1 = playerFactory("Player 1", "X");
                let player2 = playerFactory("Player 2", "O");
                const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[2,5,8]];
                let count = 0;

                /*
                Modal CODE (to enter names at beginning and show winner at end)
                */
                let modal = document.getElementById("myModal");
                let span = document.getElementsByClassName("close")[0];
                let restartButton = document.getElementById("restart");
                let resetButton = document.getElementById("resetButton");
                const formElem = document.querySelector('form');
                window.addEventListener('load', (event) => {
                    modal.style.display = "block";
                });
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                    modal.style.display = "none";
                    }
                }

                span.onclick = function() {
                    modal.style.display = "none";
                }

                formElem.addEventListener('submit', (e) => {
                    // on form submission, prevent default
                    e.preventDefault();
                    // construct a FormData object, which fires the formdata event
                    const formData = new FormData(formElem);
                    let firstPlayerName = formData.get('player1');
                    let secondPlayerName = formData.get('player2');
                    if(firstPlayerName!="" && firstPlayerName!=null){
                        player1.setname(firstPlayerName);
                    }
                    if(secondPlayerName!="" && secondPlayerName!=null){
                        player2.setname(secondPlayerName);
                    }
                    modal.style.display = "none";
                    updateNames();
                });

                // Add event listner for restart button after game won
                restartButton.addEventListener("click", function(){
                    resetBoard();
                }); // same for reset button at bottom
                resetButton.addEventListener("click", function(){
                    resetBoard();
                });

                player1.setTurn(true);
                gameBoard.setPlayerTurn(player1.getcharacterSymbol());

                // Add names to the board
                function updateNames(){
                    let player1Div = document.getElementById("player1Name");
                    player1Div.innerHTML = player1.getname();
                    let player2Div = document.getElementById("player2Name");
                    player2Div.innerHTML = player2.getname();
                }
                
                // Add event listeners to each square
                for(let i=0; i<9; i++){
                    let gameSquare = document.getElementById(i);
                    gameSquare.addEventListener("click", function(){
                        // check to see if square is empty before adding
                        let theBoard = gameBoard.getBoard();
                        if(theBoard[i]=="" || theBoard[i]==null){
                            gameBoard.addToBoard(i);
                            checkWin();
                            count++;
                            changeTurn();
                        }
                    });
                }

                function changeTurn(){
                    if(player1.getTurn()){
                        player2.setTurn(true);
                        player1.setTurn(false);
                        let player2Symbol = player2.getcharacterSymbol();
                        gameBoard.setPlayerTurn(player2Symbol);

                        // change class
                        let player2NameDiv = document.getElementById("player2Name");
                        player2NameDiv.classList.add("playerTurn");
                        let player1NameDiv = document.getElementById("player1Name");
                        player1NameDiv.classList.remove("playerTurn");
                    }else{
                        player2.setTurn(false);
                        player1.setTurn(true);
                        let player1Symbol = player1.getcharacterSymbol();
                        gameBoard.setPlayerTurn(player1Symbol);

                        // change class
                        let player1NameDiv = document.getElementById("player1Name");
                        player1NameDiv.classList.add("playerTurn");
                        let player2NameDiv = document.getElementById("player2Name");
                        player2NameDiv.classList.remove("playerTurn");
                    }
                    

                    
                }
                function checkWin(){
                    // Check if anyone has won
                    if(count>=3 && count <9){
                        for(let i=0; i<winningCombos.length; i++){
                            let board = gameBoard.getBoard();
                            console.log("board");
                                if(board[winningCombos[i][0]]==player1.getcharacterSymbol() &&
                                board[winningCombos[i][1]]==player1.getcharacterSymbol() &&
                                board[winningCombos[i][2]]==player1.getcharacterSymbol()){
                                    winnerModal("The winner is: " + player1.getname());
                                }
                                if(board[winningCombos[i][0]]==player2.getcharacterSymbol() &&
                                board[winningCombos[i][1]]==player2.getcharacterSymbol() &&
                                board[winningCombos[i][2]]==player2.getcharacterSymbol()){
                                    winnerModal("The winner is: " + player2.getname());
                                }// check for draw (number of goes aka count reaches max and no winner then it's a draw)
                                else if(count==8 && i==(winningCombos.length+1)){
                                    winnerModal("It's a draw!");
                                }
                        }
                    }
                }

                function winnerModal(winner){
                    let winnerModal = document.getElementById("winnerMod");
                    winnerModal.style.display = "block";
                    let winnerDIV = document.getElementById("winnerDIV");
                    winnerDIV.innerHTML = winner;  
                }

                function resetBoard(){
                    count = 0;
                    gameBoard.resetBoard();
                    let winnerModal = document.getElementById("winnerMod");
                    winnerModal.style.display = "none";
                }

            
            
        })();

    
  })();
  
