const UserModel = require("../models/users");
const CreateError = require("http-errors");
const { passwordHash } = require("../utils/bcrypt");
const genAuthToken = require("../utils/genAuthToken");
const convertToInteger = require("../utils/convertToInteger");
const nodemailer = require("nodemailer");
const generateRandomToken = require("../utils/randomToken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEJS_GMAIL_APP_USER,
    pass: process.env.NODEJS_GMAIL_APP_PASSWORD,
  },
});

exports.register = async (req, res, next) => {
  try {
    // destructure req body
    const { email, password, is_admin, username } = req.body;
    const trimmedUser = username.replace(/\s/g, "");

    // Check if Admin user already exists
    const user = await UserModel.readByUsername(trimmedUser);
    if (user) throw CreateError(400, `User With Username already exists`);

    // Hash password with bcrypt password
    const hashedPassword = await passwordHash(password, 10);

    // Make sure isAdmin is an integer
    const isAdminInteger = convertToInteger(is_admin);

    // Create a Admin user
    const newUser = await UserModel.create(
      trimmedUser,
      hashedPassword,
      email,
      isAdminInteger
    );

    // Generate and Send JWT Token to Frontend
    const token = genAuthToken(newUser);
    res.send(token);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res) => {
  // If user is logged in update last login and send jwt token
  if (req.user) {
    await UserModel.updateLastLogin(req.user.id);
    const token = genAuthToken(req.user);
    res.status(200).send(token);
  }
};

exports.forgot = async (req, res, next) => {
  const RandomToken = generateRandomToken(20);
  const { username } = req.body;
  try {
    // Check if Admin user doesn't exists
    if (!username) throw CreateError(400, `Username must be provided`);
    const user = await UserModel.readByUsername(username);
    if (!user) throw CreateError(400, `User doesn't exists`);

    // Generate Random Token
    const token = await UserModel.createToken(user.id, RandomToken);

    // Set up email to validate User with Token
    const resetEmail = {
      to: user.email,
      from: "tylertooxclusive@gmail.com",
      subject: "Node.js Password Reset",
      text: `
      You are receiving this because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process:
      http://${req.headers.host}/auth/reset/${token.token_value}
      If you did not request this, please ignore this email and your password will remain unchanged.
    `,
    };

    // Send email to admin user
    const mail = await transporter.sendMail(resetEmail);

    // if email was sent successfully send response to UI
    if (mail.accepted) {
      res.send(
        `An e-mail has been sent to ${user.email} with further instructions.`
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.reset = async (req, res, next) => {
  try {
    // Validate the token
    const token = req.params.token;
    const userToken = await UserModel.readToken(token);
    if (!userToken) throw CreateError(400, `Token has expired`);

    // Delete Expired Tokens
    await UserModel.deleteToken(userToken.user_id);

    // Get user data from Token
    const user = await UserModel.readById(userToken.user_id);

    // Hash Password
    const hashedPassword = await passwordHash(req.body.password, 10);

    // Update password in the database
    await UserModel.updatePassword(user.id, hashedPassword);

    // Send a mail on password reset
    const resetEmail = {
      to: user.email,
      from: "tylertooxclusive@gmail.com",
      subject: "Your password has been changed",
      text: `
        This is a confirmation that the password for your account "${user.email}" has just been changed.
      `,
    };
    await transporter.sendMail(resetEmail);
    res.status(201).send("Password has been updated");
  } catch (error) {
    next(error);
  }
};
