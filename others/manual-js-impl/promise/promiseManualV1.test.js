import { PromiseLike } from './promiseManualV1'

/*--							--*/
/*--	运行测试用例	--*/
/*--							--*/

// Helper function to wait for asynchronous operations
function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test suite
async function runTests() {
  // Test constructor
  {
    const promise = new PromiseLike();
    console.assert(promise[statusProp] === PromisePending, 'Constructor should initialize with pending status');
    console.assert(promise[pendingQueueProp].length === 0, 'Constructor should initialize with empty queue');
  }

  // Test resolve and then handler
  {
    let result = null;
    const promise = new PromiseLike((resolve) => {
      setTimeout(() => resolve('resolved'), 10);
    });

    promise.then((data) => {
      result = data;
    });

    await waitFor(20);
    console.log('result', {
      result
    });
    console.assert(result === 'resolved', 'Then handler should be called with resolved value');
  }

  return

  // Test reject and catch handler
  {
    let result = null;
    const promise = new PromiseLike((resolve, reject) => {
      setTimeout(() => reject('rejected'), 10);
    });

    promise.catch((reason) => {
      result = reason;
    });

    await waitFor(20);
    console.assert(result === 'rejected', 'Catch handler should be called with rejected reason');
  }

  // Test finally handler regardless of resolution
  {
    let finallyCalled = false;
    const promise = new PromiseLike((resolve) => {
      setTimeout(() => resolve('resolved'), 10);
    });

    promise.finally(() => {
      finallyCalled = true;
    });

    await waitFor(20);
    console.assert(finallyCalled, 'Finally handler should be called');
  }

  // Test chaining correctly
  {
    let result = null;
    const promise = new PromiseLike((resolve) => {
      setTimeout(() => resolve('resolved'), 10);
    });

    promise
      .then((data) => {
        return data + ' chained';
      })
      .then((data) => {
        result = data;
      });

    await waitFor(20);
    console.assert(result === 'resolved chained', 'Chaining should work correctly');
  }

  // Test errors in then handler
  {
    let errorCaught = false;
    const promise = new PromiseLike((resolve) => {
      setTimeout(() => resolve('resolved'), 10);
    });

    promise
      .then(() => {
        throw new Error('error');
      })
      .catch((err) => {
        errorCaught = err.message === 'error';
      });

    await waitFor(20);
    console.assert(errorCaught, 'Errors in then handler should be caught');
  }

  console.log('All tests passed!');
}

runTests();
