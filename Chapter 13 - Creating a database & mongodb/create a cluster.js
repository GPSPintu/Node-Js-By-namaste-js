const { MongoClient } = require("mongodb");

const url = "mongodb+srv://Namastevdev:1wAIChozbleEa9Uv@namastenode.blddkgp.mongodb.net/";
const client = new MongoClient(url);
const dbName = 'HelloWorld';

async function pushData() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("User");

    const users = [
      { firstname: "Palak", lastname: "Pintu", city: "Kolkata", mobile: "9876543210" },
      { firstname: "Khushi", lastname: "Pintu", city: "Kolkata", mobile: "9876543210" },
      { firstname: "PalakK", lastname: "PintuU", city: "KolkatAa", mobile: "9876543210" }
    ];

    const result = await collection.insertMany(users);
    console.log(`📥 Inserted ${result.insertedCount} documents`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

pushData();
