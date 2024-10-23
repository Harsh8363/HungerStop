const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://HungerStop1:HS123456@cluster0.vuqoxuj.mongodb.net/HungerStopMern?retryWrites=true&w=majority";
const mongoURI = "mongodb://HungerStop1:HS123456@ac-t6jqn8d-shard-00-00.vuqoxuj.mongodb.net:27017,ac-t6jqn8d-shard-00-01.vuqoxuj.mongodb.net:27017,ac-t6jqn8d-shard-00-02.vuqoxuj.mongodb.net:27017/HungerStopMern?ssl=true&replicaSet=atlas-tu7b6t-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    
    const fetched_data = db.collection("food_items");
    const foodCategory = db.collection("foodCategory");

    const foodItemsData = await fetched_data.find({}).toArray();
    const foodCategoryData = await foodCategory.find({}).toArray();

    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    // console.log("Data fetched and stored globally");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDB;





/*const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://HungerStop1:HS123456@cluster0.vuqoxuj.mongodb.net/HungerStopMern?retryWrites=true&w=majority";

const mongoURI = "mongodb://HungerStop1:HS123456@ac-t6jqn8d-shard-00-00.vuqoxuj.mongodb.net:27017,ac-t6jqn8d-shard-00-01.vuqoxuj.mongodb.net:27017,ac-t6jqn8d-shard-00-02.vuqoxuj.mongodb.net:27017/HungerStopMern?ssl=true&replicaSet=atlas-tu7b6t-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");
    const fetched_data= await mongoose.connection.db.collection("food_items");
    // 
    // const data=await fetched_data.find({}).toArray();
    // global.food_items=data;
    //   // console.log("Fetched data:",global.food_items);
    // 
   fetched_data.find({}).toArray(async function(err,data){
    const foodCategory= await mongoose.connection.db.collection("foodCategory");
    foodCategory.find({}).toArray(function(err,catData){
      if(err) console.log(err);
      else{
        global.food_items=data;
        global.foodCategory=catData;
      }
    })

   })
  }
  catch(err){
    console.log("----",err);
  }
};


module.exports = mongoDB;
*/
