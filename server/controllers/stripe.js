import User from "../modals/user";
import queryString from "query-string";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Hotel from "../modals/hotel";
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


export const stripeSessionId = async (req, res) => {
  // console.log("you hit stripe session id", req.body.hotelId);
  // 1 get hotel id from req.body
  const { hotelId } = req.body;
  // 2 find the hotel based on hotel id from db
  const item = await Hotel.findById(hotelId).populate("postedBy").exec();
  console.log("posted by ****************",item);

  return res.json({success:true})

  // 3 20% charge as application fee
  const fee = (item.price * 20) / 100;
  // 4 create a session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // 5 purchasing item details, it will be shown to user on checkout
    line_items: [
      {
        name: item.title,
        amount: item.price * 100, // in cents
        currency: "usd",
        quantity: 1,
      },
    ],
    // 6 create payment intent with application fee and destination charge 80%
    payment_intent_data: {
      application_fee_amount: fee * 100,
      // this seller can see his balance in our frontend dashboard
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    // success and calcel urls
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  // 7 add this session object to user in the db
  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
  // 8 send session id as resposne to frontend
  res.send({
    sessionId: session.id,
  });
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
