import { Cell } from "./cell";
import { Key } from "./key";

export class Board {

    static SIZE = 9;


    data: any[] = [];
    selectedCell?: Cell;
    
    

    constructor() {
    }


    setupAvailableKeys(p: Cell, keys: Key[]) {
        if (!p) return;
        
        //Reset all keys
        Key.resetAllKeys(keys);

        for (let i = 0; i < this.data.length; i++) {
            Key.disableKey(this.data[p.x][i], keys);
        }

        for (let i = 0; i < this.data.length; i++) {
            Key.disableKey(this.data[i][p.y], keys);
        }

        let groupNumber = Board.findBoardGroupNumber(p.x, p.y);
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data.length; j++) {
                if (this.data[i][j] != '' && groupNumber == Board.findBoardGroupNumber(i, j)) Key.disableKey(this.data[i][j], keys);
            }
        }
    }

    public static findBoardGroupNumber(row: number, col: number) {
        //Valid groups are 0, 1, 2 .... 8
        let groupNumber = -1;
        if (row >= 0 && row <= 2) {
            if (col >= 0 && col <= 2) return 0;
            else if (col >= 3 && col <= 5) return 1;
            else if (col >= 6 && col <= 8) return 2;
        } else if (row >= 3 && row <= 5) {
            if (col >= 0 && col <= 2) return 3;
            else if (col >= 3 && col <= 5) return 4;
            else if (col >= 6 && col <= 8) return 5;
        } else if (row >= 6 && row <= 8) {
            if (col >= 0 && col <= 2) return 6;
            else if (col >= 3 && col <= 5) return 7;
            else if (col >= 6 && col <= 8) return 8;
        }
        return groupNumber;
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


    //str: "[[\"7\",\"4\",\"5\",\"3\",\"6\",\"8\",\"9\",\"1\",\"2\"],[\"8\",\"1\",\"9\",\"5\",\"7\",\"2\",\"4\",\"6\",\"3\"],[\"3\",\"6\",\"2\",\"4\",\"9\",\"1\",\"8\",\"5\",\"7\"],[\"6\",\"9\",\"3\",\"8\",\"2\",\"4\",\"5\",\"7\",\"1\"],[\"4\",\"2\",\"1\",\"6\",\"5\",\"7\",\"3\",\"9\",\"8\"],[\"5\",\"8\",\"7\",\"1\",\"3\",\"9\",\"6\",\"2\",\"4\"],[\"1\",\"5\",\"8\",\"7\",\"4\",\"6\",\"2\",\"3\",\"9\"],[\"9\",\"7\",\"6\",\"2\",\"8\",\"3\",\"1\",\"4\",\"5\"],[\"2\",\"3\",\"4\",\"9\",\"1\",\"5\",\"7\",\"8\",\"6\"]]"
    public static create(str: string): Board {
        console.log("create Board: " + str);
        const b = new Board();
        str = str.replaceAll("\"", "");
        str = str.replaceAll("[", "");
        str = str.replaceAll("]", "");

        let arrayNumbers = str.split(",");
        let pos = 0;

        for (let i = 0; i < Board.SIZE; i++) {
            let s: any[] = [];
            for (let j = 0; j < Board.SIZE; j++) {
                let varNumStr: string = arrayNumbers[pos++];
                if (varNumStr == ".") s.push(new Cell(i, j));                
                else s.push(new Cell(i, j, varNumStr));
            }
            b.data.push(s);
        }


        return b;
    }
  

    public static createDummy(): Board {
        const b = new Board();

        //FIXME - Demo Board!!
        for (let i = 0; i < Board.SIZE; i++) {
            let s: any[] = [];
            for (let j = 0; j < Board.SIZE; j++) {
                let varNum = Math.floor(Math.random() * 9);
                if (j % 4 != 0) s.push(new Cell(i, j));
                else s.push(new Cell(i, j, (varNum + 1) + ""));
            }
            b.data.push(s);
        }

        return b;
    }



}
