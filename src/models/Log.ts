// lib/models/Log.ts
import { Schema, model, Document } from 'mongoose';

interface ILog extends Document {
  action: string;
  user: Schema.Types.ObjectId;
  details: object;
  createdAt: Date;
}

const logSchema = new Schema<ILog>({
  action: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  details: { type: Object },
}, { timestamps: true });

// Proper default export
const Log = model<ILog>('Log', logSchema);
export default Log;