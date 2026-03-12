const mongoose = require("mongoose");
const os = require("os");

const countConnection = () => {
  const connect = mongoose.connections.length;

  console.log(`đang có ${connect} DB connect`);
};

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnection = numCores * 5;
    console.log(`Number of Connection: ${numConnection}`);
    console.log(`Memory Usage: ${memoryUsage / 1024 / 1024}MB`);

    if (numConnection > maxConnection) {
      console.log(`Connection Overloaddd`);
    }
  }, 5000);
};

module.exports = {
  countConnection,
  checkOverload,
};
