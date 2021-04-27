'use strict';

var config = require('./test.json');
// console.log('Welcome! ' + config.id + ' ' + config.name);


module.exports.hello = async (event) =>{
  if (event.path === '/whoami' && event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(
        { "username": "da335"}
      ),
    };
  }

  const projectId = 'iseeberg-cs5356'
  const firebaseTokenVerifier = require('firebase-token-verifier');

  if (event.path === '/spots' && event.httpMethod === 'GET') {
      // check the header named Authorization
      const token = event.headers['Authorization']
      
      // If no token is provided, or it is "", return a 401
      if (!token) {
        return {
          statusCode: 401
        }
      }
  
      try {
        
        // validate the token from the request
        const decoded = await firebaseTokenVerifier.validate(token, projectId)
      
      } catch (err) {
        // the token was invalid,
        console.error(err)
        
        return {
          statusCode: 401
        }
        
      }
  
      // user is now confirmed to be authorized, return the data
      return {
        statusCode: 200,
        body: JSON.stringify(config)
      }
    }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go severless v1.0!',
        input: event,
      }, null, 2
    ),
  };
};

// const AWS = require("aws-sdk");
// const express = require("express");
// const serverless = require("serverless-http");

// const app = express();

// const USERS_TABLE = process.env.USERS_TABLE;
// const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

// app.use(express.json());

// app.get("/users/:userId", async function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   };

//   try {
//     const { Item } = await dynamoDbClient.get(params).promise();
//     if (Item) {
//       const { userId, name } = Item;
//       res.json({ userId, name });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'Could not find user with provided "userId"' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not retreive user" });
//   }
// });

// app.post("/users", async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.put(params).promise();
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });

// app.use((req, res, next) => {
//   return res.status(404).json({
//     error: "Not Found",
//   });
// });


// module.exports.handler = serverless(app);
