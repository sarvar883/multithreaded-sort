const { workerData, parentPort } = require('worker_threads');

// CPU heavy stuff here
let array = workerData;

// @ts-ignore
array.sort((a, b) => a - b);

parentPort.postMessage(array);