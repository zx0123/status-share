const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const db = async () => {
  await mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected"))
    .catch((e) => console.log("Error " + e));
};

db();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
