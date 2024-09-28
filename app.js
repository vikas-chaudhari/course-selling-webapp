const express = require("express");
const { connect } = require("mongoose");
require("dotenv").config();
const app = express();

// connecting MONGODB;
const connection = (async () => {
  await connect(process.env.MONGO_URI);
})();

// middlewares
app.use(express.json());

// importing routers
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(process.env.PORT);
