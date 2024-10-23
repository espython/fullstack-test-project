import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

class UserSchema extends Schema {
  constructor() {
    super(
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
      },
      {
        timestamps: true,
      },
    );
  }
}

const User = model<IUser>('User;', new UserSchema());

export default User;
