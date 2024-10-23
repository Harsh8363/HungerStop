const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db'); 

  app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  const path = require('path');
// const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(5000);
  app.use(express.json());
  app.use('/api', require('./Routes/CreateUser'));
  app.use('/api', require('./Routes/DisplayData'));
  app.use('/api', require('./Routes/OrderData'));
  
  app.get('/', (req, res) => {
    res.send('Hello World!------');
  });
const startServer = async () => {
  try {
    await mongoDB(); 
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

startServer();
