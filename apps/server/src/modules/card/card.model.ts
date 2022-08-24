import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    removed: Boolean,
    category: String,
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
