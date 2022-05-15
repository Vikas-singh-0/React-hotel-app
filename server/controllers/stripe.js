import User from "../modals/user";
import queryString from "query-string";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async (req, res) => {
  try {
    const u = await User.findById(req.auth._id);
    if (!u.stripe_account_id) {
      const account = await stripe.accounts.create({ type: "standard" });
      u.stripe_account_id = account.id;
      u.save();
    }
    let accountLink = await stripe.accountLinks.create({
      account: u.stripe_account_id,
      refresh_url: process.env.STRIPR_REDIRECT_URL,
      return_url: process.env.STRIPR_REDIRECT_URL,
      type: "account_onboarding",
    });

    accountLink = Object.assign(accountLink, {
      "strie_user[email]": u.email || undefined,
    });
    const link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    res.send(link);
  } catch (error) {
    console.log(error);
  }
};

export const getAccountStatus = async (req, res) => {
  try {
    // console.log("account status");
    const u = await User.findById(req.auth._id);
    // console.log("account stauseasdasd", u);
    const account = await stripe.accounts.retrieve(u.stripe_account_id);
    // console.log(req.auth);
    const updatedUser = await User.findByIdAndUpdate(
      req.auth._id,
      {
        stripe_seller: account,
      },
      {
        new:true
      },
    ).select('-password');
    console.log(updatedUser);
    return res.status(200).json({user:updatedUser})
  } catch (error) {
    console.log(error);
  }
};

export const getAccountBalance = async (req,res)=>{
  try {
    const u = await User.findById(req.auth._id);
    const balance = await stripe.balance.retrieve({
      stripeAccount:u.stripe_account_id
    })    
    return res.json({balance})
  } catch (error) {
    console.log(error);
  }

}
