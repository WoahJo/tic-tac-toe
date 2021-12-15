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
    let marker;
    let gameBoard = {
        field: [
            [one, two, three.textContent], 
            [four, five, six], 
            [seven, eight, nine]
        ],
        turnChange: function(e){
            e.target.textContent = marker;
            gameGrid.classList.toggle('p1turn');
        },
        playerTurns: function(){
            gameGrid.addEventListener('click', function(e){
                if(marker == "x" || gameGrid.classList.contains('p1turn')){
                    marker = "x";
                    gameBoard.turnChange(e);
                    marker = "o";
                }
                else if(marker == "o"){
                    gameBoard.turnChange(e);
                    marker = "x";
                }
            })
        }        
    };
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