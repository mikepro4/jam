const mongoose = require("mongoose");
const { Schema } = mongoose;

const jamSchema = new Schema({
  defaultViz: {
    shape: {
      rotateSpeed: { type: Number, default: 0.001},
      friction: { type: Number, default: 0.01},
      rotatePointSpeed: { type: Number, default: 0.01},
      step: { type: Number, default: 5},
      frequency: { type: Number, default: 0.0001},
      boldRate: { type: Number, default: 1},
      math: { type: String, default: "sin"},
    },
    point: {
      pointSize: { type: Number, default: 1.3},
      pointOpacity: { type: Number, default: 1},
      pointCount: { type: Number, default: 2048},
      pointColor: { type: String, default: "white"}
    },
    background: {
      colorEnabled: { type: Boolean, default: true},
      colorValue: { type: String, default: "000000"},
      colorOpacity: { type: Number, default: 1},
      gradientEnabled: { type: Boolean, default: false},
      gradientColorStops: [Object],
      gradientScale: { type: Number, default: 1},
      gradientRotateDegree: { type: Number, default: 0},
      gradientType: { type: String, default: "linear" }
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
  },
  likes: String,
  metadata: {
    albumCoverUrl: String,
    artistName: String,
    artistNameFontSize: Number,
    artistNameFontFamily: String,
    trackName: String,
    trackNameFontSize: Number,
    trackNameFontFamily: String,
    duration: Number,
    audioUrl: String,
    textColor: String,
    controlsColor: String,
    textPosition: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now }
  },
  status: { type: String, default: "draft" },
  vizKeyFramesTracks: [
    {
      title: String,
      desription: String,
      keyFrames: [
        {
          interval: { type: Boolean, default: false },
          timeStart: Number,
          timeEnd: Number,
          title: String,
          desription: String,
          vizStartParams: [Object],
          vizEndParams: [Object]
        }
      ]
    }
  ]
});

mongoose.model("jam", jamSchema);
