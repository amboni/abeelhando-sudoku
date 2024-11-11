export class Cell {

    x = -1;
    y = -1;
    value = "";
    generated = false;
    selected = false;
    highlight = false;


    constructor(x: number, y: number, v: string = "") {
        this.x = x;
        this.y = y;
        this.value = v;
        if (v) this.generated = true;
    }

    isEmpty():boolean {
        return this.value == "";
    }



}
