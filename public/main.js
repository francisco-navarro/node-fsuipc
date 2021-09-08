// eslint-disable-next-line no-unused-vars
function main() {
  console.log('main.js');
 
    
  d3.select("#airspeed #needle")
    .attr('transform', `translate(180,178)`)

  setTimeout(rainbows, 100);
}

async function getData() {
  try {
    const response = await fetch('http://localhost:3000/api');
    const data = await response.json();
    return data || {};
  } catch {
    return {};
  }
}

async function rainbows() {
  const data = await getData();
  const max = 240;
  const turn = data.airspeed / max;
  const rotate = d3.interpolate(
    "rotate(-130)", //min rotation
    "rotate(205)" // max rotation
  )(turn);

  d3.select("#airspeed #needle")
    .transition()
    // .duration(100)
    .attr('transform', `translate(180,178)${rotate}`);

    setTimeout(rainbows, 100);

}
