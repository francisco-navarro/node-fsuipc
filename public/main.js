import { airspeed } from './modules/airspeed.js';
import { attitude } from './modules/attitude.js';
const host = window.location.host;
const gauges = [];
const TIMEOUT = 100;


function main() {
  gauges.push(airspeed());
  gauges.push(attitude());

  setTimeout(rainbows, TIMEOUT);
}

function log(text) {
  document.querySelector('#log').innerHTML = text;
}

async function getData() {
  try {
    const response = await fetch(`http://${host}/api`);
    const data = await response.json();

    log(JSON.stringify(data).replace(/[,{}]/g,'<br>'));

    return data || {};
  } catch (ex) {
    log(ex);
    return {};
  }
}

async function rainbows() {
  const data = await getData();

  gauges.forEach(gauge => gauge.update(data));
  setTimeout(rainbows, TIMEOUT);
}

main();