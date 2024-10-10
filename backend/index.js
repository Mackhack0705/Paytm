const express = require('express');
const mainRouter = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', mainRouter);


app.listen(port, () => {
    console.log(`app is listenig on port: ${port}`);
})

