const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;



server.use((error, req, res, next)=>{
  console.log(error);
  res.status(500).json({
    message: "There was an internal server error!"
  })
})



if (!module.parent) {
	server.listen(PORT, () => {
		console.log(`Running at http://localhost:${PORT}`)
	})
}


module.exports = server