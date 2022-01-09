// This is another way of importing modules.
const express = require("express");
const cors = require("cors");
const server = express();
const fs = require('fs');
const path = require('path');
const HttpError = require('./database/models/http-error');

const userRoutes = require('./routes/users.route');




const port = process.env.PORT || 5000;
server.use(cors());
server.use(express.json());

server.use('/api/users', userRoutes);
require('./routes/counselors.route.js')(server);

server.use('/uploads/images', express.static(path.join('uploads', 'images')));

server.use((req, res, next)=>{
  const error = new HttpError('Could not find this route.', 404);
  throw error;
})




server.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || "An unknown error occurred!"});

});

const listener = server.listen(port, () =>
  console.log(`Server is running on localhost:${port}`)
);

