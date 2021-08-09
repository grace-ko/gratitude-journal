const express = require('express');
const PORT = process.env.PORT || 8080;


const app = express();

app.get('/', (req, res) => {
  res.send('hi');
})
app.listen(8080, () => {
  console.log(`listening on ${PORT}`);
});
