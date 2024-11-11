import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../models/board';
import { NgClass } from '@angular/common';
import { Cell } from '../models/cell';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgClass],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  // board = new Board();
  @Input() board:Board = new Board();
  @Output() onCellSelected = new EventEmitter<Cell>()

  selectCell(x: number, y: number) {    
    this.board.clear();
    let cell = this.board.selectCell(x, y);
    this.onCellSelected.emit(cell);
  }

}
