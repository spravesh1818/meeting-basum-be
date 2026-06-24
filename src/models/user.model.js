import connectToDB from '../config/db.js';
import userSchema from '../schema/user.schema.js';

const conn = connectToDB();
const userModel = conn.model('user', userSchema);

export default userModel;