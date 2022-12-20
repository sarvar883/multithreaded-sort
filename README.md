Worker threads are great tools to handle CPU-intensive tasks in Node.js.

In this project a large array of numbers is divided into smaller chunks and each chunk sorted in a separate worker thread. Then, all chunks are assembled into one sorted array.

There are 2 advantages of using this approach:
1. Sorting can be executed much faster than on a single thread.  
  On my machine, if the array is sorted on a single thread, the process took on average 5 seconds.
  Then I created 8 threads to utilize the CPU with 8 cores, and sorting took about 2.2 seconds. That is more than twice faster. 

2. CPU-intensive task does not block the main thread.
