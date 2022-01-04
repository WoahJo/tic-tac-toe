const game = (function(){
    const gameGrid = document.querySelector('.gameGrid');
    const one = document.querySelector('.one');
    const two = document.querySelector('.two');
    const three = document.querySelector('.three');
    const four = document.querySelector('.four');
    const five = document.querySelector('.five');
    const six = document.querySelector('.six');
    const seven = document.querySelector('.seven');
    const eight = document.querySelector('.eight');
    const nine = document.querySelector('.nine');
    const resetGame = document.querySelector('.reset');
    let marker;
    let counterX = 0; //p1marks
    let counterO = 0; //p2marks
    let players = {
        player1: "", 
        player2: ""
    }
    let gameBoard = {
        field: [
            [one, two, three], 
            [four, five, six], 
            [seven, eight, nine]
        ],
        resetFunct: function(){
            if(!gameGrid.classList.contains('p1turn')){
                gameGrid.classList.toggle('p1turn');
            }
            const blocks = gameGrid.children;
            for(let i = 0; i < blocks.length; i++){
                for(let j = 0; j < blocks[i].children.length; j++){
                    blocks[i].children[j].textContent = "";
                }
            }
        },
        resetButton: function(){
            resetGame.addEventListener('click', function(){
                if(!gameGrid.classList.contains('p1turn')){
                    gameGrid.classList.toggle('p1turn');
                }
                gameBoard.resetFunct();              
            });
        },
        noRoom: function(e){
            if(!e.target.textContent == ""){
                return true;
            }
        },
        turnChange: function(e){
            let square = e.target;
            square.textContent = marker;
            // for(let i = 0; i < gameBoard.field.length; i++){
            //     let arrayCheck = gameBoard.field[i].indexOf(e.target);
            //     if(arrayCheck > -1){
            //         gameBoard.field[i][arrayCheck] = marker;
            //     }
            // }
            gameGrid.classList.toggle('p1turn');
        },
        playerTurns: function(){
            gameGrid.addEventListener('click', function(e){
                if((marker == "x" && !gameBoard.noRoom(e))|| (gameGrid.classList.contains ('p1turn') && !gameBoard.noRoom(e))){
                    marker = "x";
                    gameBoard.turnChange(e);
                    marker = "o";
                }
                else if(marker == "o" && !gameBoard.noRoom(e)){
                    gameBoard.turnChange(e);
                    marker = "x";
                }
                else {
                    alert('Occupied!');
                }
                gameBoard.winner();
            });
        }, 
        callWinner: function(){
            if(counterX == 3 ){
                alert(players.player1.getName() + ' is a Wiener!');
                counterO = 0;
                counterX = 0;
                gameBoard.resetFunct();
            }
            else if(counterO == 3){

            }
            else{
                counterO = 0;
                counterX = 0;
            }
        },
        winner: function(){
            const row = gameGrid.children; 
            for(let i = 0; i < row.length; i++){
                for(let j = 0; j < row[i].children.length; j++){
                    if(row[i].children[j].textContent == "x"){
                        counterX ++; 
                    }
                    if(row[i].children[j].textContent == "o"){
                        counterO ++;
                    }
                }
                gameBoard.callWinner();
            }
            for(let i = 0; i < row.length; i++){
                for(let j = 0; j < row[i].children.length; j++){
                    if(row[j].children[i].textContent == "x"){
                        counterX ++;
                    }
                    if(row[j].children[i].textContent == "o"){
                        counterO ++;
                    }
                }
                gameBoard.callWinner();
            }
            for(let i = 0; i < row.length; i++){
                if(row[i].children[i].textContent == "x"){
                    counterX ++;
                }
                if(row[i].children[i].textContent == "o"){
                    counterO ++;
                }
            }
            gameBoard.callWinner();

            let i = 0;
            let j = 2; 
            while(i < 3 && j >= 0){
                if(row[i].children[j].textContent == "x"){
                    counterX ++;
                }
                if(row[i].children[j].textContent == "o"){
                    counterO ++;
                }
                i ++;
                j --;
            }
            gameBoard.callWinner();
        }
    };
    gameBoard.resetButton();
    gameBoard.winner();
    gameBoard.playerTurns();
    return { gameBoard, players }
})();

const createPlayer = (playerName, playerSymbol) => {
    let score = 0;
    const getScore = () => score;
    const getName = () => playerName;
    const getSymb = () => playerSymbol;
    const addPoint = () => score ++; 
    
    return {getName, getSymb, addPoint, getScore};
};


const eventControl = (function(){
    const scoreboard = document.querySelector('.scoreboard');
    const newGame = document.querySelector('.new');
    const modal = document.querySelector('.modal');
    const sub = document.querySelector('.subForm')
    const form = document.getElementById('playInfo');
    const close = document.querySelector('.cancelForm');
    
    newGame.addEventListener('click', function(){
        modal.style.display = "block";
    });
    
    close.addEventListener('click', function(){
        modal.style.display = "none";
    });
    
    sub.addEventListener('click', function(){
        scoreboard.style.display = "flex";
        const formp1 = document.querySelector('.p1Name').value;
        const formp2 = document.querySelector('.p2Name').value;
        const p1Name = document.querySelector('.p1NameDisplay');
        const p2NAme = document.querySelector('.p2NameDisplay');
        
        p1Name.textContent = formp1 + ": ";
        p2NAme.textContent = formp2 + ": ";
        game.players.player1 = createPlayer(formp1, "x");
        game.players.player2 = createPlayer(formp2, "o");
        form.reset();
        modal.style.display = "none";

    });

})();