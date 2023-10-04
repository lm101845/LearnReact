import sum from '@/A';
let name = "B";
const average = function average(...params) {
    let len = params.length,
        total = 0;
    if (len === 0) return 0;
    total = sum(...params);
    return total / len;
};
export default average;