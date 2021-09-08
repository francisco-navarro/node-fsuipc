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
  const turn = data.airspeed;
  const rotate = d3.interpolate(
    "rotate(-130)",
    "rotate(90)"
  )(0.5);

  d3.select("#airspeed #needle")
    .transition()
    // .duration(100)
    .attr('transform', `translate(180,178)${turn}`);

    //setTimeout(rainbows, 100);

}
