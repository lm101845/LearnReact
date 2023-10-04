import sum from './A.js';
let name = "B";
const average = function average(...params) {
    if (params.length === 0) return 0;
    let total = sum(...params);
    return (total / params.length).toFixed(2);
};
export default average;