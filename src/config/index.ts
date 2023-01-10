import mongoose from 'mongoose';
import 'dotenv/config'
async function dbConnect(): Promise<void> {
  try {
    const dbAccess= <string> process.env.DB_ACCESS;
    await mongoose.connect(dbAccess);

  } catch (error) {
    
    console.log(error);
    process.exit(1)

  }
}
export { dbConnect };