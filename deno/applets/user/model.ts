import { DataTypes, Model } from "https://deno.land/x/denodb@v1.0.9/mod.ts";


class User extends Model {
  static table = 'users';
  static timestamps = true;
  static fields = {
    _id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  };
}


export default User;




