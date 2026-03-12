const mongoose = require("mongoose");
const { db } = require("../configs/common");

const { countConnection } = require("../helper/checkConnection");
const MONGO_URI = `mongodb://${db.host}:${db.port}/${db.name}`;
console.log(MONGO_URI)
class DataBase {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      if (process.env.ENV === 'dev') {
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true });
      }
      await mongoose.connect(MONGO_URI);
      console.log("connect DB successfully");
      countConnection();
    } catch (err) {
      console.log("fail to connect DB");
    }
  }

  static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }
}

module.exports = DataBase.getInstance();
