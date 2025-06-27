import mongoose from "mongoose";


// function to connect to the mongodb database

export const connectDB = async () => {
    try {
        {/*
            Hey Mongoose, whenever you're connected to MongoDB, run this callback function.”
            This is an event listener — like saying:
            “When the connection is successful, please log something or trigger some custom action.”
            This is the reaction. 
            
            for safety, put the .on(...) before .connect(...).
            This is an event listener.   
            But if Mongoose connects before you register the listener, your callback may miss the event.
         */}
        mongoose.connection.on('connected', () => console.log('Database Connected'))


        {/* Hey Mongoose, connect me to the MongoDB database using this URI.
        This is the actual command that:
        Initiates the connection
        Awaits until the connection is successful or fails
        It’s the action.*/}
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    }
    catch (error) {
        console.log(error)
    }
}