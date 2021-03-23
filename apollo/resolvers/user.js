const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validateRegisterInput");

const generateToken = (res) =>
  jwt.sign(
    {
      id: res.id,
      email: res.email,
      username: res.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, passwordConfirm } }
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        passwordConfirm
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const userExist = await User.findOne({ email });
      if (userExist)
        throw new UserInputError("User Already Exist", {
          errors: { email: "This email is already Register" },
        });

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password,
        username,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    login: async (_, { loginInput: { email, password } }) => {
      const user = await User.findOne({ email });

      if (!user)
        throw new UserInputError("This user not Exists", {
          errors: { email: "This User not Exist" },
        });

      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const match = bcrypt.compareSync(password, user.password);
      console.log(match);

      if (!match)
        throw new UserInputError("Bad Credentials", {
          errors: { email: "Wrong username or password" },
        });

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
