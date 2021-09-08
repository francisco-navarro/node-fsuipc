const winApi = require('./api/fsuipc/win.js');
const mockApi = require('./api/fsuipc/mock.js');
const express = require('express');
const app = express();
const port = 3000;


const isWin = process.platform.match('^win');
let api = isWin ? winApi : mockApi;

api.connect();

app.use(express.static('public'));

app.get('/api', async (req, res) => {
  const result = await api.update();
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
