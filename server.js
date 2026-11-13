const express=require("express")
const app=express()
app.use(express.json())
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
    res.json({
        success: true,
        message: "Account data received",
        user: {
            name: name,
            email: email
        }
    });
});
