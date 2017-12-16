import {
  assert,
} from 'chai';
import {
  echo,
  clientStubIntermediary,
} from './tasks';
describe('hello', () => {
  it('should hello', async (done) => {
    assert.ok(true);
    const worker = new Worker('./base/test/worker.ts');
    clientStubIntermediary.setWorker(worker);

    const echoBack = await echo({
      toEcho: 'hello',
      __BaseArgsType: null,
    });
    assert.equal(echoBack.echoed, 'hello');
    done();
  });
})