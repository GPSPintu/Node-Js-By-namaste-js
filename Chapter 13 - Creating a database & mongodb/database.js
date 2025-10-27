// ✅ Import the MongoDB client
const { MongoClient } = require("mongodb");

// ✅ MongoDB Atlas connection URI
const url = "mongodb+srv://infopintuwork_db_user:51RHkZX1uLp26HS9@cluster0.qpjhid0.mongodb.net/";

// ✅ Create a new MongoClient instance
const client = new MongoClient(url);

// ✅ Define the database name
const dbName = 'HelloWorld';

async function main() {
  // ✅ 1. Connect to the MongoDB server
  await client.connect();
  console.log("✅ Connected successfully to server");

  // ✅ 2. Select the database and collection
  const db = client.db(dbName);
  const collection = db.collection("User");

  // --------------------------------------
  // 🔹 3. CREATE: Insert a document
  // --------------------------------------
  const data = {
    firstname: "Palak",
    lastname: "Pintu",
    city: "Kolkata",
    mobile: "9876543210",
  };

  
  const insertResult = await collection.insertOne(data);
  console.log("📥 Inserted document =>", insertResult);

 const data2 = {
    firstname: "Khushi",
    lastname: "Pintu",
    city: "Kolkata",
    mobile: "9876543210",
  };

  const insertResult2 = await collection.insertOne(data2);
  console.log("📥 Inserted document 2 =>", insertResult2);

const data3= {
    firstname: "PalakK",
    lastname: "PintuU",
    city: "KolkatAa",
    mobile: "9876543210",
  };

  
const insertResult3 = await collection.insertOne(data3);
  console.log("📥 Inserted document 3 =>", insertResult3);

  const data4 = { 
  firstname: "Priyanka",
  lastname: "Jain",
  city: "Delhi",
  mobile: "898743210",
};

const insertResult4 = await collection.insertOne(data4);
console.log("📥 Inserted document 4 =>", insertResult4);


  
  // 📌 Output: Shows `acknowledged: true` and `insertedId`

  // --------------------------------------
  // 🔹 4. READ: Find all documents
  // --------------------------------------
  const findResult = await collection.find({}).toArray();
  console.log("📄 Found documents =>", findResult);
  // 📌 Output: Array of all documents in the "User" collection

  // --------------------------------------
  // 🔹 5. READ with Filter: firstname = "Palak"
  // --------------------------------------
  const filteredResult = await collection.find({ firstname: "Palak" }).toArray();
  console.log("🔍 Documents with firstname 'Palak' =>", filteredResult);
  // 📌 Output: Array of documents with firstname 'Palak'

  // --------------------------------------
  // 🔹 6. COUNT: Total number of documents
  // --------------------------------------
  const countResult = await collection.countDocuments();
  console.log("🔢 Total documents count =>", countResult);
  // 📌 Output: Total number of documents in collection

  // --------------------------------------
  // 🔹 7. UPDATE: Update a document
  // --------------------------------------
  const updateResult = await collection.updateOne(
    { firstname: "Palak" },              // Filter condition
    { $set: { city: "Mumbai" } }         // Update operation
  );
  console.log("🔁 Updated document =>", updateResult);
  // 📌 Output: Shows matchedCount and modifiedCount

  // --------------------------------------
  // 🔹 8. DELETE: Delete a document
  // --------------------------------------
  const deleteResult = await collection.deleteOne(
    { firstname: "Palak" }               // Filter condition
  );
  console.log("🗑️ Deleted document =>", deleteResult);
  // 📌 Output: Shows deletedCount = 1

  // --------------------------------------
  // 🔹 9. READ again with Filter: firstname = "Palak"
  //    (to confirm deletion)
  // --------------------------------------
  const afterDelete = await collection.find({ firstname: "Palak" }).toArray();
  console.log("📉 After Deletion - Documents with firstname 'Palak' =>", afterDelete);
  // 📌 Output: Should be an empty array []

  // ✅ Return success message
  return "🎉 All CRUD operations done!";
}

// ✅ Call the main function and handle result
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

//   ✅ Connected successfully to server
// 📥 Inserted document => { acknowledged: true, insertedId: ObjectId("...") }
// 📄 Found documents => [ ... list of all users ... ]
// 🔍 Documents with firstname 'Palak' => [ { firstname: 'Palak', ... } ]
// 🔢 Total documents count => 1
// 🔁 Updated document => { acknowledged: true, matchedCount: 1, modifiedCount: 1 }
// 🗑️ Deleted document => { acknowledged: true, deletedCount: 1 }
// 📉 After Deletion - Documents with firstname 'Palak' => []
// 🎉 All CRUD operations done!
