import { Board } from './board';

describe('Board', () => {

  it('should create an instance', () => {
    expect(new Board()).toBeTruthy();
  });

  it('Remove Random', () => {
    let str = "[[\"7\",\"4\",\"5\",\"3\",\"6\",\"8\",\"9\",\"1\",\"2\"],[\"8\",\"1\",\"9\",\"5\",\"7\",\"2\",\"4\",\"6\",\"3\"],[\"3\",\"6\",\"2\",\"4\",\"9\",\"1\",\"8\",\"5\",\"7\"],[\"6\",\"9\",\"3\",\"8\",\"2\",\"4\",\"5\",\"7\",\"1\"],[\"4\",\"2\",\"1\",\"6\",\"5\",\"7\",\"3\",\"9\",\"8\"],[\"5\",\"8\",\"7\",\"1\",\"3\",\"9\",\"6\",\"2\",\"4\"],[\"1\",\"5\",\"8\",\"7\",\"4\",\"6\",\"2\",\"3\",\"9\"],[\"9\",\"7\",\"6\",\"2\",\"8\",\"3\",\"1\",\"4\",\"5\"],[\"2\",\"3\",\"4\",\"9\",\"1\",\"5\",\"7\",\"8\",\"6\"]]";
    let b = Board.create(str);
    expect(b).toBeTruthy();
    b.removeRandomFromCompletedBoard(20);
    console.log("After removing 20 cells: ", b);
  });  


});
