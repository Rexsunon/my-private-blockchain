const level = require('level');
const chainDB = './chainDB';
const db = level(chainDB);

// Add data to level db with key/value pairs
function addLevelDBData(key, value) {
  db.put(key, value, (err) => {
    if (err) return console.log(`Block ${key} submission failed`, err);
  });
}

// Get data from levelDB by key
function getLevelDBData(key) {
  db.get(key, (err, value) => {
    if (err) return console.log('Not found!', err);

    console.log(`Value = ${value}`);
  });
}

// Add data to levelDB with value
function addDataToLevelDB(value) {
  let i = 0;
  db.createReadStream()
    .on('data', (data) => i++)
    .on('error', (err) => {
      return console.log('Unable to read data stream!', err);
    })
    .on('close', () => {
      console.log(`Block #${i}`);
      addLevelDBData(i, value);
    });
}

/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/

(function theLoop(i) {
  setTimeout(function () {
    addDataToLevelDB('Testing data');
    if (--i) theLoop(i);
  }, 100);
})(10);
