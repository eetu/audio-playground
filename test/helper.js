import chai from 'chai';
import * as helper from '../src/lib/helper.js';

chai.should();

describe('helpers', () => {
  it('note should be mapped to frequency', () => {
    helper.frequency('C5').should.equal(523.2511306011974);
    helper.frequency('C1').should.equal(32.703195662574814);
    helper.frequency('B9').should.equal(15804.265640195985);
  });

  it('index should give proper note', () => {
    helper.getNote(0,5).should.equal('C5');
    helper.getNote(-1,5).should.equal('B4');
    helper.getNote(12,5).should.equal('C6');
    helper.getNote(24,5).should.equal('C7');
  });

  it('keycode should map to correct note', () => {
    helper.mapKeyToNote(65, 5).should.equal('C5');
    helper.mapKeyToNote(75, 5).should.equal('C6');
  })
});
