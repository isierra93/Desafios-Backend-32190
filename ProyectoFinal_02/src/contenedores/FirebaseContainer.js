import fs from "fs";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(fs.readFileSync("./src/config/Firebase.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

class FirebaseContainer {
    constructor(collection) {
        this.db = admin.firestore();
        this.query = this.db.collection(collection);
    };

    async getAll() {
        try {
            const res = [];
            let data = await this.query.get();
            data.forEach(element => {
                res.push(element.data());
            });
            return res;
        } catch (err) {
            throw new Error(err);
        };
    };
    async getById(id){
        try{
            const data = await this.query.doc(id).get();
            const res = data.data();
            return res;
        }catch(err){
            throw new Error (err);
        };
    };
    async addProd(obj){
        try{
            let res = await this.query.add(obj);
            obj.id = res.id;
            return obj;
        }catch(err){
            throw new Error (err);
        };
    };
    async updateProd(id, obj){
        try{
            const res = await this.query.doc(id).update(obj);
            return res;
        }catch(err){
            throw new Error (err);
        };
    };
    async deleteById(id){
        try{
            const res = await this.query.doc(id).delete();
            return res;
        }catch(err){
            throw new Error (err);
        };
    };
};

export default FirebaseContainer;