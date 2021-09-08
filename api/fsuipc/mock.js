const mockData = {
  airspeed: 40,
  altitude: 12,
  pitch: 12,
  bank: 32,
  heading: 32,
  verticalSpeed: 23,
  turnRate: 23,
  turnCoordinatorBall: 23,
  rpm: 2
};

function connect() {
}

function update() {
  mockData.airspeed = mockData.airspeed > 220 ? 40 : mockData.airspeed+=(2+Math.round(Math.random()*8));

  return Promise.resolve(mockData);
}

module.exports = {
  connect,
  update
};