const { MongoClient } = require("mongodb");

// ✅ MongoDB Atlas connection URI
const url = "mongodb+srv://Namastevdev:1wAIChozbleEa9Uv@namastenode.blddkgp.mongodb.net/";

const client = new MongoClient(url);

// ✅ Database and Collection Names
const dbName = "PintuPandit";
const collectionName = "users_data_store"; // ❌ No spaces allowed in collection names

async function main() {
  try {
    // ✅ 1. Connect to MongoDB Atlas
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas");

    // ✅ 2. Select the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // --------------------------------------
    // 🔹 3. CREATE: Insert a document
    // --------------------------------------
    const data = {
      firstname: "Deepika",
      lastname: "Singh",
      city: "Mumbai",
      phoneNumber: "987543210",
    };

    const insertResult = await collection.insertOne(data);
    console.log("📥 Inserted document ID =>", insertResult.insertedId);

    // --------------------------------------
    // 🔹 4. READ: Find all documents
    // --------------------------------------
    const findResult = await collection.find({}).toArray();
    console.log("📖 Found documents =>", findResult);

    return "✅ Done!";
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    // ✅ Close MongoDB connection
    await client.close();
    console.log("🔒 Connection closed");
  }
}

// ✅ Run the script
main()
  .then(console.log)
  .catch(console.error);
