const selector = '#attitude #needle';
const INTERPOLATION_MATRIX = [[0,-130], [40, -102], [100, -15], [160, 90], [240,205]]; 

function attitude() {
  const obj = d3.select(selector);
  
  // set needle center

  return {
    obj,
    update: (data) => {
      const bank = data.bank;
      const pitch = data.pitch;

      d3.select(selector)
        .transition()
        // .duration(100)
        .attr('transform', `rotate(${bank*4} 775,299),translate(0, ${pitch*4})`);
    }
  }
}

function interpolateRotation(value) {
  const intervalIndex = Math.max(INTERPOLATION_MATRIX.findIndex(el => el[0] >= value), 1);
  const [ max, maxRotation ] = INTERPOLATION_MATRIX[intervalIndex];
  const [ min, minRotation ] = INTERPOLATION_MATRIX[intervalIndex-1];

  const rotate = d3.interpolate(
    `rotate(${minRotation} 775,300)`, //min rotation
    `rotate(${maxRotation} 755,300)` // max rotation
  )((value-min)/(max-min));

  return rotate;
}

export { attitude };