const TicTacToe = (() => {
    /*
    This controls the actual game play
    */
    const gameController = (function(){

        /*
        The player factory (to create player objects from)
        */
        const playerFactory = (name) =>{
            let score = 0;
            

        }

        // Create two player objects (only two players for Tic Tac Toe)
        //################ MANUALLY ADDED NAMES - TO BE REMOVED ################
        let player1 = playerFactory("Aaron");
        let player2 = playerFactory("Bob");


        /*
        This controls what is displayed in the DOM
        */
        const displayController = (function(){

        });
        
        
        let board = ["X","O","O","X","O","X","X","O","X"]; // Array that is used to populate the board (stores values of X and Os)

        populateBoard(board);
       

       /*
       Function to populate the DOM
       */
       function populateBoard(board){
            for(let i=0; i<9; i++){
                let gameSquare = document.getElementById(i);
                gameSquare.innerHTML = board[i];
            }

       }

    })();
    
  })();
  
