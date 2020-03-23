/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');
function authenticate() {
  return async (req, res, next) => {
    try{
      if (!req.headers.authentication){
        return res.status(401).json({message: 'You shall not pass'})
      }
      const token = await jwt.verify(req.headers.authentication, 'shhhhhhhh');
      const user = await db('users').where('id', token.id)
  
      if(user){
        return next()
      }
  
      res.status(401).json({message: 'You shall not pass'})

    } catch(err){
      throw err
    }

  };
}

module.exports = authenticate;
