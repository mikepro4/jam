const mongoose = require("mongoose");
const { Schema } = mongoose;

const vizSchema = new Schema({
  authorId: String,
  status: { type: String, default: "draft" },
  shape: {
    rotateSpeed: Number,
    friction: Number,
    rotatePointSpeed: Number,
    step: Number,
    frequency: Number,
    boldRate: Number,
    math: String,
  },
  point: {
    size: Number,
    opacity: Number,
    count: Number,
    color: String
  },
  background: {
    color: {
      enabled: Boolean,
      colorValue: String,
      opacity: Number
    },
    gradient: {
      enabled: Boolean,
      colorStops: [Object],
      scale: Number,
      rotateDegree: Number,
      type: String
    }
  },
  foreground: {
    color: {
      enabled: Boolean,
      colorValue: String,
      opacity: Number
    },
    gradient: {
      enabled: Boolean,
      colorStops: [Object],
      scale: Number,
      rotateDegree: Number,
      type: String
    }
  },
  image: {
    enabled: Boolean,
    imageUrl: String,
    scale: Number,
    opacity: Number,
    rotateDegree: Number
  }
});

mongoose.model("viz", vizSchema);