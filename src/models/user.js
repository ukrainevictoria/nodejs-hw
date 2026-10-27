import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.pre('save', function (next) {
  if (!this.username && this.email) {
    this.username = this.email;
  }
  next();
});

export const User = model('users', usersSchema);
