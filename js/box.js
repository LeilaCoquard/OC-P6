export default class Box {
    constructor(type) {
        this._type = type;
        this._id = null;
        this._weapon = null;
    }

    getType() {
        return this._type;
    }

    getId() {
        return this._id;
    }

    getWeapon() {
        return this._weapon;
    }

    setType(newType) {
        this._type = newType;
    }

    setId(newId) {
        this._id = newId;
    }

    setWeapon(newWeapon) {
        this._weapon = newWeapon;
    }
}
