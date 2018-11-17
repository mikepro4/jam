const mongoose = require("mongoose");
const { Schema } = mongoose;
const VizSchema = require("./Viz");

const jamSchema = new Schema({
  defaultVizId: String,
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
    textPosition: String
  },
  userId: String,
  status: { type: String, default: "draft" },
	createdAt: { type: Date, default: Date.now },
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
