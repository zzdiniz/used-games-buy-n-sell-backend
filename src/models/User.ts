import conn from "../db/conn";
interface UserData {
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
}
class User {
  private userData: UserData;
  constructor(userData: UserData) {
    this.userData = userData;
  }
  public insert() {
    const query = `INSERT INTO User (name,email,password,image,phone) VALUES ('${this.userData.name}','${this.userData.email}','${this.userData.password}','${this.userData.image}','${this.userData.phone}')`;
    conn.query(query,(err)=>{
        if(err){
            console.error(`Error in User:${err}`)
        }
    })
  }
}
export default User;
