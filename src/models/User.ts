import conn from "../db/conn";
interface UserData {
  readonly id?:number
  name: string;
  email: string;
  password: string;
  image?: string;
  phone: string;
  readonly created_at?: Date
  readonly updated_at?: Date
}
class User {
  private userData: UserData;
  constructor(userData: UserData) {
    this.userData = userData;
  }
  public insert() {
    const query = `INSERT INTO Users (name,email,password,image,phone) VALUES ('${this.userData.name}','${this.userData.email}','${this.userData.password}','${this.userData.image}','${this.userData.phone}')`;
    conn.query(query,(err)=>{
        if(err){
            console.error(`Error in User:${err}`)
            return
        }
    })
  }
  public static async getUserByEmail(email: string): Promise<UserData | undefined> {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Users WHERE email='${email}'`;
        conn.query(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.length > 0 ? data[0] : undefined);
            }
        });
    });
}
}
export default User;
