// ✅ 1. Import MongoClient from mongodb package
// This line brings the MongoClient class from the 'mongodb' library.
// MongoClient helps us connect to MongoDB and perform operations.
const { MongoClient } = require("mongodb");

// ✅ 2. Your MongoDB connection link (URI)
// This is your connection string from MongoDB Atlas.
// It includes your username, password, and cluster address.
const url = "mongodb+srv://Namastevdev:1wAIChozbleEa9Uv@namastenode.blddkgp.mongodb.net/";

// ✅ 3. Create a MongoClient instance using the connection URL
// This creates a new MongoDB client we’ll use to talk to the database.
const client = new MongoClient(url);

// ✅ 4. Define the database name you want to use or create
// If it doesn’t exist, MongoDB will create it automatically.
const dbName = 'HelloWorld';

// ✅ 5. Define an async function to use "await" (for async operations)
async function main() {

  // ✅ 6. Connect to MongoDB server (Atlas)
  // This actually connects your app to your MongoDB cluster online.
  await client.connect();
  console.log("✅ Connected successfully to server");

  // ✅ 7. Select your database and collection
  // Think of a "database" as a folder and a "collection" as a table.
  const db = client.db(dbName);              // Connect to the HelloWorld database
  const collection = db.collection("User");  // Choose or create a "User" collection (like a table)

  // --------------------------------------
  // 🔹 8. CREATE: Insert documents (add data)
  // --------------------------------------

  // First user data
  const data = {
    firstname: "Palak",
    lastname: "Pintu",
    city: "Kolkata",
    mobile: "9876543210",
  };

  // Insert the first user into MongoDB
  const insertResult = await collection.insertOne(data);
  console.log("📥 Inserted document =>", insertResult);

  // Second user data
  const data2 = {
    firstname: "Khushi",
    lastname: "Pintu",
    city: "Kolkata",
    mobile: "9876543210",
  };

  // Insert second user
  const insertResult2 = await collection.insertOne(data2);
  console.log("📥 Inserted document 2 =>", insertResult2);

  // Third user data
  const data3 = {
    firstname: "PalakK",
    lastname: "PintuU",
    city: "KolkatAa",
    mobile: "9876543210",
  };

  // Insert third user
  const insertResult3 = await collection.insertOne(data3);
  console.log("📥 Inserted document 3 =>", insertResult3);

  // --------------------------------------
  // 🔹 9. READ: Get (find) all documents
  // --------------------------------------
  const findResult = await collection.find({}).toArray();
  console.log("📄 Found documents =>", findResult);
  // `{}` means no filter → get *everything*

  // --------------------------------------
  // 🔹 10. READ with Filter: firstname = "Palak"
  // --------------------------------------
  const filteredResult = await collection.find({ firstname: "Palak" }).toArray();
  console.log("🔍 Documents with firstname 'Palak' =>", filteredResult);
  // This finds all documents where firstname is "Palak"

  // --------------------------------------
  // 🔹 11. COUNT: Total number of documents
  // --------------------------------------
  const countResult = await collection.countDocuments();
  console.log("🔢 Total documents count =>", countResult);
  // Counts how many total documents exist in the "User" collection

  // --------------------------------------
  // 🔹 12. UPDATE: Change a document
  // --------------------------------------
  const updateResult = await collection.updateOne(
    { firstname: "Palak" },     // Find the document where firstname is Palak
    { $set: { city: "Mumbai" } } // Change "city" value to "Mumbai"
  );
  console.log("🔁 Updated document =>", updateResult);

  // --------------------------------------
  // 🔹 13. DELETE: Remove a document
  // --------------------------------------
  const deleteResult = await collection.deleteOne(
    { firstname: "Palak" }       // Delete document where firstname is Palak
  );
  console.log("🗑️ Deleted document =>", deleteResult);

  // --------------------------------------
  // 🔹 14. READ again: confirm deletion
  // --------------------------------------
  const afterDelete = await collection.find({ firstname: "Palak" }).toArray();
  console.log("📉 After Deletion - Documents with firstname 'Palak' =>", afterDelete);
  // Should be an empty array [] if delete worked

  // ✅ 15. Return a success message at the end
  return "🎉 All CRUD operations done!";
}

// ✅ 16. Run the main() function
// .then(console.log) → Prints success message if everything works
// .catch(console.error) → Prints error if something goes wrong
// .finally(() => client.close()) → Closes database connection at the end
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
