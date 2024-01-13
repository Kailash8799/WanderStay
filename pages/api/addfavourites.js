import { prisma } from "../../libs/prismaclient";

const handler = async (req, res) => {
  try {
    if (req.method === "POST" && process.env.SECRET === req.body.secret) {
      const { email, listingid } = req.body;
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        res.status(401).json({ success: false, message: "Some error accured" });
        return;
      } else {
        if (!listingid || typeof listingid !== "string") {
          res.status(500).json({ success: false, message: "Invalid Id" });
          return;
        }
        let favIds = [...(user.favoriteIds || [])];
        if (!favIds.includes(listingid)) {
          favIds.push(listingid);
        }
        const usr = await prisma.user.update({
          where: { id: user?.id },
          data: { favoriteIds: favIds },
        });
        res.status(200).json({
          success: true,
          message: "Added to wishlists!",
        });
        return;
      }
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
