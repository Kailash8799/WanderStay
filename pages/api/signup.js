import bcrypt from 'bcrypt';
import { prisma } from '../../libs/prismaclient';

const handler = async(req, res)=>{
    if(req.method === "POST" && process.env.SECRET === req.body.secret){
        const {email,password} = req.body;
        const hashPassword = await bcrypt.hash(password,12);
        const user = await prisma.user.findUnique({where:{email:email}})
        if(user){
            res.status(401).json({success:false,message:"User already exist"})
            return;
        }
        else{
            const u = await prisma.user.create({
                data:{
                    email:email,
                    password:hashPassword
                }
            })
            console.log(u);
            res.status(200).json({success:true,message:"Your account has been created successfully"})
            return;
        }
    }
    else{
        res.status(500).json({success:false,message:"Some error accured"})
        return;
    }
}

export default handler;