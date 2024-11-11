import { Injectable } from '@angular/core';
import { Board } from './models/board';
import { Cell } from './models/cell';
import { Key } from './models/key';
import { BoardPlay } from './models/board-play';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  size = Board.SIZE;
  board = new Board();
  keys?: Key[];

  

  constructor() { }

  initGame(): Board {
    //this.board = Board.createDummy();  
    //let str = "[[\"7\",\"4\",\"5\",\"3\",\"6\",\"8\",\"9\",\"1\",\"2\"],[\"8\",\"1\",\"9\",\"5\",\"7\",\"2\",\"4\",\"6\",\"3\"],[\"3\",\"6\",\"2\",\"4\",\"9\",\"1\",\"8\",\"5\",\"7\"],[\"6\",\"9\",\"3\",\"8\",\"2\",\"4\",\"5\",\"7\",\"1\"],[\"4\",\"2\",\"1\",\"6\",\"5\",\"7\",\"3\",\"9\",\"8\"],[\"5\",\"8\",\"7\",\"1\",\"3\",\"9\",\"6\",\"2\",\"4\"],[\"1\",\"5\",\"8\",\"7\",\"4\",\"6\",\"2\",\"3\",\"9\"],[\"9\",\"7\",\"6\",\"2\",\"8\",\"3\",\"1\",\"4\",\"5\"],[\"2\",\"3\",\"4\",\"9\",\"1\",\"5\",\"7\",\"8\",\"6\"]]";
    let str = "[[\"7\",\".\",\"5\",\"3\",\"6\",\"8\",\"9\",\"1\",\"2\"],[\"8\",\"1\",\"9\",\"5\",\"7\",\"2\",\"4\",\"6\",\"3\"],[\"3\",\"6\",\"2\",\"4\",\"9\",\"1\",\"8\",\"5\",\"7\"],[\"6\",\"9\",\"3\",\"8\",\"2\",\"4\",\"5\",\"7\",\"1\"],[\"4\",\"2\",\"1\",\"6\",\"5\",\"7\",\"3\",\"9\",\"8\"],[\"5\",\"8\",\"7\",\"1\",\"3\",\"9\",\"6\",\"2\",\"4\"],[\"1\",\"5\",\"8\",\"7\",\"4\",\"6\",\"2\",\"3\",\"9\"],[\"9\",\"7\",\"6\",\"2\",\"8\",\"3\",\"1\",\"4\",\"5\"],[\"2\",\"3\",\"4\",\"9\",\"1\",\"5\",\"7\",\"8\",\"6\"]]";
    //let str = "[[\".\",\".\",\"5\",\".\",\"6\",\".\",\".\",\".\",\"2\"],[\".\",\"1\",\".\",\".\",\"7\",\".\",\"4\",\"6\",\".\"],[\".\",\".\",\"2\",\".\",\"9\",\"1\",\".\",\"5\",\".\"],[\".\",\"9\",\".\",\".\",\".\",\"4\",\"5\",\".\",\"1\"],[\"4\",\".\",\"1\",\".\",\".\",\".\",\"3\",\".\",\".\"],[\".\",\".\",\"7\",\".\",\"3\",\"9\",\".\",\".\",\"4\"],[\".\",\".\",\".\",\"7\",\".\",\".\",\"2\",\"3\",\".\"],[\".\",\"7\",\".\",\"2\",\".\",\".\",\".\",\"4\",\".\"],[\"2\",\".\",\"4\",\".\",\".\",\".\",\".\",\"8\",\".\"]]";

    

    this.board = Board.create(str);  
    return this.board;
  }

  //Example backtracking algorithm
	public seachSolution(grid: Board): Board {
    console.log("seachSolution ....");
		if (grid.isCompleted()) return grid; // success!

		let p:BoardPlay = grid.findBestMove();

    return grid;

    //FIXME!!!
		// List<Character> list = grid.findOptionsToPlay(p);

		// for (Character c : list) {
		// 	if (grid.isValid()) { // if looks promising,
		// 		p.optionToPlay = c;
		// 		grid.play(p); // Try this number
		// 		if (seachSolution(grid)) return true; //It worked!! : )
		// 		grid.resetMove(p); //rollback 
		// 	}
		// }

		// return false; //It will cause backtracking!
	}
	


  updateCell(key: Key) {    
    this.board.updateCell(key);
    this.board.setupAvailableKeys(this.board.selectedCell!, this.keys!);        
    //key.disabled = true;
  }

  // clearSelectedCell() {
  //   //this.board.clear();
  //   if (!cell.generated) 
    
  // }


  createOrGetKeys(): Key[] {
    if (this.keys) return this.keys;

    this.keys = [];
    for (let i = 1; i <= this.size; i++) {
      this.keys.push({ value: i + "", disabled: true });
    }

    return this.keys;
  }



}
