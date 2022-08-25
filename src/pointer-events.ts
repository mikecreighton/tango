import * as p5 from 'p5/index';

declare module 'p5/index' {
    interface p5InstanceExtensions {
        registerPreloadMethod(fnString: string, obj: any): void;
        registerMethod(name: string, m: (...args: any[]) => void): void;
        pointerDown?(event?: PointerEvent): void;
        pointerMove?(event?: PointerEvent): void;
        pointerUp?(event?: PointerEvent): void;
        
    }
}

// Class for handling pointer events
export default class P5PointerEvents {

    isDown: boolean;
    lastX: number;
    lastY: number;
    currX: number;
    currY: number;
    _incomingX: number;
    _incomingY: number;
    _incomingEvent: any;
    _sketch: p5;

    constructor(p5Instance: p5, renderer: p5.Renderer) {
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

        const canvas = document.getElementById(renderer.id());
        if(canvas !== null) {
            canvas.addEventListener('pointerdown', this._onPointerDown.bind(this));
            canvas.addEventListener('pointermove', this._onPointerMove.bind(this));
            canvas.addEventListener('pointerup', this._onPointerUp.bind(this));
        } else {
            console.error("No valid canvas was found for attaching pointer events.");
        }
    }

    _updatePointer() {
        // this._lastTime = this._currTime;
        // this._currTime = Date.now();

        if(this.isDown) {
            this.lastX = this.currX;
            this.lastY = this.currY;
            this.currX = this._incomingX;
            this.currY = this._incomingY;

            if(this._incomingEvent !== null) {
                this._sketch.pointerMove?.(this._incomingEvent);
            }
        }
    };

    _onPointerDown(e: PointerEvent) {
        if(this._isValid(e)) {
            if(!this.isDown) {
                this.isDown = true;
                this.lastX = e.clientX;
                this.lastY = e.clientY;
                this.currX = e.clientX;
                this.currY = e.clientY;
                this._incomingX = e.clientX;
                this._incomingY = e.clientY;
                this._sketch.pointerDown?.(e);
            }
        }
    }

    _onPointerMove(e: PointerEvent) {
        if(this._isValid(e) && this.isDown) {
            this._incomingX = e.clientX;
            this._incomingY = e.clientY;
            this._incomingEvent = e;
        }
    }

    _onPointerUp(e: PointerEvent) {
        if(this._isValid(e)) {
            this.isDown = false;
            this._sketch.pointerUp?.(e);
        }
    }

    _isValid(e: PointerEvent) {
        return ((e.pointerType === "pen" && e.pressure > 0) || (e.pointerType === "pen" && e.type === "pointerup"))
    }
}