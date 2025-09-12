const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}); 
 
 




const varificationAuthMail = async (to, user, verifyLink) => {
  try {
    const subject = "✅ Verify Your Account - Vahan Solution";

    const html = `
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; padding: 25px; font-family: Arial, sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJ4xNxoi3anekgHh8yVl7q8UWlqfu9PE1DA&s" width="64" height="64" alt="secure" style="margin-bottom: 8px;" />
          <h1 style="font-size: 22px; color: #111827; margin: 0;">Welcome to Vahan Solution 🚀</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px; text-align: left; color: #374151; line-height: 1.6;">
          <h2 style="color: #111827; font-size: 20px; margin-bottom: 10px;">Hello ${user?.name},</h2>
          <p style="font-size: 15px; margin: 8px 0;">
            Thank you for signing up! To complete your registration, please verify your account by clicking the button below.
          </p>
          
      <div style="display: flex; justify-content: center; margin: 25px 0;">
  <a href="${verifyLink}" target="_blank" 
     style="background: #2563eb; 
            color: #fff; 
            text-decoration: none; 
            padding: 12px 24px; 
            border-radius: 8px; 
            font-size: 16px; 
            font-weight: bold; 
            display: inline-block;
            text-align: center;">
    ✅ Verify Account
  </a>
</div>

<p style="text-align: center; font-size: 14px; color: #555; margin-top: 10px;">
  If the button doesn’t work, copy and paste this link into your browser:<br>
  <a href="${verifyLink}" target="_blank" style="color: #2563eb; word-break: break-all;">
    ${verifyLink}
  </a>
</p>


          <p style="font-size: 14px; margin: 8px 0;">
            ⚠️ This link will expire in <strong>1 hour</strong>. If you did not create an account, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 15px; border-top: 1px solid #f0f0f0; text-align: center; color: #6b7280; font-size: 12px;">
          <p style="margin: 5px 0;">📧 support@vahansolution.com | 🌐 www.vahansolution.com</p>
          <p style="margin: 0;">© ${new Date().getFullYear()} Vahan Solution. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Vahan Solution" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📩 Stylish Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};




const forpass = async (email, otp) => {
 

  const mailOptions = {
    from: `"Vahan Solution" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your OTP for Password Reset",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};





module.exports = {forpass, varificationAuthMail };
