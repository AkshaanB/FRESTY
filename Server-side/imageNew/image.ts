import * as mongoose from 'mongoose'
 
// Interface for TS
export interface IImageModel extends mongoose.Document {
    filename: string; 
    originalName: string; 
    created: Date;
    email: string;
  };
 
  // Actual DB model
export var imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    email: String,
    created: { type: Date, default: Date.now }
});
 
export const Image = mongoose.model<IImageModel>('Image', imageSchema);