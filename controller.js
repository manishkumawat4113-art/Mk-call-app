import User from "./models/User.js"
import bcrypt from "bcryptjs"

export const mk=(req, res) => {
  res.send("MK Account Backend Running");
}

export const signup=async (req, res) => {
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
    console.log("Error Code:", error.code)
    res.status(500).json({
        success: false,
        message: "Account creation failed",
        error: error.message
    });
}
}

export const login= async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Email se user find karo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Account nahi mila"
      });
    }
    // 2. Password verify karo
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }
    // 3. Login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

export const profiledata=async (req,res) =>{
    try{
        const {id}=req.params
        const mk=await User.findOne({_id:id}).select("name email");

        if (!mk) {
      return res.status(404).json({
        message: "current user nahi mila"
      });
    }
        res.json({message:"fetching",mk})
    }catch(error){
        res.json({message:error.message})
    }
}

