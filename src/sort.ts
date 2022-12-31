import { Worker } from 'worker_threads';
import { mergeArrays } from './merge';

type NumbersArray = number[];

export async function sort(input_array: NumbersArray, THREADS: number): Promise<NumbersArray> {

    const promises: Array<Promise<NumbersArray>> = [];

    for (let i = 0; i < THREADS; i++) {
        // divide large array to smaller chunks
        // each chunk will be sorted in a separate thread by worker
        const startIndex: number = Math.floor(i * input_array.length / THREADS);

        const endIndex: number = Math.floor((i + 1) * input_array.length / THREADS);

        const chunk: NumbersArray = input_array.slice(startIndex, endIndex);

        // assign chunks to worker threads
        promises.push(runService(chunk));
    }

    // execute workers
    const sorted_chunks = await Promise.all(promises);

    // combine all sorted chunks and form the final sorted array
    let sortedArray: NumbersArray = sorted_chunks[0];

    for (let i = 1; i < sorted_chunks.length; i++) {
        sortedArray = mergeArrays(sortedArray, sorted_chunks[i]);
    }

    return sortedArray;
}

// assigns array to a separate worker
function runService(workerData: NumbersArray): Promise<NumbersArray> {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./src/worker.ts', { workerData });

        worker.on('message', resolve);

        worker.on('error', reject);

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}