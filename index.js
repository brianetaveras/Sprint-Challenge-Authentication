const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;



server.use((error, req, res, next)=>{
  console.log(error);
  res.status(500).json({
    message: "There was an internal server error!"
  })
})



server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
