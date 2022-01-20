const Display = (function(){
    const p1Score = document.querySelector('.p1ScoreDisplay');
    const p2Score = document.querySelector('.p2ScoreDisplay');
    const p1Name = document.querySelector('.p1NameDisplay');
    const p2Name = document.querySelector('.p2NameDisplay');
    const announceText = document.querySelector('.cardText');
    const announce = document.querySelector('.announce');


    const showNames = (p1, p2) => {
        p1Name.textContent = p1 + ':';
        p2Name.textContent = p2 + ':';
    };

    const updateScore = (p1score, p2score) => {
        p1Score.textContent = p1score; 
        p2Score.textContent = p2score; 
    };

    const announceWinner = (player) => {
        announceText.textContent = player + " wins!";
        announce.style.display = "block";

    }
    const announceTie = () => {
        announceText.textContent = "It's a tie.";
        announce.style.display = "block";
    }

    return {showNames, updateScore, announceWinner, announceTie}
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
    let isWinner;
    let players = {
        player1: "", 
        player2: "", 
        player2cpu: false
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
                    blocks[i].children[j].style.color = "black";
                }
            }
            marker = players.player1.getSymb();
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
        cpuTurn: function(){
            const spaces = [];
            const row = gameGrid.children;
            for(let i = 0; i < row.length; i++){
                for(let j = 0; j < row[i].children.length; j++){
                    if(row[i].children[j].textContent == ""){
                        // row[i].children[j].click();
                        // row[i].children[j].textContent = marker;
                        // return;
                        spaces.push(i, j);
                    }
                }
            }
            const rando = Math.floor(Math.random() * ((spaces.length*0.5) - 2)) * 2;
            row[spaces[rando]].children[spaces[rando + 1]].click();
            row[spaces[rando]].children[spaces[rando + 1]].textContent = marker;
        },
        playerTurns: function(){
            gameGrid.addEventListener('click', function(e){
                isWinner = false;
                if(scoreboard.style.display == ""){
                    alert('Press "New Game" and enter names.');
                    return false;
                }
                if((marker == players.player1.getSymb() && !gameBoard.noRoom(e))|| (gameGrid.classList.contains('p1turn') && !gameBoard.noRoom(e))){
                    marker = players.player1.getSymb();
                    gameBoard.turnChange(e);
                    e.target.style.color = "red";
                    marker = players.player2.getSymb();
                    gameBoard.winner();
                    if(players.player2cpu == true && !gameGrid.classList.contains('p1turn')){
                        gameBoard.cpuTurn();
                        marker = players.player1.getSymb();
                        gameGrid.classList.toggle('p1turn');
                    }
                    
                }
                else if(marker == players.player2.getSymb() && !gameBoard.noRoom(e) && !players.player2cpu){
                    gameBoard.turnChange(e);
                    e.target.style.color = "blue";
                    marker = players.player1.getSymb();
                }
                else if(gameBoard.noRoom(e)) {
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
            marker = players.player1.getSymb();
            // isWinner = false;
        },
        callWinner: function(){
            if(counterX == 3 ){
                // alert(players.player1.getName() + ' is a Wiener!');
                Display.announceWinner(players.player1.getName());
                players.player1.addPoint();
                isWinner = true;
                gameBoard.winReset();
                return;
            }
            else if(counterO == 3){
                // alert(players.player2.getName() + ' is a Wiener!');
                Display.announceWinner(players.player2.getName());
                players.player2.addPoint();
                isWinner = true;
                gameBoard.winReset();
                return;
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
            
            let tieCounter = 0;
            for(let i = 0; i < row.length; i++){
                for(let j = 0; j < row[i].children.length; j++){
                    if(row[i].children[j].textContent == players.player1.getSymb()){
                        tieCounter ++; 
                    }
                    if(row[i].children[j].textContent == players.player2.getSymb()){
                        tieCounter ++;
                    }
                }
            }

            if(tieCounter == 9 && !isWinner){
                Display.announceTie();
                gameBoard.winReset();
            }
            
        }
    };
    gameBoard.playerTurns();
    gameBoard.resetButton();
    // gameBoard.cpuTurn();
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
    const announce = document.querySelector('.announce');
    const alertDupl = document.querySelectorAll('.duplicate');
    const closeAnnounce = document.querySelector('.close'); 
    const cpuCheck = document.querySelector('.playCP');
    const p2Fields = document.querySelectorAll('.player2');
    let playCPU; 
    const george = document.querySelector('.george');
    const cpumark = "C";
    
    const restoreP2 = () => {
        const p2NameReq = document.querySelector('.p2Name');
        for(let i = 0; i < p2Fields.length; i++){
            p2Fields[i].style.display = "inherit";
            p2NameReq.required = true;
        }
    };
    
    const setPlayer = (p1name, p1symb, p2name, p2symb) => {
        const players = game.players;
        Display.showNames(p1name, p2name);
        players.player1 = createPlayer(p1name, p1symb);
        players.player2 = createPlayer(p2name, p2symb);
        Display.updateScore(players.player1.getScore(), players.player2.getScore());
        form.reset();
        modal.style.display = "none";
        alertDupl[0].style.display = "none";
        alertDupl[1].style.display = "none";
        
    };
    
    newGame.addEventListener('click', function(){
        modal.style.display = "block";
        form.reset();
        restoreP2();
        george.style.display = "none";
        game.players.player2cpu = false;
    });
    
    close.addEventListener('click', function(){
        form.reset();
        modal.style.display = "none";
        alertDupl[0].style.display = "none";
        alertDupl[1].style.display = "none";
    });
    
    closeAnnounce.addEventListener('click', function(){
        announce.style.display = "none";
    });
    
    cpuCheck.addEventListener('click', function(){
        if(cpuCheck.checked){
            const p2NameReq = document.querySelector('.p2Name');
            for(let i = 0; i < p2Fields.length; i++){
                p2Fields[i].style.display = "none";
                p2NameReq.required = false;
            }
            george.style.display = "inherit";
        }
        else{
            restoreP2();
            george.style.display = "none";
        }
        
    });
    
    sub.addEventListener('click', function(){
        scoreboard.style.display = "flex";
        const formp1 = document.querySelector('.p1Name').value;
        const formp2 = document.querySelector('.p2Name').value;
        let formp1mark = document.querySelector('.p1marker').value;
        let formp2mark = document.querySelector('.p2marker').value;
        
        if(!form.checkValidity()){
            form.reportValidity();
            return false;
        }
        if(formp1mark == ""){
            formp1mark = "x";
        }
        if(formp2mark == "" && !cpuCheck.checked){
            formp2mark = "o";
        }
        
        if(formp1mark === formp2mark || formp1mark === cpumark){
            alertDupl[0].style.display = "inline";
            alertDupl[1].style.display = "inline";
            formp1mark = ""; 
            formp2mark = "";
            return false;
        }
        else{
            if(cpuCheck.checked){
                formp2mark = "";
                setPlayer(formp1, formp1mark, "George", cpumark);
                game.players.player2cpu = true;
                modal.style.display = "none";
            }
            else{
                setPlayer(formp1, formp1mark, formp2, formp2mark);
                modal.style.display = "none";
            }
        }
        
    });
    
})();