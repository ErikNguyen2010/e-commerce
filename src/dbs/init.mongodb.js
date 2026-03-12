const mongoose = require("mongoose");
const { countConnection } = require("../helper/checkConnection");
const MONGO_URI = "mongodb://localhost:27017/myShop";

const envi = 'dev'

class DataBase {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
        if(envi === 'dev'){
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
      await mongoose.connect(MONGO_URI);
      console.log("connect DB successfully");
      countConnection()
    } catch (err) {
      console.log("fail to connect DB");
    }
  }

  static getInstance(){
    if(!DataBase.instance){
        DataBase.instance =  new DataBase()
    }
    return DataBase.instance
  }
}

module.exports = DataBase.getInstance()
