import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';




import { BoardComponent } from "../board/board.component";
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from "../keyboard/keyboard.component";
import { SudokuService } from '../sudoku.service';
import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { Key } from '../models/key';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent, CommonModule, KeyboardComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {




  board: Board;
  keys: Key[];

  constructor(private sudoku: SudokuService,
              private matDialog: MatDialog ) {
    this.board = this.sudoku.initGame();
    this.keys = sudoku.createOrGetKeys();
  }

  setupSelectedCell(c: Cell) {
    console.log("updateKeyboard: ", c);
    Key.resetAllKeys(this.keys, true);
    this.board.setupAvailableKeys(c, this.keys);
  }

  newGame() {
    this.board = this.sudoku.initGame();
    Key.resetAllKeys(this.keys, true);

  }

  openSettings() {
    let dialogOptions: any = {
      settings: this.sudoku.settings
    };
    
    // let dialogRef = this.matDialog.open(SettingsDialogComponent, { data: dialogOptions, disableClose: true, height: '60vh', width: '75vw' });
    // let dialogRef = this.matDialog.open(SettingsDialogComponent, { data: dialogOptions, disableClose: true, width: '600px', height: '600px' });
    let dialogRef = this.matDialog.open(SettingsDialogComponent, { data: dialogOptions, disableClose: true, height: '400px', width: '600px' });
    


    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("SettingsDialogComponent afterClosed(): ", result);
      if (result && result.success) this.sudoku.updateSettings(result.settings);

    });
  }


}
