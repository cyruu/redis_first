import mongoose from "mongoose";

const redisDataSchema = mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: String,
  },
});

const redisData = mongoose.model("redisdata", redisDataSchema);
export { redisData };
