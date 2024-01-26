const UserModel = require("../models/users");
const CreateError = require("http-errors");
const { passwordHash } = require("../utils/bcrypt");
const genAuthToken = require("../utils/genAuthToken");
const convertToInteger = require("../utils/convertToInteger");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const generateRandomToken = require("../utils/randomToken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEJS_GMAIL_APP_USER,
    pass: process.env.NODEJS_GMAIL_APP_PASSWORD,
  },
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "PASSWORD RESET",
    link: "https://mailgen.js/",
  },
});

exports.register = async (req, res, next) => {
  try {
    // destructure req body
    const { email, password, is_admin, username } = req.body;
    const trimmedUser = username.replace(/\s/g, "");
    // Check if user already exists
    const user = await UserModel.readByUsername(trimmedUser);
    if (user) throw CreateError(400, `User With Username already exists`);

    // Check if email already exists
    const userEmail = await UserModel.readByEmail(email);
    if (userEmail) throw CreateError(400, `User With Email already exists`);

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
    res.cookie("auth", req.session.cookie);
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
    let response = {
      body: {
        name: user.username,
        intro: `
        You are receiving this because you (or someone else) have
        requested the reset of the password for your account.
        If you did not request this, please ignore this email
        and your password will remain unchanged.`,
        action: {
          instructions:
            "Please click on the following link, or paste this into your browser to complete the process:",
          button: {
            color: "#22BC66",
            text: "CLICK TO RESET PASSWORD",
            link: `http://localhost:3000/reset/${token.token_value}`,
          },
        },
      },
    };
    let mail = MailGenerator.generate(response);
    // Email content
    let message = {
      from: "tylertooxclusive@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "Thank you for Coming on Board", // Subject line
      attachDataUrls: true,
      html: mail, // html body
    };

    // Send email to admin user
    await transporter.sendMail(message);

    // if email was sent successfully send response to UI
    res.status(200).send(token.token_value);
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
    let response = {
      body: {
        name: user.username,
        intro: `
         This is a confirmation that the password for your account
         "${user.email}" has just been changed.`,
      },
    };
    let mail = MailGenerator.generate(response);
    // Email content
    let message = {
      from: "tylertooxclusive@gmail.com",
      to: user.email,
      subject: "Password has been updated and read to use",
      attachDataUrls: true,
      html: mail,
    };

    // Send email to user
    await transporter.sendMail(message);
    res.status(201).send("Password has been updated");
  } catch (error) {
    next(error);
  }
};
