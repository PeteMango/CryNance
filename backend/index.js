require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

const Polybase = require("@polybase/client").Polybase;
const { v4: uuidv4 } = require('uuid');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = new Polybase({
  defaultNamespace: "pk/0x6aec08b85c53bc7ac7256f4a479a352f5348048f3214d95592e0f9011f359649043af2b68cdd4bd96104d9d6e877b7336906fc8d547038b49a6d88bc3dbc56e1/CRyNANCE",
});

const articleCollectionReference = db.collection("Articles");
const userCollectionReference = db.collection("User");

async function createUser () {
  const recordData = await userCollectionReference.create([
    "nullifier hash 5",
    "username 5"
  ]);
  console.log(recordData.data);
}
// createUser();

// need to get a bunch of information
async function createArticle () {
  const recordData = await articleCollectionReference.create([
    "theid3",
    "im the author",
    "september 1",
    "this is an important article",
    "important article",
    "free",
  ]);
  console.log(recordData.data);
}
// createArticle();

// need to get the id of the article
async function getRecord () {
  const record = await articleCollectionReference.record("id5").get();
  const { data } = record;
  console.log(data);
}
// getRecord();

async function listRecordsWithFilter () {
  // where(name, op, value)
  // const records = await articleCollectionReference.where("level", "==", "level").get();
  const records = await articleCollectionReference.where("vote", ">=", 50).get();
  // Array of records is available under the data property
  const { data, cursor } = records;
  const filtered = data.map((record) => {
    return record.data;
  })
  console.log(filtered);

  // Records is QueryResponse, so we can use it to get the next page of results
  // await records.next();
}
// listRecordsWithFilter();

function handleErrorResponse(res, error, statusCode, message) {
  console.error(error);
  res.status(statusCode).send(message);
}
app.post("/api/add-article", async (req, res) => {
  // id author_id created_at content title level vote
  const {author_id, content, title, level, isDraft, categories} = req.body;
  const id = uuidv4();
  console.log(req.body);
  console.log(Date.now());
  console.log(String(Date.now()));
  try {
    const recordData = await articleCollectionReference.create([
      id,
      author_id,
      String(Date.now()),
      content,
      title,
      level,
      (isDraft ? 1 : 0),
      categories
    ]);
    res.status(200).json(recordData);
    // {
      //   author_id: 'im the author',
      //   content: 'this is an important article',
      //   created_at: 'september 1',
      //   id: 'theid3',
      //   level: 'free',
      //   title: 'important article',
      //   vote: 50
      // }
    }
    catch(error) {
      handleErrorResponse(res, error, 500, "Error adding article");
  }
})

app.get("/api/get-articles-by-authorID/:authorID", async(req, res) => {
  const authorID = req.params.authorID;
  try {
    const records = await articleCollectionReference.where("author_id", "==", authorID).get();
    // Array of records is available under the data property
    const { data, cursor } = records;
    const filtered = data.map((record) => {
      return record.data;
    })
    console.log(filtered);
    res.status(200).json(filtered);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error getting articles by authorID");
  }
})

app.get("/api/get-articles-by-vote-min/:vote", async (req, res) => {
  let vote = req.params.vote;
  vote = Number(vote);
  try {
    const records = await articleCollectionReference.where("vote", ">=", vote).get();
    // Array of records is available under the data property
    const { data, cursor } = records;
    const filtered = data.map((record) => {
      return record.data;
    })
    console.log(filtered);
    res.status(200).json(filtered);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error getting articles by vote ");
  }
})

app.get("/api/get-articles-by-level/:level", async(req, res) => {
  const level = req.params.level;
  try {
    const records = await articleCollectionReference.where("level", "==", level).get();
    // Array of records is available under the data property
    const { data, cursor } = records;
    const filtered = data.map((record) => {
      return record.data;
    })
    console.log(filtered);
    res.status(200).json(filtered);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error getting articles by level");
  }
})

