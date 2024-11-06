export class Cell {

    x = -1;
    y = -1;
    value = "";
    generated = false;
    selected = false;


    constructor(x: number, y: number, v: string = "") {
        this.value = v;
        if (v) this.generated = true;
    }


}
