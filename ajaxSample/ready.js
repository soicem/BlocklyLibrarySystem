'use strict';

const fs = require('fs');
const cnst = require('./constant');


fs.mkdirSync(cnst.tmp_dir);
console.log(`tmp dir ${cnst.tmp_dir} was created!`);

