// Class for handling pointer events
class p5PointerEvents {

    constructor(p5Instance) {

        p5Instance.registerMethod('pre', this._updatePointer.bind(this));

        this._sketch = p5Instance;
        this.isDown = false;
        this.lastX = -1;
        this.lastY = -1;
        this._incomingX = -1;
        this._incomingY = -1;
        this._incomingEvent = null;
        this.currX = -1;
        this.currY = -1;
        // this._lastTime = Date.now();
        // this._currTime = this._lastTime;

        window.addEventListener('pointerdown', this._onPointerDown.bind(this));
        window.addEventListener('pointermove', this._onPointerMove.bind(this));
        window.addEventListener('pointerup', this._onPointerUp.bind(this));
    }

    _updatePointer() {
        // this._lastTime = this._currTime;
        // this._currTime = Date.now();

        if(this.isDown) {
            this.lastX = this.currX;
            this.lastY = this.currY;
            this.currX = this._incomingX;
            this.currY = this._incomingY;

            this._sketch.pointerMove(this._incomingEvent);
        }
    };

    _onPointerDown(e) {
        if(this._isValid(e)) {
            if(!this.isDown) {
                this.isDown = true;
                this.lastX = e.clientX;
                this.lastY = e.clientY;
                this.currX = e.clientX;
                this.currY = e.clientY;
                this._incomingX = e.clientX;
                this._incomingY = e.clientY;
                this._sketch.pointerDown(e);
            }
        }
    }

    _onPointerMove(e) {
        if(this._isValid(e) && this.isDown) {
            this._incomingX = e.clientX;
            this._incomingY = e.clientY;
            this._incomingEvent = e;
        }
    }

    _onPointerUp(e) {
        if(this._isValid(e)) {
            this.isDown = false;
            this._sketch.pointerUp(e);
        }
    }

    _isValid(e) {
        return ((e.pointerType === "pen" && e.pressure > 0) || (e.pointerType === "pen" && e.type === "pointerup"))
    }
}

// Create new sketch methods
(function() {
    p5.prototype.pointerDown = function(event) {};
    p5.prototype.pointerMove = function(event) {};
    p5.prototype.pointerUp = function(event) {};
}());