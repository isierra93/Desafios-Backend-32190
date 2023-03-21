import bcrypt from "bcryptjs";

export async function hashPassword (pw) {
    return await bcrypt.hash(pw, 8);
};

export async function unHashPassword (pw, hash){
    return await bcrypt.compare(pw,hash)
}

export default { hashPassword, unHashPassword}