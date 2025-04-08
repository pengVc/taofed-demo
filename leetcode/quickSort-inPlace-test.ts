import { quickSortInPlace } from './quickSort-inPlace'

const test = [5, 3, 7, 6, 4, 1, 0, 2, 9, 10, 8]

quickSortInPlace(test)

console.assert(test.join('') === '012345678910')
