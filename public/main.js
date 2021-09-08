const host = window.location.host;

// eslint-disable-next-line no-unused-vars
function main() {
  console.log('main.js');
 
    
  d3.select("#airspeed #needle")
    .attr('transform', `translate(180,178)`)

  setTimeout(rainbows, 100);
}

async function getData() {
  try {
    const response = await fetch(`http://${host}/api`);
    const data = await response.json();

    document.querySelector('#log').innerHTML = data.airspeed;

    return data || {};
  } catch (ex) {
    document.querySelector('#log').innerHTML = ex;
    return {};
  }
}

async function rainbows() {
  const data = await getData();
  const turn = data.airspeed;
  const matrixIntp = [[0,-130], [40, -102], [100, -15], [160, 90], [240,205]];
  

  d3.select("#airspeed #needle")
    .transition()
    // .duration(100)
    .attr('transform', `translate(180,178)${interpolateRotation(matrixIntp, turn)}`);

    setTimeout(rainbows, 150);
}

function interpolateRotation(matrix, value) {
  const intervalIndex = Math.max(matrix.findIndex(el => el[0] >= value), 1);
  const [ max, maxRotation ] = matrix[intervalIndex];
  const [ min, minRotation ] = matrix[intervalIndex-1];

  const rotate = d3.interpolate(
    `rotate(${minRotation})`, //min rotation
    `rotate(${maxRotation})` // max rotation
  )((value-min)/(max-min));

  return rotate;
}