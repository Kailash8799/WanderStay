import connectDb from "@/_db"
const secret = process.env.SECRET;

const handler = (req, res)=>{
    if(req.method === "POST" && req.body.secret===secret){
        res.status(200).json({ success:true,message:"Login Successfull" })
    }else{
        res.status(200).json({ success:false,message:"Some error accured" })
    }
}

export default connectDb(handler);