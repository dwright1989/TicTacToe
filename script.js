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
                    }
                    if(board[i]=="O"){
                        gameSquare.classList.add("naughts");
                    }
                }
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
                getBoard: getBoard
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
                let player1 = playerFactory("Player 1", "X");
                let player2 = playerFactory("Player 2", "O");

                /*
                Modal CODE
                */
                let modal = document.getElementById("myModal");
                let span = document.getElementsByClassName("close")[0];
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

            
            
        })();

    
  })();
  
