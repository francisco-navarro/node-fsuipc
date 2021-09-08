const selector = '#airspeed #needle';
const INTERPOLATION_MATRIX = [[0,-130], [40, -102], [100, -15], [160, 90], [240,205]]; 

function airspeed() {
  const obj = d3.select(selector);
  
  obj.attr('transform', `translate(180,178)`); // set needle center

  return {
    obj,
    update: (data) => {
      const turn = data.airspeed;
      d3.select(selector)
        .transition()
        // .duration(100)
        .attr('transform', `translate(180,178)${interpolateRotation(turn)}`);
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

export { airspeed };