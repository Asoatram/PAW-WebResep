import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    description: {
        type: String,
        minlength: 6,
        default: "I love sharing recipes",
    },

    profilePicture: {
        type: String, // URL to the profile picture
        default: 'defaultProfilePic.jpg',
    },
    savedRecipes: 
    {
        type: [Number], // Array untuk menyimpan ID resep
        required: true,
        default: ['0'],    // Inisialisasi sebagai array kosong // Bisa berupa ObjectId atau String
    },
}, {collection : 'Users'});

    userSchema.pre('save', async function(next) {
        if (this.isNew) { // Only assign user_id for new users
            const maxUser = await this.constructor.findOne().sort({ user_id: -1 });
            this.user_id = maxUser ? maxUser.user_id + 1 : 1; // Start from 1 if no users exist
        }
        next();
    });

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;