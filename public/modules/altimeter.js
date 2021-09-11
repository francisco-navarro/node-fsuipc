const needle2 = '#altimeter #needle2';
const INTERPOLATION_MATRIX = [[0,-130], [40, -102], [100, -15], [160, 90], [240,205]];
let OFF_1 = 120;
let OFF_2 = 120;
let OFF_3 = 120;
let OFF_4 = 120;

function altimeter() {
  let last = [0,0];

  return {
    update: (data) => {
      const alt = data.altitude;
      const hundred = (alt / 1000) % 1;
      const thousand = (alt / 10000) % 1;
      const turnHundred = d3.interpolateRound(0, 360)(hundred);
      const turnThousand = d3.interpolateRound(0, 360)(thousand);
      const needle1 = d3.select('#altimeter #needle1');
      const needle2 = d3.select('#altimeter #needle2');

      needle1.transition().duration(100)
        .attr('transform', `translate(${OFF_1},${OFF_2})rotate(${turnHundred})`);
      needle2.transition().duration(100)
        .attr('transform', `translate(${OFF_3},${OFF_4})rotate(${turnThousand}) `);

      last = [turnHundred, turnThousand];
    }
  }
}

function interpolateRotation(value) {
  const intervalIndex = Math.max(INTERPOLATION_MATRIX.findIndex(el => el[0] >= value), 1);
  const [ max, maxRotation ] = INTERPOLATION_MATRIX[intervalIndex];
  const [ min, minRotation ] = INTERPOLATION_MATRIX[intervalIndex-1];

  const rotate = d3.interpolate(
    `rotate(${minRotation})`, //min rotation
    `rotate(${maxRotation})` // max rotation
  )((value-min)/(max-min));

  return rotate;
}

export { altimeter };