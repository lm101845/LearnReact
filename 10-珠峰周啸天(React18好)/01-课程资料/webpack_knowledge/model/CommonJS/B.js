let name = 'B';
const sum = require('./A'); //导入
const average = function average(...params) {
    if (params.length === 0) return 0;
    let total = sum(...params);
    return (total / params.length).toFixed(2);
};

/* 导出 */
module.exports = {
    average
};