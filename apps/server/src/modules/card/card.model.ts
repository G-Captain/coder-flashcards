import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    problem: String,
    answer: {
      type: String,
      required: true,
    },
    category: String,
    removed: Boolean,
  },
  {
    collection: 'cards',
    timestamps: true,
    id: true,
  }
);

// cardSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

export default mongoose.model('Card', cardSchema);
