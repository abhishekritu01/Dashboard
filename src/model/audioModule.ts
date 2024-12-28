import mongoose from 'mongoose';

// Import the User model
import User from "./userModel";

const audioModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please tell us the title of the audio module!'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    audioUrl: {
        type: String,
        required: [true, 'Please provide an audio URL'],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // This creates a reference to the User model
        ref: 'User', // Reference to the User model
        required: true, // Make it required to associate an audio module with a user
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const AudioModule = mongoose.models.audioModule || mongoose.model('audioModule', audioModuleSchema);

export default AudioModule;
