const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL);
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// app.post("/api/form", async (req, res) => {
//   try {
//     const payload = JSON.stringify(req.body);
//     const response = await axios.post(
//       process.env.GOOGLE_SCRIPT,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ success: true, googleData: response.data });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to call Google Script" });
//   }
// });

app.post("/api/form", async (req, res) => {
  try {
    const { id, domain } = req.body; 

    let scriptUrl;
    if (domain === "web") {
      scriptUrl = process.env.WEB_GOOGLE_SCRIPT;
    } else if (domain === "cp") {
      scriptUrl = process.env.CP_GOOGLE_SCRIPT;
    } else {
      scriptUrl = process.env.AIDS_GOOGLE_SCRIPT;
    }

    const payload = JSON.stringify(req.body); 

    const response = await axios.post(scriptUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", email);

  try {
     const users = await sql`
     SELECT * FROM users WHERE email = ${email} AND password = ${password}`;

     if(users.length>0){
      res.json({ success: true, user: users[0] });
     } else{
      res.status(401).json({ success: false, message: "Invalid credentials" });
     }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
