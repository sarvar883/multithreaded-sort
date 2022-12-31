import { getRandom } from './random';
import { sort } from './sort';

// generate a large unsorted array
const input_array: number[] = [];
const length: number = 9100000;

for (let i = 0; i < length; i++) {
    input_array.push(getRandom(6000));
}

// on how many threads you want to sort the array
// it is better to set the number of threads to match the number of cores in the CPU
const THREADS: number = 8;

async function execute() {
    // start timer here
    const start: number = performance.now();

    const sortedArray: number[] = await sort(input_array, THREADS);

    const timeSpent: number = Math.floor(performance.now() - start);

    console.log('Time to sort =', timeSpent, 'ms');
}

execute();