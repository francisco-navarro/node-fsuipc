// eslint-disable-next-line no-unused-vars
function main() {
  console.log('main.js');
 

  rainbows();
}

function rainbows() {
  let turn = -90;
  let direction = 2;

    d3.select("#airspeed #needle")
    .attr('transform', `translate(180,178)`)

  setInterval(() => {
    d3.select("#airspeed #needle")
      .transition()
      // .duration(100)
      .attr('transform', `translate(180,178)rotate(${turn})`);

    if (turn > 180 || turn < -90) {
      direction *= -1;
    }
    turn += direction;

  }, 50);
}