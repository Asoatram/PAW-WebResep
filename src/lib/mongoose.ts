import  mongoose  from 'mongoose';

interface Connection {
    isConnected: boolean;
}
const connection:Connection = { isConnected: false}; // Create a global connection object

async function connectDB() {
    if (connection.isConnected) {
        return; // re-use the existing connection
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || '', {

    });

    connection.isConnected = db.connection.readyState === 1; // set isConnected to true if connected
}

export default connectDB;