import { prisma } from "../../libs/prismaclient";

const handler = async (req, res) => {
  if (req.method === "POST" && process.env.SECRET === req.body.secret) {
    const { id } = req.body;
    const user = await prisma.user.findUnique({where:{id}})
    if (user) {
      let data = {id:user?.id,image:user?.image,name:user?.name,date:user?.createdAt.toISOString()}
      res.status(200).json({ success: true, message: "Success",data});
      return;
    } else {
      res.status(401).json({ success: false, message: "Some error accured" });
      return;
    }
  } else {
    res.status(500).json({ success: false, message: "Some error accured" });
    return;
  }
};

export default handler;
