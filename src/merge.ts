// merge two sorted arrays and return another sorted array
// O(n) time & O(n) space

// example:
// arr1 => [3, 5, 6, 10, 11, 20]
// arr2 => [1, 2, 7, 8, 15, 19]
// output => [1, 2, 3, 5, 6, 7, 8, 10, 11, 15, 19, 20]
export function mergeArrays(arr1: number[] = [], arr2: number[] = []): number[] {
    const result: number[] = [];
    let i: number = 0;
    let j: number = 0;

    while (i < arr1.length  && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i++]);

        } else {
            result.push(arr2[j++]);

        }
    }

    return result.concat(arr1.slice(i)).concat(arr2.slice(j));
}