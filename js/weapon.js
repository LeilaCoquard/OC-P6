export default class Weapon {
    constructor(id, type, power, image) {
        this._id = id;
        this._type = type;
        this._power = power;
        this._x = 0;
        this._y = 0;
        this._image = image;
    }

    getId() {
        return this._id;
    }

    getType() {
        return this._type;
    }

    getPower() {
        return this._power;
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

    setId(newId) {
        this._id = newId;
    }

    setType(newType) {
        this._type = newType;
    }

    setPower(newPower) {
        this._power = newPower;
    }

    setX(newX) {
        this._x = newX;
    }

    setY(newY) {
        this._y = newY;
    }

    setImage(newImage) {
        this._image = newImage;
    }
}
