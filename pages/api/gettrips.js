import { prisma } from '../../libs/prismaclient';

const handler = async(req, res)=>{
    if(req.method === "POST" && process.env.SECRET === req.body.secret){
        const {email} = req.body;
        const user = await prisma.user.findUnique({where:{email:email}})
        if(user){
            const reservation = await prisma.reservation.findMany({where:{userId:user?.id}})
            res.status(200).json({success:true,message:"Wishlist items",reservation})
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