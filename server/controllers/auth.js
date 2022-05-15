import User from "../modals/user";
import jwt from "jsonwebtoken";
import user from "../modals/user";
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res.status(400).json({
      message: "Password is required and should be min 6 characters long",
    });
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).json({ message: "Email is taken" });
  // register
  const user = new User(req.body);
  try {
    await user.save();
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // validation
  try {
    if (!password || password.length < 6)
      return res.status(400).json({
        message: "Password is required and should be min 6 characters long",
      });
    let userExist = await User.findOne({ email }).exec();
    if (!userExist) {
      return res.json({
        success: false,
        message: "user does not exist",
      });
    }
    // login
    userExist.matchPassword(password, (err, match) => {
      if (!match || err) {
        return res.json({ success: false, message: "cred wrong" });
      }
      let token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({
        token: token,
        user: {
          name: userExist.name,
          email: userExist.email,
          _id: userExist._id,
          stripe_account_id: userExist.stripe_account_id,
          stripe_seller: userExist.stripe_seller,
          stripeSession: userExist.strip_stripeSession,
        },
      });
    });
  } catch (err) {
    console.log("CREATE USER FAILED", err.message);
    return res.status(400).send("Error. Try again.");
  }
};
