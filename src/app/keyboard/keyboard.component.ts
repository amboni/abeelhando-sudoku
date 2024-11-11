import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SudokuService } from '../sudoku.service';
import { Key } from '../models/key';
import { Board } from '../models/board';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {


  @Input() board:Board = new Board();
  @Input() keys: Key[] = [];


  constructor(private sudoku: SudokuService) {
    // this.keys = sudoku.createOrGetKeys();    
  }


  applyKey(key: any) {
    this.sudoku.updateCell(key);    
  }

  clear() {
    //this.sudoku.clearSelectedCell()
    this.sudoku.updateCell(new Key());    
  }

  // isSelected() {
  //   return this.board.selectedCell;
  // }

  get clearDisabled(): boolean {
    let ret = this.board.isValidSelectedCellGuess();
    // if (this.board.selectedCell && this.board.selectedCell.value) ret = false;
    // .generated
    return !ret;

  }
  


}
