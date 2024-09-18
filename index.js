const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { dailyMission } = require("./func/dailyMission");
const { holdCoin, swipeCoin } = require("./func/holdCoin");
const { roullete } = require("./func/roullete");
const { getUserVisit } = require("./func/visit");
configDotenv();
// Schedule the task to run every hour on the hour
// dailyMission();
// holdCoin();
// roullete();
// swipeCoin();
getUserVisit();
cron.schedule("0 * * * *", holdCoin);
cron.schedule("0 * * * *", roullete);
cron.schedule("0 * * * *", swipeCoin);
cron.schedule("0 * * * *", dailyMission);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
