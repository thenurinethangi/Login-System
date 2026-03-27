import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE'
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  fullName: string
  email: string
  password?: string
  method: 'email-password' | 'google'
  roles: Role[]
  status: Status
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  method: { type: String, enum: ['email-password', 'google'], required: true },
  roles: { type: [String], enum: Object.values(Role), default: [Role.USER] },
  status: { type: String, enum: Object.values(Status), default: Status.ACTIVE }
},
{
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);
