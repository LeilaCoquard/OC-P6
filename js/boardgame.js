import Box from './box.js';

export default class BoardGame {
    constructor(player1, player2, weapons, nbWall) {
        this._table = Array.from({
            length: 10
        }, () => (Array(10).fill(undefined)));
        this._player1 = player1;
        this._player2 = player2;
        this._playerPlay = null;
        this._weapons = weapons;
        this._nbWall = nbWall;
    }

    getTable() {
        return this._table;
    }

    getPlayer1() {
        return this._player1;
    }

    getPlayer2() {
        return this._player2;
    }

    getPlayerPlay() {
        return this._playerPlay;
    }

    getWeapons() {
        return this._weapons;
    }

    getNbWall() {
        return this._nbWall;
    }

    setTable(newTable) {
        this._table = newTable;
    }

    setPlayer1(newPlayer1) {
        this._player1 = newPlayer1;
    }

    setPlayer2(newPlayer2) {
        this._player2 = newPlayer2;
    }

    setPlayerPlay(newPlayerPlay) {
        this._playerPlay = newPlayerPlay;
    }

    setWeapons(newWeapons) {
        this._weapons = newWeapons;
    }

    setNbWall(newNbWall) {
        this._nbWall = newNbWall;
    }

    //Function that returns random coordinates
    coordinatesRandom() {
        const coordinates = {};
        coordinates.x = Math.floor(Math.random() * 9);
        coordinates.y = Math.floor(Math.random() * 9);
        return coordinates;
    }

    //If the box is available
    availableBox(box) {
        if (box.getType() == "wall") {
            return false;
        } else if (box.getWeapon() !== null) {
            return false;
        } else {
            return true;
        }
    }

