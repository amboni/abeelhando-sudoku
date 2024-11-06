import { Injectable } from '@angular/core';
import { Board } from './models/board';
import { Cell } from './models/cell';
import { Key } from './models/key';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  size = 9;
  board = new Board();
  keys?: Key[];

  constructor() { }

  initGame(): Board {
    const b = new Board();
    for (let i = 0; i < this.size; i++) {
      let s: any[] = [];
      for (let j = 0; j < this.size; j++) {
        if (j % 4 != 0) s.push( new Cell(i, j) );
        else s.push(new Cell(i, j, (j + 1) + ""));
      }
      b.data.push(s);
    }
    this.board = b;
    return b;
  }

  updateCell(key: Key) {
    if (this.board.selectedCell) this.board.selectedCell.value = key.value
  }

  createOrGetKeys(): Key[] {
    if (this.keys) return this.keys;

    this.keys = [];
    for (let i = 1; i <= this.size; i++) {
      this.keys.push({ value: i + "", disabled: false });
    }

    return this.keys;
  }



}
