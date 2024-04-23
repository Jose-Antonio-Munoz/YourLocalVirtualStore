const userRepository = require("../repository/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { transporter } = require("../configuration/nodeMailerConfiguration");
const { generateResetToken } = require("../utils/tokenGenerator");
const tokenRepository = require("../repository/recoveryTokenRepository");
const { duplicateError } = require("../utils/duplicateError");

exports.createOneUser = async (req, res) => {
  try {
    const { usuario, name, email, phoneNumber, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      usuario: usuario,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      created: new Date().toISOString(),
      address: address,
    };
    await userRepository.createUser(newUser);
    res.status(201).json({
      message: `the user ${newUser.usuario} with the email ${newUser.email} has been successfully registered`,
    });
  } catch (err) {
    const status = duplicateError(err);
    res.status(status.code).json(status.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const jwtSecret = process.env.JWTSECRET;
    const { email, password } = req.body;
    const user = await userRepository.getUser({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        error: "The data does not match any registered user",
      });
    }
    const maxAge = 3600;
    const token = jwt.sign(
      { id: user._id, usuario: user.usuario, role: user.role },
      jwtSecret,
      { expiresIn: maxAge }
    );
    res
      .status(201)
      .json({ message: "Successful login", user_id: user._id, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.forgottenPassword = async (req, res) => {
  const email = req.body.email;

  const user = await userRepository.getUser({ email });
  if (!user) {
    return res.status(400).json({ messasge: "Invalid email" });
  }
  const userId = user._id;
  const token = generateResetToken();
  const expirationTime = new Date(Date.now() + 3600000); // 1 hour from now

  const recoveryToken = {
    userId: userId,
    token: token,
    expiresAt: expirationTime,
  };
  tokenRepository.saveToken(recoveryToken);

  const resetLink = `http:localhost:3000//user/reset-password/`;

  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "password recovery",
    text: `Click the following link to reset your password: ${resetLink} with the token:${recoveryToken.token}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log("Email sent:", info.response);
  });
  console.log("Email sent:");
  res.status(200).json({
    message:
      "The information for password recovery has been sent to the email provided",
  });
};
exports.recoveryPassword = async (req, res) => {
  try {
    const { email, userToken, newPassword } = req.body;
    let token = { token: userToken, expiresAt: { $gt: new Date() } };
    token = await tokenRepository.findTokenAndUserRelated(token);
    if (!token) {
      return res.status(404).json({ message: " error invalid token" });
    }
    if (token.userId.email != email) {
      return res.status(404).json({ message: "error invalid email" });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await userRepository.updatePassword(token.userId._id, {
      password: newHashedPassword,
    });
    await tokenRepository.deleteToken(token._id);
    res.status(200).json({
      message: `The password of user ${user.usuario} has been successfully changed`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.updateUserPassword = async (req, res) => {
  try {
    const id = req.body.id;
    const oldPassword = req.body.oldPassword;
    let user = await userRepository.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({
        error:
        "Unauthorized, the password provided does not match your current password",
      });
    }

    const password = req.body.newPassword;
    const newPassword = await bcrypt.hash(password, 10);
    user.password = newPassword;
    user = await userRepository.updateUser(user);
    res.status(200).json({
      message: `the password of the user ${user.usuario} was changed `,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
};
exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRepository.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: err, message: "internal server error" });
  }
};
exports.modifyAddress = async (req, res) => {
  try {
    const address = req.body.address;
    const user = await userRepository.getUserById(req.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.address = address;
    await userRepository.updateUser(user);
    res.status(200).json({ message: `changes apply to user ${user.usuario}` });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: err, message: "internal server error" });
  }
};
exports.holamundo = async (req, res) => {
  console.log(req.file);
  res.status(200).json("hola mundo");
};
