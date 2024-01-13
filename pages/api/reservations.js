import { prisma } from "../libs/prismaclient";

const handler = async (req, res) => {
  try {
    if (req.method === "POST" && process.env.SECRET === req.body.secret) {
      const { totalprice, id, uid, startDate, endDate, email } = req.body;
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        res.status(401).json({ success: false, message: "Some error accured" });
        return;
      } else {
        const reservandupdate = await prisma.listing.update({
          where: { id: id },
          data: {
            reservations: {
              create: {
                userId: user?.id,
                startDate: startDate,
                enddate: endDate,
                totalprice: totalprice,
              },
            },
          },
        });
        res.status(200).json({
          success: true,
          message: "Reservation Added!",
        });
        return;
      }
    } else {
      res.status(500).json({ success: false, message: "Some error accured" });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Some error accured 😂" });
    return;
  }
};

export default handler;
