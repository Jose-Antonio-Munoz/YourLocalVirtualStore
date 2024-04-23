const bcrypt=require('bcryptjs')
const userRepository=require('../repository/userRepository');
const { duplicateError } = require('../utils/duplicateError');
 
exports.createOneWorkerUser = async (req, res) => {
  try {
    const { usuario, name, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      usuario: usuario,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      created: new Date().toISOString(),
      role: "worker",
    };
    await userRepository.createUser(newUser);
    res
      .status(201)
      .json({
        message: `el usuario ${newUser.usuario} con el correo ${newUser.email} ha sido registrado satisfactoriamente`,
      });
  } catch (err) {
    const status=duplicateError(err)
    res.status(status.code).json(status.message)
  }
};
exports.getAllWorkerUser = async (req, res) => {
  try {
    const page=req.query.page||1
    const limit=req.query.limit||10
    const workers = await userRepository.getAllUsers({ role: "worker" },page,limit);
    res.status(200).json(workers);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: err, message: "internal server error" });
  }
};
exports.deleteOneWorkerUser = async (req, res) => {
  try {
    const { email, usuario } = req.body;
    const userToDelete = await userRepository.deleteUser(email, usuario);
    if (!userToDelete) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: err, message: "internal server error" });
  }
};