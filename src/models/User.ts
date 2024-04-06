import { OkPacket } from "mysql";
import conn from "../db/conn";
interface EditableFields {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  phone?: string;
}
interface UserData {
  readonly id?: number;
  name: string;
  email: string;
  password: string;
  image?: string;
  phone: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}
class User {
  private userData: UserData;
  constructor(userData: UserData) {
    this.userData = userData;
  }

  public getId(): number {
    return this.userData.id;
  }

  public getName(): string {
    return this.userData.name;
  }

  public insert() {
    const query = `INSERT INTO Users (name,email,password,image,phone) VALUES ('${this.userData.name}','${this.userData.email}','${this.userData.password}','${this.userData.image}','${this.userData.phone}')`;
    conn.query(query, (err) => {
      if (err) {
        console.error(`Error in User:${err}`);
        return;
      }
    });
  }

  public static edit({
    id,
    name,
    email,
    password,
    image,
    phone,
  }: EditableFields): Promise<OkPacket> {
    const fieldsToUpdate = [
      name && `name = '${name}'`,
      email && `email = '${email}'`,
      password && `password = '${password}'`,
      image && `image = '${image}'`,
      phone && `phone = '${phone}'`,
    ].filter(Boolean);
    const query = `UPDATE Users SET ${fieldsToUpdate.join(
      ", "
    )} WHERE id = ${id}`;

    return new Promise((resolve, reject) => {
      conn.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public static async getUserByEmail(
    email: string
  ): Promise<UserData | undefined> {
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

  public static async getUserById(id: number): Promise<UserData | undefined> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Users WHERE id='${id}'`;
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
