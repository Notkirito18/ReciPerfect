// imports
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

// routes import
const users = require("./routes/users");
const auth = require("./routes/auth");
const recipes = require("./routes/recipes");
const recipesRead = require("./routes/recipesRead");

//*middlewares
//require the header "key" to authorize the request
const authorize = require("./middleware/authorization");
//require login ("authToken" header) to authorize the request
const verifyToken = require("./middleware/verifyToken");
//require a valid userId header to authorize the request
const userIdVerify = require("./middleware/userIdVerify");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "key", "authToken", "userDataId"],
};
app.use(cors(corsOpts));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

app.use(express.json());

// routes
//*authentication routes (register and login)
app.use("/auth", authorize, auth);
//*users crud routes
app.use("/api/users", authorize, users);
//*recipes write routes
app.use("/api/recipes/write", authorize, userIdVerify, verifyToken, recipes);
//*recipes read routes
app.use("/api/recipe/read", authorize, recipesRead);

//* serving the frontend
// app.use(express.static(path.join(__dirname, "public")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

//starting the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
