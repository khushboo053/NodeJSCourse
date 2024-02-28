// CRUD OPERATIONS
// Instead of writing localhost we are writing '127.0.0.1' coz it causes much issues & slows down the process

const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "task-manager";

const id = new ObjectId();
console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id); // Buffer
// console.log(id.id.length); // Original length
// console.log(id.toHexString().length); // String length

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("tasks");

  //   const insertData = await collection.insertOne({
  //     _id: id,
  //     name: 'Testing',
  //     description: 'Testing Project',
  //     completed: false
  //   })

  //   const insertResult = await collection.insertMany([
  //     {
  //       name: "MongoDb Course",
  //       description: "CRUD Operations",
  //       Completed: true,
  //     },
  //     {
  //       name: "JavaScript",
  //       description: "Async/Await",
  //       Completed: true,
  //     },
  //     {
  //       name: "Node.JS",
  //       description: "REST API",
  //       Completed: false,
  //     },
  //   ]);

  // null coz id is not a string its a binary data

  //   const findResult = await collection.findOne({
  // _id: "65cf03ec9f357f4b74b7f2ba",
  //   });

  //   const findResult = await collection.findOne({
  //     _id: new ObjectId("65cf03ec9f357f4b74b7f2ba"),
  //   });

  // const findRes = await collection
  //   .find({ completed: false })
  //   .toArray((err, res) => {
  //     console.log(res);
  //   });

  //   const findCount = await collection
  //     .find({ name: "MongoDb Course" })
  //     .count((err, count) => {
  //         console.log(count);
  //     });

  try {
    // const updateResult = await collection.updateMany(
    //   {
    //     // _id: new ObjectId("65cefe51d502d3ddaa845cce")
    //     Completed: false,
    //   },
    //   {
    //     $set: {
    //       Completed: true
    //     },
    //     // $inc: {
    //     //   age: 1,
    //     // },
    //   }
    // );


    const deleteResult = await collection.deleteOne({
      name: 'Testing'
    })
    console.log(deleteResult);
  } catch (error) {
    console.error(error);
  }

  return "done.";
}

main()
  .then(() => console.log("Connected Successfully!\n"))
  .catch((error) => console.error(error))
  .finally(() => client.close());
