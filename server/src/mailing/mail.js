import nodemailer from 'nodemailer';
const Sendmail = async (mailto, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.exponusmedia.com',
      port: 465,
      secure: true,
      auth: {
        user: 'test@exponusmedia.com',
        pass: 'Abhi@1708967',
      },
    });

    const maildata = `
  <p>WELCOME TO Alzebra</p>
    <h3>Your otp details</h3>
    <ul>
        
        <li>email: ${mailto}</li>
        <li>otp is: ${otp}</li>
    </ul>
`;
    let info = await transporter.sendMail({
      from: '"Alzebra" test@exponusmedia.com', // sender address
      to: mailto, // list of receivers
      subject: 'Your otp Details', // Subject line
      text: 'Hello world?', // plain text body
      html: maildata, // html body
    });

    console.log('Message sent: ' + mailto, info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

// Sendmail();
export default Sendmail;
