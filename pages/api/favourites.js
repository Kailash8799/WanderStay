import { prisma } from '../../libs/prismaclient';

const handler = async(req, res)=>{
    if(req.method === "POST" && process.env.SECRET === req.body.secret){
        const {email} = req.body;
        const user = await prisma.user.findUnique({where:{email:email}})
        if(user){
            res.status(200).json({success:true,message:"Wishlist items",data:user?.favoriteIds})
            return;
        }
        else{
            res.status(401).json({success:false,message:"Some error accured"})
            return;
        }
    }
    else{
        res.status(500).json({success:false,message:"Some error accured"})
        return;
    }
}

export default handler;