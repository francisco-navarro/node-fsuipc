const mockData = {
  airspeed: 90,
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
  mockData.airspeed = mockData.airspeed > 200 ? 0 : mockData.airspeed+=2;

  return Promise.resolve(mockData);
}

module.exports = {
  connect,
  update
};