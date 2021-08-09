const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
require('./app/routes.js')(app);

app.listen(PORT, () => {

  console.log(`listening on ${PORT}`);
});
