const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JwtSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

const signup = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user !== null) {
    throw new Error("Email already exist", 422);
  }
  user = new User(data);
  const token = JWT.sign({ id: user._id }, JwtSecret);
  await user.save();

  return (data = {
    userId: user._id,
    email: user.email,
    name: user.username,
    token: token,
  });
};

const login = async (data) => {
  const user = await User.findOne({ username: data.username });
  if (user) {
    const auth = await bcrypt.compare( data.password, user.password);
    if(auth){
      const token = JWT.sign({ id: user._id }, JwtSecret);
      return (data = {
        email : user.email,
        name : user.username,
        token : token,
      });
      
    }
    throw new Error("Incorrect Password ");
  }
  throw new Error("user does not exist", 422);
};

module.exports = { signup, login };
