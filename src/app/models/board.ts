import { BoardPlay } from "./board-play";
import { Cell } from "./cell";
import { Key } from "./key";

export class Board {


    static SIZE = 9;


    data: any[] = [];
    selectedCell?: Cell;

    settings = {
        highlightNumbers: true
    };


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


    selectCell(x: number, y: number) {
        console.log("selectCell x: " + x + " - y: " + y);
        let cell: Cell = this.data[x][y];
        if (this.selectedCell) this.selectedCell.selected = false;
        if (!cell.generated) {
            cell.selected = true;
            this.selectedCell = cell;
        } else {
            this.selectedCell = undefined;
        }
        if (this.settings.highlightNumbers) this.highlightSameNumbers(cell.value);
        return this.selectedCell;
    }

    updateCell(key: Key) {
        if (this.selectedCell) {
            this.selectedCell.value = key.value;
            if (this.settings.highlightNumbers) this.highlightSameNumbers(key.value);
        }

    }

    isValidSelectedCellGuess(): boolean {
        if (!this.selectedCell) return false;

        // return (this.selectedCell.value != "") && (!this.selectedCell.generated);
        return (!this.selectedCell.isEmpty()) && (!this.selectedCell.generated);
        
    }

    isCompleted() {
        for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length; j++) {
				let c:Cell = this.data[i][j];
				if (c.isEmpty()) return false;
			}
		}
		return true;
    }


    clear() {
        this.resetSelected();
    }



    highlightSameNumbers(value: string) {
        // if (!value) return;

        const varFn = (cell: Cell) => cell.highlight = false;
        this.transverseData(varFn); //First Remove any previous highlight

        //const numberValue = value;
        if (value) { //Only highlight if there is a valid number
            const varFn2 = (cell: Cell) => { if (value == cell.value) cell.highlight = true; };
            this.transverseData(varFn2);
        }


    }


    removeRandom(numToRemove: number) {
        let totalCompletedCells = this.findNumCompletedCells();
        if (totalCompletedCells < numToRemove  + 19) throw new Error("Cannot remove " + numToRemove + " because there are not enough completed cells: " + totalCompletedCells);

        for (let i = 0; i < numToRemove; i++) {
            let x = -1;
            let y = -1;
            do {
                x = Math.floor(Math.random() * 9);
                y = Math.floor(Math.random() * 9);                

            } while(this.data[x][y].isEmpty());

            this.data[x][y].reset();            
        }
        
        
    }

    findNumEmptyCells(): number {
        const counter = { total: 0 };
        const resetSelectedFn = (cell: any) => { if (cell.isEmpty()) counter.total++; };
        this.transverseData(resetSelectedFn);
        return counter.total;
    }


    findNumCompletedCells(): number {
        const counter = { total: 0 };
        const resetSelectedFn = (cell: any) => { if (!cell.isEmpty()) counter.total++; };
        this.transverseData(resetSelectedFn);
        return counter.total;
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
                dataFn(cell, i, j, this.data);
            }
        }
    }


	
	public play(p: BoardPlay) {
		this.data[p.x][p.y].value = p.optionToPlay;		
	}
	
	public resetMove(p: BoardPlay) {
		this.data[p.x][p.y].reset();		
	}


	public isValid(): boolean {
		if (!this.areAllColsValid()) return false;
		if (!this.areAllRowsValid()) return false;
		if (!this.areAllGroupsValid()) return false;

		return true;
	}



	areAllRowsValid(): boolean {
		let keys: Key[] = [];
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length; j++) {
				let c: Cell = this.data[i][j];
				if (!c.isEmpty) {
					if (Key.contains(c, keys)) {
						console.log("Invalid row x: " + i + " - y: " + j + " - value: " + c);
						return false;
						
					} else {                        
                        keys.push( { value: c.value, disabled: false } );
                    }
				}
			}
			keys = [];
		}
		return true;
	}

	areAllColsValid(): boolean {
		let keys: Key[] = [];
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length; j++) {
				let c: Cell = this.data[j][i];
				if (!c.isEmpty()) {
					if (Key.contains(c, keys)) {
						console.log("Invalid col x: " + j + " - y: " + i + " - value: " + c);
						return false;
					} else keys.push( { value: c.value, disabled: false } );
				}
			}
			keys = [];
		}
		return true;
	}

	areAllGroupsValid(): boolean {
		let groupRow = 0;
		let groupCol = 0;

		// Loop through 9 groups
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (!this.isGroupValid(groupRow, groupCol)) {
					console.log("Invalid group groupRow: " + groupRow + " - groupCol: " + groupCol);
					return false;
				}
				else groupCol += 3;
			}
			groupRow += 3;
			groupCol = 0;
		}

		return true;
	}

	isGroupValid(groupRow: number, groupCol: number): boolean {
		let keys: Key[] = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let c: Cell = this.data[groupRow + i][groupCol + j];
				if (!c.isEmpty()) {
					if (Key.contains(c, keys))
						return false;
					else keys.push( { value: c.value, disabled: false } );
				}
			}
		}
		return true;
	}





	public findOptionsToPlay(p: BoardPlay, keys: Key[]): Key[] {
		let options = [... keys];
		
		for (let i = 0; i < this.data.length; i++) {
            Key.removeKeyFromCell(this.data[p.x][i], options);
		}
		
		for (let i = 0; i < this.data.length; i++) {
            Key.removeKeyFromCell(this.data[i][p.y], options);
		}
		
		let groupNumber = Board.findBoardGroupNumber(p.x, p.y);
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data.length; j++) {
                let c: Cell = this.data[i][j];
				if (c.isEmpty() && groupNumber == Board.findBoardGroupNumber(i, j)) {
                    Key.removeKeyFromCell(c, options);
                }
			}				
		}
		
		
		return options;
	}


    findBestMove(): BoardPlay {
        let counterMap = this.countNumbersInBoard();
		
		//Find Row, Col or Group with more entries				
		let maxKey = null; //Example: R3 or C0 or G2
		for (let key in counterMap) {
			if (counterMap[key] >= Board.SIZE) continue;
			else if (maxKey == null) maxKey = key; 
			else if (counterMap[key] > counterMap[maxKey]) maxKey = key;
		}
		
		
		if (maxKey == null) maxKey = this.findRandomKey();
		let p = this.findEmptyPlaceToPlay(maxKey);
		return p;
    }

    private findRandomKey(): string {		
        let v = Math.floor(Math.random() * Board.SIZE);
		let key = "C" + v;
		return key;
	}


    public countNumbersInBoard() {
		let counterMap:any = {};
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length; j++) {
				let c: Cell = this.data[i][j];
				if (!c.isEmpty()) {					
					this.incrementCounter(counterMap, "R" + i);
					this.incrementCounter(counterMap, "C" + j);
					this.incrementCounter(counterMap, "G" + Board.findBoardGroupNumber(i, j));
				}
			}
		}
		return counterMap;
	}

	private incrementCounter(counterMap: any, key: string) {
		let counter = counterMap[key];
		if (!counter) counter = 0;
		counter++;
		counterMap[key] = counter;
	}

	findEmptyPlaceToPlay(key: string): BoardPlay {
		let placesToPlay: BoardPlay[] = [];
		
		let groupNumber = parseInt(key.substring(1));
		let groupName = key.substring(0, 1); //"R";
		
		switch (groupName) {
		case "R": {			
			for (let i = 0; i < this.data.length; i++) {
				if (this.data[groupNumber][i].isEmpty()) {
					let p = new BoardPlay(groupNumber, i, groupName);
					placesToPlay.push(p);
				}								
			}
			break;
		}
		case "C": {
			for (let i = 0; i < this.data.length; i++) {
				if (this.data[i][groupNumber].isEmpty()) {
					let p = new BoardPlay(i, groupNumber, groupName);
					placesToPlay.push(p);					
				}				
			}
			break;
		}
		case "G": {
			//Valid groups are 0, 1, 2 .... 8 - Need to find valid groups by x and y
			for (let i = 0; i < this.data.length; i++) {
				for (let j = 0; j < this.data[i].length; j++) {
					if (this.data[i][j].isEmpty()  && groupNumber == Board.findBoardGroupNumber(i, j)) {
						let p = new BoardPlay(i, j, groupName);
						placesToPlay.push(p);						
					}
					
				}				
			}
			break;
		}
		default:
			throw new Error("Unexpected value: " + groupName + " - " + this);
		}
		
		
		if (placesToPlay.length == 0) throw new Error("No empty places to play: " + this);
		
        let index = Math.floor(Math.random() * placesToPlay.length);
		return placesToPlay[index];
	
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


    clone(): Board {
        let b = JSON.parse( JSON.stringify(this) );
        let c: Board = Object.assign(new Board(), b);

        const assignCellFn = (cell: Cell, i:number, j: number, data: any[]) => data[i][j] = new Cell(cell.x, cell.y, cell.value);
        c.transverseData(assignCellFn);
        

        //IT does not do recursive Object.assign() !!
        //let c: Board = structuredClone(this);

        return c;
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
                if (varNumStr == ".") s.push(new Cell(i, j)); //The "." translates to empty value: ""
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
