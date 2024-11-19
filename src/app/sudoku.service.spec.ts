import { TestBed } from '@angular/core/testing';

import { SudokuService } from './sudoku.service';
import { Board } from './models/board';

describe('SudokuService', () => {
  let service: SudokuService;
  //let board: Board;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('init game', () => {
    let board = service.initGame();
    expect(board).toBeTruthy();
    expect(board.selectedCell).toBeFalsy;
  });


  it('search Solution', () => {
    let board = service.initGame();
    let s = service.seachSolution(board);    
    expect(s).toBeTruthy();
  });

  it('is valid Sudoku', () => {
    let board = service.initGame();
    let s = service.seachSolution(board);    
    expect(s).toBeTruthy();
    expect(s.isValid()).toBeTruthy();
  });

  it('Board Clone', () => {
    let board = service.initGame();    
    expect(board).toBeTruthy();
    let c = board.clone();
    expect(c).toBeTruthy();
    console.log("Cloned Cell: ", c.data[0][0]);
    c.isValid();
    c.data[0][0].isEmpty();

  });

});
