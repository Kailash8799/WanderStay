import { prisma } from "../../libs/prismaclient";

const handler = async (req, res) => {
  try {
    if (req.method === "POST" && process.env.SECRET === req.body.secret) {
      const listings = await prisma.listing.findUnique({where:{id:req.body.id}})
      res.status(200).json({
        success: true,
        data:listings
      });
      return;
    } else {
      res.status(500).json({ success: false, message: "Some error accured" });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Some error accured" });
    return;
  }
};

export default handler;
