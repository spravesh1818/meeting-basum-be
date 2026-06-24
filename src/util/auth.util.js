import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(password) {
    console.log(password);
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

export function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}