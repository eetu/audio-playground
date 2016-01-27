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
  });

  it('', () => {
    const startTime = 0;
    const currentTime = 1;
    const targetTime = 5;
    const startValue = 0;
    const targetValue = 100;
    helper.getValueAtTime(startTime, 0, targetTime, startValue, targetValue)
      .should.equal(0);
    helper.getValueAtTime(startTime, currentTime, targetTime, startValue, targetValue)
      .should.equal(20);
    helper.getValueAtTime(startTime, 0.1, targetTime, startValue, targetValue)
      .should.equal(2);
    helper.getValueAtTime(startTime, 5, targetTime, startValue, targetValue)
      .should.equal(100);
    helper.getValueAtTime(startTime, 10, targetTime, startValue, targetValue)
      .should.equal(100);

    helper.getValueAtTime(3743.201814058957, 3743.3004988662133, 3744.201814058957, 146.83238220214844, 261.6255653005986)
      .should.equal(158.16072535054204);
  });
});
