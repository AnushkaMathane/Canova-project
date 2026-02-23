
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;


  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

 
  const otp = Math.floor(100000 + Math.random() * 900000).toString();


  const token = jwt.sign(
    { email: user.email, otp },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );


  await sendEmail(user.email, otp);

  return res.status(200).json({
    success: true,
    token,  
    message: "OTP sent",
  });
};