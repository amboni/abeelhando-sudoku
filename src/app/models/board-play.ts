import { Cell } from "./cell";
import { Key } from "./key";

export class BoardPlay {

    x: number;
    y: number;
    optionToPlay: string = "";
    
    // Types: R, C or G (row, column or group)
    type: string;
    

    constructor(x:number, y:number, type:string) {
        this.x = x;
        this.y = y;        
        this.type = type;
    }

}

