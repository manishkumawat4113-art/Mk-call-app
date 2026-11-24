import mongoose from "mongoose"

export const connectedDb=async()=>{
       await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Connected Successfully");
        }) 
.catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);
    console.log("Error Code:", error.code);
})
}