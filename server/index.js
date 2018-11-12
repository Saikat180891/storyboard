const express  = require('express'),
      app      = express(),
      mongoose = require('mongoose'),
      config   = require('./config/config'),
      projects = require('./models/project'),
      projectRoutes   = require('./routes/projects-route');

mongoose.connect(config.mongodbURL, { useNewUrlParser: true })
.then(()=>{
  console.log("Connected to DB");
})
.catch(()=>{
  console.log("Failed to connect");
})



app.use('/api/v2/storyboard/projects', projectRoutes);





























app.get('**', (req, res)=>{
  res.json({message: "Page not found"});
});

const PORT = 3000;

app.listen(PORT, ()=>{
  console.log("Server Started...localhost:"+PORT);
})