const mongoose = require("mongoose");
const { Schema } = mongoose;

const vizSchema = new Schema({
  default: { type: Boolean, default: false },
  highlighted: { type: Boolean, default: false },
  authorId: String,
  name: String,
  description: String,
  status: { type: String, default: "draft" },
  shape: {
    rotateSpeed: { type: Number, default: 0.001},
    friction: { type: Number, default: 0.01},
    rotatePointSpeed: { type: Number, default: 0.01},
    step: { type: Number, default: 5},
    frequency: { type: Number, default: 0.0001},
    boldRate: { type: Number, default: 1},
    math: { type: String, default: "sin"},
    radius: Number
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
