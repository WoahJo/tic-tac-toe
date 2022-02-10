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
        ]
    };
    const resetFunct = () => {
        const blocks = gameGrid.children;
        for(let i = 0; i < blocks.length; i++){
            for(let j = 0; j < blocks[i].children.length; j++){
                blocks[i].children[j].textContent = "";
                blocks[i].children[j].style.color = "black";
            }
        }
        marker = players.player1.getSymb();
    };
    const resetButton = () => {
        resetGame.addEventListener('click', function(){
            if(!gameGrid.classList.contains('p1turn')){
                gameGrid.classList.toggle('p1turn');
            }
            resetFunct();              
        });
    }
    const noRoom = (e) => {
        if(!e.target.textContent == ""){
            return true;
        }
    };
    const turnChange = (e)=> {
        let square = e.target;
        square.textContent = marker;
        // for(let i = 0; i < gameBoard.field.length; i++){
        //     let arrayCheck = gameBoard.field[i].indexOf(e.target);
        //     if(arrayCheck > -1){
        //         gameBoard.field[i][arrayCheck] = marker;
        //     }
        // }
        gameGrid.classList.toggle('p1turn');
    };
    const cpuTurn = () => {
        const legalMoves = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];
        const winMoves = [
            ['00', '01', '02'], //Horizontal top
            ['10', '11', '12'], //Horizontal mid
            ['20', '21', '22'], //Horizontal bottom 
            ['00', '10', '20'], //Vertical left
            ['01', '11', '21'], //Vertical mid
            ['02', '12', '22'], //Vertical right
            ['00', '11', '22'], //Diagonal l2r
            ['02', '11', '20'] //Diagonal r2l
        ];

        const p1Moves = [];
        const cpuMoves = [];
        const toString = (a, b) => {
            return '' + a + b;
        }
        const takenMoves = [];
        const row = gameGrid.children;
        for(let i = 0; i < winMoves.length; i++){
            let marked = false;
            let p1Spot = 0;
            let cpuSpot = 0;
            const emptySpace = [];
            for(let j = 0; j < winMoves[i].length; j++){
                const targetSquare = row[winMoves[i][j][0]].children[winMoves[i][j][1]];
                if(targetSquare.textContent == players.player1.getSymb()){
                    p1Spot ++; 
                }
                else if (targetSquare.textContent == 'C'){
                    cpuSpot ++; 
                }
                else if (targetSquare.textContent == ""){
                    emptySpace.push(toString(winMoves[i][j][0], winMoves[i][j][1]));
                }
            }
            if(p1Spot === 2 && emptySpace.length === 1 || cpuSpot === 2 && emptySpace.length === 1){
                row[emptySpace[0][0]].children[emptySpace[0][1]].click();                
                row[emptySpace[0][0]].children[emptySpace[0][1]].textContent = marker; 
                marked = true;
                break;               
            }
            else if (i === winMoves.length - 1 && !marked){
                const spaces = [];
                for(let i = 0; i < row.length; i++){
                    for(let j = 0; j < row[i].children.length; j++){
                        if(row[i].children[j].textContent == ""){
                        spaces.push(i, j);
                        }
                    }
                
                }
                const rando = Math.floor(Math.random() * ((spaces.length*0.5) - 2)) * 2;
                row[spaces[rando]].children[spaces[rando + 1]].click();
                row[spaces[rando]].children[spaces[rando + 1]].textContent = marker;
            }
        }

        //--------Original Rando Pick-------------
        // const spaces = [];
        // const row = gameGrid.children;
        // for(let i = 0; i < row.length; i++){
        //     for(let j = 0; j < row[i].children.length; j++){
        //         if(row[i].children[j].textContent == ""){
        //             spaces.push(i, j);
        //         }
        //     }
        // }
        // const rando = Math.floor(Math.random() * ((spaces.length*0.5) - 2)) * 2;
        // row[spaces[rando]].children[spaces[rando + 1]].click();
        // row[spaces[rando]].children[spaces[rando + 1]].textContent = marker;
        
        //------------New Idea Below---------------
        // const legalMoves = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];
        // const leftVertWin = ['00', '10', '20'];
        // const midVertWin = ['01', '11', '21'];
        // const rightVertWin = ['02', '12', '22'];
        // const topHorWin = ['00', '01', '02'];
        // const midHorWin = ['10', '11', '12'];
        // const bottHortWin = ['20', '21', '22'];
        // const lrDiagWin = ['00', '11', '22'];
        // const rlDiagWin = ['02', '11', '20'];
        // const cpuMoves = [];
        // const p1Moves = [];
        // const toString = (a, b) => {
        //     return ('' + a + b);
        // };
        // //goes through and gathers player and cpu moves
        // const row = gameGrid.children; 
        // for(let i = 0; i < row.length; i++){
        //     for(let j = 0; j < row[i].children.length; j++){
        //         if(row[i].children[j].textContent == players.player1.getSymb()){
        //             const toP1Moves = toString(i, j);
        //             p1Moves.push(toP1Moves);
        //         }
        //         else if (row[i].children[j].textContent == players.player2.getSymb()){
        //             const toCpuMoves = toString(i,j);
        //             cpuMoves.push(toCpuMoves); 
        //         }
        //     }
        // }
    
        // const takenSpaces = p1Moves.concat(cpuMoves);
        // const freeSpaces = legalMoves.filter((obj)=> {
        //     return takenSpaces.indexOf(obj) === -1;
        // });

        // if(freespace > 7){
        //     if [1][1] is free - place;
        //     else if a corner is free - place;
        // }

        // const emptyLV = compare p1moves with lvwin 
        // const emptymvwin = compare p1 moves with the win
        // so on and so... 
        // if(emptyLV... length == 1 && freespace < 6){
        //     place;
        // }
        // else if (emptywinmoves length == 2){
        //     place;
        // }
        
        //-------------Other idea below--------------------
        // const p1Mark = players.player1.getSymb();
        // for(let i = 0; i < freeSpaces.length; i++){
        //     const cpuPlace = () => {
        //     row[rowNum].children[columnNum].click();
        //         row[rowNum].children[columnNum].textContent = marker;
        //     };
        //     const rowNum = Number(freeSpaces[i][0]);
        //     const columnNum = Number(freeSpaces[i][1]);

        //     if(freeSpaces.length == 8 && freeSpaces.indexOf('11') != -1 ){
        //         row[1].children[1].click();                
        //         row[1].children[1].textContent = marker;
        //         break;                
        //     }

        //     if(rowNum === 1){
        //         //check for surrounding marks
        //         if((row[rowNum + 1].children[columnNum].textContent === p1Mark && row[rowNum - 1].children[columnNum].textContent === p1Mark)|| (row[rowNum + 1].children[columnNum].textContent === 'C' && row[rowNum - 1].children[columnNum].textContent === 'C')){
        //             cpuPlace();
        //             break;
        //         }
        //     }
        //     else if (columnNum === 1){
        //         //check both sides of the middle column for cpu and player marks 
        //         if((row[rowNum].children[columnNum + 1].textContent === p1Mark && row[rowNum].children[columnNum - 1].textContent === p1Mark)|| (row[rowNum].children[columnNum + 1].textContent === 'C' && row[rowNum].children[columnNum - 1].textContent === 'C')){
        //             cpuPlace();
        //             break;
        //         }
                
        //     }

        //     else if (columnNum === 0){
        //         if((row[rowNum].children[columnNum + 1].textContent === p1Mark && row[rowNum].children[columnNum + 2].textContent === p1Mark) || (row[rowNum].children[columnNum + 1].textContent === 'C' && row[rowNum].children[columnNum + 2].textContent === 'C')){
        //             cpuPlace();
        //             break;
        //         }
        //     }

        //     else if(columnNum === 2){
        //         if((row[rowNum].children[columnNum - 1].textContent === p1Mark && row[rowNum].children[columnNum - 2].textContent === p1Mark) || (row[rowNum].children[columnNum - 1].textContent === 'C' && row[rowNum].children[columnNum - 2].textContent === 'C')){
        //             cpuPlace();
        //             break;
        //         }
        //     }

        //     else if(columnNum === 2 || columnNum === 0) {
        //         //checks to see if the vertical spaces afterwards are occupied with user or 
        //         //cpu markers
        //         if((rowNum === 0 && row[rowNum + 1].children[columnNum].textContent === p1Mark && rowNum === 0 && row[rowNum + 2].children[columnNum].textContent === p1Mark) || (rowNum === 0 && row[rowNum + 1].children[columnNum].textContent === 'C' && rowNum === 0 && row[rowNum + 2].children[columnNum].textContent === 'C')){
        //             cpuPlace();
        //             break;
        //         }
        //         if((rowNum === 2 && row[rowNum - 1].children[columnNum].textContent === p1Mark && row[rowNum - 2].children[columnNum].textContent === p1Mark) || (rowNum === 2 && row[rowNum - 1].children[columnNum].textContent === 'C' && row[rowNum - 2].children[columnNum].textContent === 'C')){ 
        //             cpuPlace();
        //             break;
        //         }
        //         if((rowNum === 1 && row[rowNum - 1].children[columnNum].textContent === p1Mark && row[rowNum + 1].children[columnNum].textContent === p1Mark) || (rowNum === 1 && row[rowNum - 1].children[columnNum].textContent === 'C' && row[rowNum + 1].children[columnNum].textContent === 'C')){
        //             cpuPlace();
        //             break;
        //         }
                
        //     }
        //     else if (i == freeSpaces.length){
        //         const rando = Math.floor(Math.random() * freeSpaces.length - 1);
        //         const x = freeSpaces[rando][0];
        //         const y = freeSpaces[rando][1];
        //         row[x].children[y].click();
        //         row[x].children[y].textContent = marker;
        //         break;
        //     }
        // };

        marker = players.player1.getSymb();
        gameGrid.classList.toggle('p1turn');
        winner();
    };
    const playerTurns =  () => {
        gameGrid.addEventListener('click', function(e){
            isWinner = false;
            if(scoreboard.style.display == ""){
                alert('Press "New Game" and enter names.');
                return false;
            }
            if((marker == players.player1.getSymb() && !noRoom(e))|| (gameGrid.classList.contains('p1turn') && !noRoom(e))){
                marker = players.player1.getSymb();
                turnChange(e);
                e.target.style.color = "#d77770";
                marker = players.player2.getSymb();
                winner();
                if(players.player2cpu == true && !gameGrid.classList.contains('p1turn')){
                    // cpuTurn();
                    setTimeout(cpuTurn, 1000);
                }
                
            }
            else if(marker == players.player2.getSymb() && !noRoom(e) && !players.player2cpu){
                turnChange(e);
                e.target.style.color = "#63595c";
                marker = players.player1.getSymb();
                winner();
            }
            else if(noRoom(e)) {
                alert('Occupied!');
            }
        });
    }; 
    const winReset = () => {
        counterO = 0;
        counterX = 0;
        Display.updateScore(players.player1.getScore(), players.player2.getScore());
        // resetFunct();
        marker = players.player1.getSymb();
        if(!gameGrid.classList.contains('p1turn')){
            gameGrid.classList.toggle('p1turn');
        }
        // isWinner = false;
    };
    const callWinner = () => {
        if(counterX == 3 ){
            // alert(players.player1.getName() + ' is a Wiener!');
            Display.announceWinner(players.player1.getName());
            players.player1.addPoint();
            isWinner = true;
            winReset();
            return;
        }
        else if(counterO == 3){
            // alert(players.player2.getName() + ' is a Wiener!');
            Display.announceWinner(players.player2.getName());
            players.player2.addPoint();
            isWinner = true;
            winReset();
            return;
        }
        else{
            counterO = 0;
            counterX = 0;
        }
    };
    const winner = () => {
        if(isWinner){return};
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
            callWinner();
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
            callWinner();
        }
        for(let i = 0; i < row.length; i++){
            if(row[i].children[i].textContent == players.player1.getSymb()){
                counterX ++;
            }
            if(row[i].children[i].textContent == players.player2.getSymb()){
                counterO ++;
            }
        }
        callWinner();
        
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
        callWinner();
        
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
            winReset();
        }
        
    };
    playerTurns();
    resetButton();
    return{ gameBoard, players, resetFunct }
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
        game.resetFunct();

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
                scoreboard.style.display = "flex";
                formp2mark = "";
                setPlayer(formp1, formp1mark, "George", cpumark);
                game.players.player2cpu = true;
                game.resetFunct();
                modal.style.display = "none";
            }
            else{
                scoreboard.style.display = "flex";
                setPlayer(formp1, formp1mark, formp2, formp2mark);
                game.resetFunct();
                modal.style.display = "none";
            }
        }
        
    });
    
})();