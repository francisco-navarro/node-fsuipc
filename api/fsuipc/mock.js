const fs = require('fs');
const readline = require('readline');

// const mockData = {
//   airspeed: 40,
//   altitude: 12,
//   pitch: 12,
//   bank: 32,
//   heading: 32,
//   verticalSpeed: 23,
//   turnRate: 23,
//   turnCoordinatorBall: 23,
//   rpm: 2
// };
const mockData = [];
let mockIdx = -1;

function connect() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('sim-output.log'),
    output: process.stdout,
    console: false
  });

  readInterface.on('line', function(line) {
    mockData.push(JSON.parse(line));
});
}

function update() {
  mockIdx++;

  if (mockIdx>= mockData.length) mockIdx=0;
  
  return Promise.resolve(mockData[mockIdx]);
}

module.exports = {
  connect,
  update
};