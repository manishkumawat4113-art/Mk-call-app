require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const express=require("express")
const mongoose = require("mongoose");
const app=express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Failed:", error.message);
});
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("MK Account Backend Running");
});

app.post("/api/auth/register", (req, res) => {
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

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Account creation failed"
        });

    }

});

  /*  res.json({
        success: true,
        message: "Account data received",
        user: {
            name: name,
            email: email
        }
    });
});*/
