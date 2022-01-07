const Display = (function(){
    const p1Score = document.querySelector('.p1ScoreDisplay');
    const p2Score = document.querySelector('.p2ScoreDisplay');
    const p1Name = document.querySelector('.p1NameDisplay');
    const p2Name = document.querySelector('.p2NameDisplay');
    const space = document.createTextNode("\u00A0");
        

    const showNames = (p1, p2) => {
        p1Name.textContent = p1 + ':';
        p2Name.textContent = p2 + ':';
    };

    const updateScore = (p1score, p2score) => {
        p1Score.textContent = p1score; 
        p2Score.textContent = p2score; 
    };

    return {showNames, updateScore}
})();

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
    const scoreboard = document.querySelector('.scoreboard');
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
                if(scoreboard.style.display == ""){
                    alert('Press "New Game" and enter names.');
                    return false;
                }
                if((marker == players.player1.getSymb() && !gameBoard.noRoom(e))|| (gameGrid.classList.contains ('p1turn') && !gameBoard.noRoom(e))){
                    marker = players.player1.getSymb();
                    gameBoard.turnChange(e);
                    marker = players.player2.getSymb();
                }
                else if(marker == players.player2.getSymb() && !gameBoard.noRoom(e)){
                    gameBoard.turnChange(e);
                    marker = players.player1.getSymb();
                }
                else {
                    alert('Occupied!');
                }
                gameBoard.winner();
            });
        }, 
        winReset: function(){
            counterO = 0;
            counterX = 0;
            Display.updateScore(players.player1.getScore(), players.player2.getScore());
            gameBoard.resetFunct();
        },
        callWinner: function(){
            if(counterX == 3 ){
                alert(players.player1.getName() + ' is a Wiener!');
                players.player1.addPoint();
                gameBoard.winReset();
            }
            else if(counterO == 3){
                alert(players.player2.getName() + ' is a Wiener!');
                players.player2.addPoint();
                gameBoard.winReset();
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
                    if(row[i].children[j].textContent == players.player1.getSymb()){
                        counterX ++; 
                    }
                    if(row[i].children[j].textContent == players.player2.getSymb()){
                        counterO ++;
                    }
                }
                gameBoard.callWinner();
            }
            for(let i = 0; i < row.length; i++){
                for(let j = 0; j < row[i].children.length; j++){
                    if(row[j].children[i].textContent == players.player1.getSymb()){
                        counterX ++;
                    }
                    if(row[j].children[i].textContent == players.player2.getSymb()){
                        counterO ++;
                    }
                }
                gameBoard.callWinner();
            }
            for(let i = 0; i < row.length; i++){
                if(row[i].children[i].textContent == players.player1.getSymb()){
                    counterX ++;
                }
                if(row[i].children[i].textContent == players.player2.getSymb()){
                    counterO ++;
                }
            }
            gameBoard.callWinner();

            let i = 0;
            let j = 2; 
            while(i < 3 && j >= 0){
                if(row[i].children[j].textContent == players.player1.getSymb()){
                    counterX ++;
                }
                if(row[i].children[j].textContent == players.player2.getSymb()){
                    counterO ++;
                }
                i ++;
                j --;
            }
            gameBoard.callWinner();
        }
    };
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
        const formp1mark = document.querySelector('.p1marker').value;
        const formp2mark = document.querySelector('.p2marker').value;
        const players = game.players;
        
        Display.showNames(formp1, formp2);
        players.player1 = createPlayer(formp1, formp1mark);
        players.player2 = createPlayer(formp2, formp2mark);
        Display.updateScore(players.player1.getScore(), players.player2.getScore());
        form.reset();
        modal.style.display = "none";

    });

})();