import mongoose from 'mongoose';

export const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected');
    } catch (e) {
        console.log({ "Mongo connection failed": e });
    };
};