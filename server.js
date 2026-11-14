require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const express=require("express")
const mongoose = require("mongoose");
const app=express()
app.use(express.json())

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
        console.log(`MK Account Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB Connection Failed");

    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);
    console.log("Error Code:", error.code);
});

/*mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Failed:", error.message);
});
app.use(express.urlencoded({ extended: true }));*/
app.get("/", (req, res) => {
  res.send("MK Account Backend Running");
});

app.post("/api/auth/register", async (req, res) => {
    try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
          message: "Please fill all fields"
        });
    }
  
// Check existing email
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

 if (password.length < 8) {
    return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
    });
}
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
  // Create new user
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        // Save in MongoDB
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "Account created successfully"
        });

    }  catch (error) {

    console.log("ACCOUNT CREATION ERROR");
    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);
    console.log("Error Code:", error.code);

    res.status(500).json({
        success: false,
        message: "Account creation failed",
        error: error.message
    });

}

});

// ===================================
// START SERVER
// ===================================

/*const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`MK Account Server running on port ${PORT}`);
});*/

  /*  res.json({
        success: true,
        message: "Account data received",
        user: {
            name: name,
            email: email
        }
    });
});*/
