import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

dotenv.config();
const app = express();
const router = express.Router();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all details!" });
  }
  try {
    await sendEmail({
      email: "deveshm049@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message: message,
      userEmail: email,
    });
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
