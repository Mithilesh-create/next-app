import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const client = await MongoClient.connect(
        "mongodb+srv://admin:UgYBJClx74QzJx0q@cluster0.3tpra.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = await client.db();
      const MongoCollection = db.collection("meetups");
      await MongoCollection.insertOne(data);
      client.close();
      res.status(201).json({ message: "Inserted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
