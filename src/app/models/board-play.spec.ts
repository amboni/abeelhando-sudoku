import { BoardPlay } from './board-play';

describe('BoardPlay', () => {
  it('should create an instance', () => {
    expect(new BoardPlay(0, 0, 'R')).toBeTruthy();
  });
});
