import * as mongoose from 'mongoose'
 
// Interface for TS
export interface IImageModel extends mongoose.Document {
    filename: string; 
    originalName: string; 
    results: string;
    count: string;
    email: string;
    created: Date;
  };
 
  // Actual DB model
export var imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    results: String,
    email: String,
    count: String,
    created: { type: Date, default: Date.now }
});
 
export const predictedImage = mongoose.model('predictedImage', imageSchema);