    //Initialization of the boardgame
    initBoardGame() {
        //Create boxes
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this._table[i][j] = new Box("available");
            }
        }

        //Create walls
        for (let i = 0; i < this._nbWall; i++) {
            let newWall = {};
            do {
                newWall = this.coordinatesRandom();
            } while (!this.availableBox(this._table[newWall.y][newWall.x]));
            this._table[newWall.x][newWall.y].setType("wall");
        }
    }

    //Display the boardgame in HTML
    displayBoardGame() {
        for (let i = 0; i < this._table.length; i++) {
            for (let j = 0; j < this._table[i].length; j++) {
                //create div
                this._table[i][j].setId('c' + j + 'r' + i);
                $("#board").append(`<div id="` + this._table[i][j].getId() + `" class="` + this._table[i][j].getType() + `"></div>`);
            }
        }
    }

    //Add or remove class "CanMove" to move the player
    classCanMove(boolean, player, newX, newY) {
        if (boolean) {
            $('#c' + newX + 'r' + newY).addClass(player.getId() + "CanMove");
        } else {
            $('#c' + newX + 'r' + newY).removeClass(player.getId() + "CanMove");
        }
    }

    //Indicate in which boxes the player can move
    selectBoxToMove(player, boolean) {
        let i = 0;
        let coordXY = {};

        if (boolean) {
            coordXY.x = player.getX();
            coordXY.y = player.getY();
        } else {
            coordXY.x = player.getInitX();
            coordXY.y = player.getInitY();
        }

        while (i <= 3 && (coordXY.x - i) >= 0 && (coordXY.x - i) < 10 && this._table[coordXY.y][coordXY.x - i].getType() !== "wall") {
            this.classCanMove(boolean, player, coordXY.x - i, coordXY.y);
            i++;
        }
        i = 0;
        while (i <= 3 && (coordXY.y - i) >= 0 && (coordXY.y - i) < 10 && this._table[coordXY.y - i][coordXY.x].getType() !== "wall") {
            this.classCanMove(boolean, player, coordXY.x, coordXY.y - i);
            i++;
        }
        i = 0;
        while (i <= 3 && (coordXY.x + i) >= 0 && (coordXY.x + i) < 10 && this._table[coordXY.y][coordXY.x + i].getType() !== "wall") {
            this.classCanMove(boolean, player, coordXY.x + i, coordXY.y);
            i++;
        }
        i = 0;
        while (i <= 3 && (coordXY.y + i) >= 0 && (coordXY.y + i) < 10 && this._table[coordXY.y + i][coordXY.x].getType() !== "wall") {
            this.classCanMove(boolean, player, coordXY.x, coordXY.y + i);
            i++;
        }
    }

    //Initialization players and weapons
    initPlayersWeapons() {
        let newCoordinates = {};

        //Install weapons
        for (let weapon of this._weapons) {
            do {
                newCoordinates = this.coordinatesRandom();
                weapon.setX(newCoordinates.x);
                weapon.setY(newCoordinates.y);
            } while (!this.availableBox(this._table[newCoordinates.y][newCoordinates.x]));
            this._table[newCoordinates.y][newCoordinates.x].setWeapon(weapon);
        }

        //Install players randomly
        do {
            newCoordinates = this.coordinatesRandom();
            this._player1.setX(newCoordinates.x);
            this._player1.setY(newCoordinates.y);
        } while (!this.availableBox(this._table[newCoordinates.y][newCoordinates.x]));

        do {
            newCoordinates = this.coordinatesRandom();
            this._player2.setX(newCoordinates.x);
            this._player2.setY(newCoordinates.y);
        } while (!this.availableBox(this._table[newCoordinates.y][newCoordinates.x]) || this._player2.touchPlayer(this._player1));

        //Indicate where players can move
        this.selectBoxToMove(this._player1, true);
        this.selectBoxToMove(this._player2, true);
    }

    //Display Players and Weapons in HTML
    displayPlayersWeapons() {
        let table = [this._player1, this._player2];
        for (let weapon of this._weapons) {
            table.push(weapon);
        }
        for (let element of table) {
            let index = '#c' + element.getX() + 'r' + element.getY();
            $(index).append('<img src="./images/' + element.getImage() + '" id="' + element.getId() + '" />');
        }
    }

    //Display boxes where the player can move
    displayBoxToMove(player, boolean) {
        let boxToMove = "." + player._id + "CanMove";
        if (boolean) {
            $(boxToMove).css("backgroundColor", "darkseagreen");
        } else {
            $(boxToMove).css("backgroundColor", "linen");
        }
    }

    //To move player
    playerMove(player, key) {
        //initialization
        let playerX = player.getX();
        let playerY = player.getY();
        //check if the new coordinates are on the boardgame
        if (playerX + key.x >= 0 && playerX + key.x < 10 && playerY + key.y >= 0 && playerY + key.y < 10) {

            if ($('#c' + (playerX + key.x) + 'r' + (playerY + key.y)).hasClass(player.getId() + 'CanMove') && !($('#c' + (playerX + key.x) + 'r' + (playerY + key.y)).children().is("#" + this.otherPlayer(player).getId()))) {
                $('#' + player.getId()).remove();
                $('#c' + (playerX + key.x) + 'r' + (playerY + key.y)).prepend('<img src="./images/' + player.getImage() + '" id="' + player.getId() + '" />');

                player.setX(playerX + key.x);
                player.setY(playerY + key.y);
            }
        }
    }

    //To determine which player starts
    randomPlayerStart() {
        let choiceRandom = Math.floor(Math.random() * 2);
        if (choiceRandom === 0) {
            this._playerPlay = this._player1;
        } else {
            this._playerPlay = this._player2;
        }
    }

    //game turn
    gameTurn(player) {

        player.setInitX(player.getX());
        player.setInitY(player.getY());

        this.displayBoxToMove(this.otherPlayer(player), false);
        this.displayBoxToMove(player, true);
    }

    otherPlayer(player) {
        if (player.getId() === 'player1') {
            return this._player2;
        } else {
            return this._player1;
        }
    }

    //To change weapons
    changeWeapon(player, weaponOut, weaponIn) {
        player.setWeapon(weaponOut);
        $('#' + weaponOut.getId()).replaceWith('<img src="./images/' + weaponIn.getImage() + '" id="' + weaponIn.getId() + '" />');
        weaponIn.setX(weaponOut.getX());
        weaponIn.setY(weaponOut.getY());
        this._table[weaponOut.getY()][weaponOut.getX()].setWeapon(weaponIn);
    }

    //To display the boxes where there is the fight
    displayFight() {
        //Delete boxes where players can move
        this.displayBoxToMove(this._player1, false);
        this.displayBoxToMove(this._player2, false);
        //Display the 2 boxes where are the players
        $("#c" + this._player1.getX() + "r" + this._player1.getY()).css("backgroundColor", "#960018");
        $("#c" + this._player2.getX() + "r" + this._player2.getY()).css("backgroundColor", "#960018");
    }

    //PlayerA attack playerB
    attack(playerA, playerB) {
        if (playerB.getDefend()) {
            playerB.setPoint(playerB.getPoint() - 0.5 * playerA.getWeapon().getPower());
            playerB.setDefend(false);
        } else {
            playerB.setPoint(playerB.getPoint() - playerA.getWeapon().getPower());
        }
        $("#" + playerB.getId() + "pointdash").children().replaceWith("<span>" + playerB.getPoint() + "points</span>");
    }

    //PlayerA defend
    defend(playerA, playerB) {
        playerA.setDefend(true);
    }

}
