import mongoose from 'mongoose';

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'library';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

const connectToDB = async () => {
  await mongoose.connect(HostDb, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;
  db.on('open', () => console.log('Connected to mongodb'));
};

export default connectToDB;
