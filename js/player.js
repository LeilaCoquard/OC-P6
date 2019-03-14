export default class Player {
    constructor(id, name, weapon, image) {
        this._id = id;
        this._name = name;
        this._point = 100;
        this._weapon = weapon;
        this._initX = 0;
        this._initY = 0;
        this._x = 0;
        this._y = 0;
        this._image = image;
        this._defend = false;
    }

    //Getters
    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getPoint() {
        return this._point;
    }

    getWeapon() {
        return this._weapon;
    }

    getInitX() {
        return this._initX;
    }

    getInitY() {
        return this._initY;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    getImage() {
        return this._image;
    }

    getDefend() {
        return this._defend;
    }

    //Setters
    setId(newId) {
        this._id = newId;
    }

    setName(newName) {
        this._name = newName;
    }

    setPoint(newPoint) {
        if (newPoint < 0) {
            newPoint = 0;
        }
        this._point = newPoint;
    }

    setWeapon(newWeapon) {
        this._weapon = newWeapon;
    }

    setInitX(newInitX) {
        this._initX = newInitX;
    }

    setInitY(newInitY) {
        this._initY = newInitY;
    }

    setX(newX) {
        this._x = newX;
    }

    setY(newY) {
        this._y = newY;
    }

    setDefend(updateDefend) {
        this._defend = updateDefend;
    }

    touchPlayer(player) {
        if (((Math.abs(this._x - player.getX()) <= 1) && this._y - player.getY() == 0) || (this._x - player.getX() == 0 && (Math.abs(this._y - player.getY()) <= 1))) {
            return true;
        } else {
            return false;
        }
    }
}