app.get("/api/get-all-articles", async(req, res) => {
  try {
    const records = await articleCollectionReference.where("vote", ">=", 0).get();
    // Array of records is available under the data property
    const { data, cursor } = records;
    const filtered = data.map((record) => {
      return record.data;
    })
    console.log(filtered);
    res.status(200).json(filtered);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error getting all articles");
  }
})

async function upvote () {
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await articleCollectionReference
    .record("78c72734-f778-4dde-805c-c0b0b6003861")
    .call("Upvote");
  console.log(recordData.data);
}
// upvote();

async function downvote () {
  // .create(functionName, args) args array is defined by the updateName fn in collection schema
  const recordData = await articleCollectionReference
    .record("id5")
    .call("Downvote");
  console.log(recordData.data);
}
// downvote();

app.post("/api/upvote-by-id", async (req, res) => {
  const {id} = req.body;
  try {
    const recordData = await articleCollectionReference
    .record(id)
    .call("Upvote");
    console.log(recordData.data);
    res.status(200).json(recordData.data);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error upvoting article");
  }
})

app.post("/api/downvote-by-id", async (req, res) => {
  const {id} = req.body;
  try {
    const recordData = await articleCollectionReference
    .record(id)
    .call("Downvote");
    console.log(recordData.data);
    res.status(200).json(recordData.data);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error upvoting article");
  }
})

app.post("/api/publish-article-by-id", async (req, res) => {
  const {id} = req.body;
  try {
    const recordData = await articleCollectionReference
    .record(id)
    .call("Publish");
    console.log(recordData.data);
    res.status(200).json(recordData.data);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error publishing article");
  }
})

const isUser = async (username) => {
  const records = await userCollectionReference.where("name", "==", username).get();
  if (!records) {
    return false;
  }
  return true;
}

// const {generate} = require("random-words");
const fs = require("fs");
const wordsFilePath = __dirname + "/words.txt";
const words = fs.readFileSync(wordsFilePath, "utf-8").split("\n").filter(Boolean);

function getRandomWords(numWords) {
  const randomWords = [];
  let randomWordsString = "";
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
    randomWordsString += words[randomIndex] + " ";
  }
  randomWordsString = randomWordsString.trim(); // Remove trailing space
  return randomWordsString;
}

app.post("/api/add-username", async (req, res) => {
  const {nullifier_hash} = req.body;
  console.log(req.body);
  const username = getRandomWords(2);
  console.log(username);
  try {
    // const records = await userCollectionReference.where("name", "==", username).get();
    // const users = records.data[0].data;
    // if (users) {
    //   res.status(201).json({message: "username already exists"});
    // }
    const recordData = await userCollectionReference.create([
      nullifier_hash,
      username
    ]);
    data = recordData.data;
    res.status(200).json(data);

  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error adding user");
  }
})

async function getUsername () {
  const records = await userCollectionReference.where("username", "==", "username").get();
  // console.log(records);
  console.log(records.data[0].data);
}
// getUsername();

app.get("/api/get-user-by-hash/:nullifier_hash", async (req, res) => {
  const nullifier_hash = req.params.nullifier_hash;
  try {
    const records = await userCollectionReference.where("id", "==", nullifier_hash).get();
    // console.log(records);
    console.log(records.data[0].data);
    res.status(200).json(records.data[0].data);
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error getting user by hash");
  }
})

app.post("/api/user-delete", async (req, res) => {
  const {nullifier_hash} = req.body;
  try {
    const recordData = await userCollectionReference
    .record(nullifier_hash).call("del");
    // .delete();
    console.log(recordData.data);
    res.status(200).json({message: "User deleted"});
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error deleting user");
  }
})

app.post("/api/article-delete", async (req, res) => {
  const {id} = req.body;
  try {
    const recordData = await articleCollectionReference
    .record(id).call("del");
    // .delete();
    console.log(recordData.data);
    res.status(200).json({message: "Article deleted"});
  }
  catch (error) {
    handleErrorResponse(res, error, 500, "Error deleting article");
  }
})