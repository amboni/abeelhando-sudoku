import { Cell } from "./cell";
import { Key } from "./key";

export class Board {

    // size = 9;
    data: any[] = [];
    selectedCell?: Cell;

    constructor() {
        // for (let i = 0; i < this.size; i++) {
        //     let s: any[] = [];
        //     for (let j = 0; j < this.size; j++) {
        //         // s.push( new Cell() );
        //         s.push( new Cell((j + 1) + "") );
        //     }
        //     this.data.push(s);            
        // }
    }


    setupAvailableKeys(c: Cell, keys: Key[]) {
        //FIXME        
        for (let k of keys) {
            if (parseInt(k.value) % 4 == 0) k.disabled = true;            
        }        
    }


    selectCell(x: number, y: number) {
        console.log("selectCell x: " + x + " - y: " + y);
        let cell = this.data[x][y];
        if (!cell.generated) {
            //   this.resetSelected(); //No need to this!
            if (this.selectedCell) this.selectedCell.selected = false;
            cell.selected = true;
            this.selectedCell = cell;
        }
        return this.selectedCell;
    }


    resetSelected() {
        const resetSelectedFn = (cell: any) => cell.selected = false;
        this.transverseData(resetSelectedFn);
    }


    transverseData(dataFn: any) {
        for (let i = 0; i < this.data.length; i++) {
            const section = this.data[i];
            for (let j = 0; j < section.length; j++) {
                const cell = section[j];
                dataFn(cell, i, j);
            }
        }
    }




}
