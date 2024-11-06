import { Component } from '@angular/core';
import { BoardComponent } from "../board/board.component";
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from "../keyboard/keyboard.component";
import { SudokuService } from '../sudoku.service';
import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { Key } from '../models/key';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent, CommonModule, KeyboardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  board: Board;
  keys: Key[];

  constructor(private sudoku: SudokuService) {
    this.board = this.sudoku.initGame();
    this.keys = sudoku.createOrGetKeys();    
  }

  updateKeyboard(c: Cell) {
    console.log("updateKeyboard: ", c);
    this.board.setupAvailableKeys(c, this.keys);
  }


}
