import { prisma } from "../../libs/prismaclient";

const handler = async (req, res) => {
  try {
    if (req.method === "POST" && process.env.SECRET === req.body.secret) {
    const reserv = await prisma.reservation.delete({where:{id:req.body.reservid}})
      res.status(200).json({
        success: true,
        message: "Reservation canceled!",
      });
      return;
    } else {
      res.status(500).json({ success: false, message: "Some error accured 😂" });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Some error accured 😊" });
    return;
  }
};

export default handler;
