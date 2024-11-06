import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SudokuService } from '../sudoku.service';
import { Key } from '../models/key';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {


  @Input() keys: Key[] = [];

  constructor(private sudoku: SudokuService) {
    // this.keys = sudoku.createOrGetKeys();    
  }


  applyKey(key: any) {
    this.sudoku.updateCell(key);
  }


}
