function connect() {
}

function update() {
  return Promise.resolve({
    airspeed: 128,
    altitude: 12,
    pitch: 12,
    bank: 32,
    heading: 32,
    verticalSpeed: 23,
    turnRate: 23,
    turnCoordinatorBall: 23,
    rpm: 2
  });
}

module.exports = {
  connect,
  update
};