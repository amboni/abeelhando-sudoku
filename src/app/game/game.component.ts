import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';




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
  imports: [BoardComponent, CommonModule, KeyboardComponent,MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],  
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

  setupSelectedCell(c: Cell) {
    console.log("updateKeyboard: ", c);    
    this.board.setupAvailableKeys(c, this.keys);    
  }


}
