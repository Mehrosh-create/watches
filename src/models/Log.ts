// lib/db/models/Log.ts
import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  action: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ipAddress: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
})

export const Log = mongoose.models.Log || mongoose.model('Log', LogSchema)