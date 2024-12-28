import mongoose from 'mongoose';

// Import the User model
import User from './userModel';

const pdfModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please tell us the title of the PDF module!'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    pdfUrl: {
        type: String,
        required: [true, 'Please provide a PDF URL'],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // This creates a reference to the User model
        ref: 'User', // Reference to the User model
        required: true, // Make it required to associate a PDF module with a user
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const PdfModule = mongoose.models.pdfModule || mongoose.model('pdfModule', pdfModuleSchema);

export default PdfModule;
