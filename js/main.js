import Weapon from './weapon.js';
import Player from './player.js';
import Box from './box.js';
import BoardGame from './boardgame.js';
import Dashboard from './dashboard.js';

//Generate weapons
const weapon1 = new Weapon('weapon0', 'Basic', 10, 'baguette0.png');
const weapon2 = new Weapon('weapon1', 'Magician', 16, 'baguette1.png');
const weapon3 = new Weapon('weapon2', 'Star', 28, 'baguette2.png');
const weapon4 = new Weapon('weapon3', 'Wizard', 40, 'baguette3.png');

//Generate players
const player1 = new Player('player1', 'Harry', weapon1, 'HP.png');
const player2 = new Player('player2', 'Clochette', weapon1, 'fee-clochette.png');

//Generate boardgame
const boardGame = new BoardGame(player1, player2, [weapon2, weapon3, weapon4], 16);

//Generate dashboard
const dashboard = new Dashboard(player1, player2);

//True to stop the game moves
let stop = false;
//True if the game is over
let gameOver = false;

//Initialization of the game
boardGame.initBoardGame();
boardGame.displayBoardGame();

boardGame.initPlayersWeapons();
boardGame.displayPlayersWeapons();

dashboard.displayDashboardPlayer(player1);
dashboard.displayDashboardPlayer(player2);

//To start the game
$('.start').on('click', function () {
    $(this).remove();
    boardGame.randomPlayerStart();
    boardGame.gameTurn(boardGame.getPlayerPlay());
    dashboard.changeTurn(boardGame.getPlayerPlay());
    dashboard.instruction("start");
});

//Key events
$(document).keydown(function (e) {

    e.preventDefault();

    //key "Enter" to validate the move
    if (e.which === 13 && !stop) {
        let playerPlay = boardGame.getPlayerPlay();

        //To start the fight
        if (player1.touchPlayer(player2)) {
            stop = true;
            boardGame.displayFight();
            dashboard.instruction("fight");
        }
        if (!stop) {
            //Change weapons
            if (boardGame.getTable()[playerPlay.getY()][playerPlay.getX()].getWeapon() !== null) {
                boardGame.changeWeapon(playerPlay, boardGame.getTable()[playerPlay.getY()][playerPlay.getX()].getWeapon(), playerPlay.getWeapon());
            }

            dashboard.displayDashboardPlayer(playerPlay);
            boardGame.displayBoxToMove(playerPlay, false);
            boardGame.selectBoxToMove(playerPlay, false);
            boardGame.selectBoxToMove(playerPlay, true);
            boardGame.gameTurn(boardGame.otherPlayer(playerPlay));
            boardGame.setPlayerPlay(boardGame.otherPlayer(playerPlay));
            dashboard.changeTurn(boardGame.getPlayerPlay());
        }
    }
    //Players moves
    else if (!stop) {
        //Key up, down, left, right
        const arrow = {
            left: 37,
            up: 38,
            right: 39,
            down: 40
        };
        let playerPlay = boardGame.getPlayerPlay();
        let keyXY = {
            x: 0,
            y: 0
        };
        switch (e.which) {
            case arrow.left:
                keyXY.x = -1;
                break;
            case arrow.up:
                keyXY.y = -1;
                break;
            case arrow.right:
                keyXY.x = 1;
                break;
            case arrow.down:
                keyXY.y = 1;
                break;
        }
        boardGame.playerMove(playerPlay, keyXY);
    }
    //Players fight
    else if (!gameOver) {
        let playerPlay = boardGame.getPlayerPlay();
        let playerWait = boardGame.otherPlayer(playerPlay);

        //Key "A" as Attack
        if (e.which === 65) {
            boardGame.attack(playerPlay, playerWait);
            boardGame.setPlayerPlay(playerWait);
            dashboard.changeTurn(playerWait);
        }
        //Key "D" as Defend
        else if (e.which === 68) {
            boardGame.defend(playerPlay, playerWait);
            boardGame.setPlayerPlay(playerWait);
            dashboard.changeTurn(playerWait);
        }
    }
    //End of the game
    if ((player1.getPoint() === 0 || player2.getPoint() === 0) && !gameOver) {
        gameOver = true;
        boardGame.setPlayerPlay(boardGame.otherPlayer(boardGame.getPlayerPlay()));
        dashboard.instruction("gameover", boardGame.getPlayerPlay());
        $("#gameTurn").children().first().remove();
        $("#gameTurn").children().css("visibility", "visible");
    }
});


//Click to restart the game
$('.restart').on('click', function () {
    $(this).css("visibility", "hidden");

    stop = false;
    gameOver = false;

    player1.setWeapon(weapon1);
    player2.setWeapon(weapon1);
    player1.setPoint(100);
    player2.setPoint(100);

    $("#board").children().remove();

    boardGame.initBoardGame();
    boardGame.displayBoardGame();

    boardGame.initPlayersWeapons();
    boardGame.displayPlayersWeapons();

    dashboard.displayDashboardPlayer(player1);
    dashboard.displayDashboardPlayer(player2);

    $("#gameTurn").prepend('<p class="playerPlay"></p>');

    boardGame.randomPlayerStart();
    boardGame.gameTurn(boardGame.getPlayerPlay());
    dashboard.changeTurn(boardGame.getPlayerPlay());
    dashboard.instruction("start");
});

//Rules Explanation
$('.rules').on('click', function () {
    $("#rulesDetail").toggleClass("show");
});
