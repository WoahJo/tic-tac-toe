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
    let counterX = 0;
    let counterO = 0; 

    let gameBoard = {
        field: [
            [one, two, three], 
            [four, five, six], 
            [seven, eight, nine]
        ],
        reset: function(){
            resetGame.addEventListener('click', function(){
                if(!gameGrid.classList.contains('p1turn')){
                    gameGrid.classList.toggle('p1turn');
                }
                const blocks = gameGrid.children;
                for(let i = 0; i < blocks.length; i++){
                    for(let j = 0; j < blocks[i].children.length; j++){
                        blocks[i].children[j].textContent = "";
                    }
                }                
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
                if((marker == "x" && !gameBoard.noRoom(e))|| (gameGrid.classList.contains('p1turn') && !gameBoard.noRoom(e))){
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
                if(counterX == 3 || counterO == 3){
                    alert('Wiener');
                    counterO = 0;
                    counterX = 0;
                }
                else{
                    counterO = 0;
                    counterX = 0;
                }
            }
        }
    };
    gameBoard.reset();
    gameBoard.winner();
    gameBoard.playerTurns();
    return { gameBoard }
})();

const createPlayer = (playerName, playerSymbol) => {
    const info = {};
    info.playerName = playerName;
    info.symbol = playerSymbol;

    return{info}
};

const playerStore = (function(){
    const submit = document.querySelector('.subForm');
    const setPlayer = () => {
        const pName = document.querySelector('.inputName').value;
        const pSymb = document.querySelector('.playerSymb').value;
        const player1 = createPlayer(pName, pSymb);
        const p1Name = player1.info["playerName"];
        const p1Symb = player1.info["symbol"];
        
        return {p1Name, p1Symb}
    };
    submit.addEventListener('click', setPlayer);
    return {setPlayer}
    
    
})();


const eventControl = (function(){
    const newGame = document.querySelector('.new');
    const modal = document.querySelector('.modal');
    newGame.addEventListener('click', function(){
        modal.style.display = "block";
    });

    const close = document.querySelector('.cancelForm');
    close.addEventListener('click', function(){
        modal.style.display = "none";
    });

})();