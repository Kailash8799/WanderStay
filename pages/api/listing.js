import { prisma } from "../../libs/prismaclient";

const handler = async (req, res) => {
  try {
    if (req.method === "POST" && process.env.SECRET === req.body.secret) {
      const {
        selectedcategory,
        selectedCountry,
        totalguests,
        totalbathrooms,
        totalrooms,
        images,
        titledesc,
        desc,
        roomprice,
        email,
      } = req.body;
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        res.status(401).json({ success: false, message: "Some error accured" });
        return;
      } else {
        const data =  {
          title: titledesc,
          description: desc,
          imageSrc: images,
          category: selectedcategory,
          roomCount: parseInt(totalrooms),
          bathroomCount: parseInt(totalbathrooms),
          guestCount: parseInt(totalguests),
          locationValue: selectedCountry?.value,
          price: parseInt(roomprice),
          userId: user?.id,
        }
        const listing = await prisma.listing.create({
          data: data
        });
        res.status(200).json({
          success: true,
          message: "Listing Created!",
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
