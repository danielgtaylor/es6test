'use strict';

const assert = require('assert');
const A = require('./a');

describe('Variables', () => {
  it('should use let', () => {
    let x = 1;
    assert(x);
  });

  it('should use const', () => {
    const x = 1;

    // In iojs this will actually be a runtime error. Using Babel it is not,
    // so we don't actually run this code.
    // assert.throws(() => {
    //   x = 2;
    // });

    assert.equal(x, 1);
  });
});

describe('Iteration', () => {
  it('should work with for...of', () => {
    let seen = '';

    for (let value of [1, 2, 3]) {
      seen += value;
    }

    assert.equal(seen, '123');
  });

  it('should support generators', () => {
    function *gen() {
      yield 1;
      yield 2;
      yield 3;
    }

    let seen = '';

    for (let value of gen()) {
      seen += value;
    }

    assert.equal(seen, '123');
  });
});

describe('String templates', () => {
  it('should interpolate values', () => {
    const name = 'world';
    assert.equal('Hello, world!', `Hello, ${name}!`);
  });
});

describe('Arrow functions', () => {
  it('should support explicit return', () => {
    const squares = [1, 2, 3].map(item => item * item);
    assert.deepEqual(squares, [1, 4, 9]);
  });

  // Another interesting one - `this` is not tracked properly yet. Babel handles
  // it correctly so we won't run this test.
  // it('should track `this` but does not yet', () => {
  //   const that = this;
  //
  //   const func = () => {
  //     assert.notEqual(that, this);
  //   };
  //
  //   func();
  // });
});

describe('Classes', () => {
  it('should instantiate a class by calling the constructor', () => {
    const instance = new A('test');
    assert.equal(instance.id, 'test');
  });

  it('should support subclasses', () => {
    class B extends A {}
    const instance = new B('test');
    assert.equal(instance.id, 'test');
  });

  it('should support constructor super', () => {
    class B extends A {
      constructor(id) {
        super(id);
        this.other = true;
      }
    }

    const instance = new B('test');
    assert.equal(instance.id, 'test');
    assert.equal(instance.other, true);
  });

  it('should support method super', () => {
    class B extends A {
      meth(value) {
        return super.meth(value) + 1;
      }
    }

    const instance = new B('test');
    assert.equal(instance.meth(1), 2);
  });
});
