import { prisma } from "../../libs/prismaclient";

const handler = async (req, res) => {
  try {
    if (req.method === "POST" && process.env.SECRET === req.body.secret) {
      const {
        category,
        country,
        bathrooms,
        guests,
        rooms,
        roomprice,
        startdate,
        enddate,
      } = req.body;
      let query = {};
      if(category){
        query.category = category
      }
      if(rooms){
        query.roomCount = {
          gte: +rooms
        }
      }
      if(guests){
        query.guestCount = {
          gte: +guests
        }
      }
      if(bathrooms){
        query.bathroomCount = {
          gte: +bathrooms
        }
      }
      if(roomprice){
        query.price = {
          gte: +roomprice
        }
      }
      if(country){
        query.locationValue=country
      }
      if(startdate && enddate){
        query.NOT = {
          reservation:{
            some:{
              OR:[
                {
                  enddate:{gte:startdate},
                  startDate:{lte:startdate}
                },
                {
                  enddate:{gte:enddate},
                  startDate:{lte:enddate}
                }
              ]
            }
          }
          
        }
      }
      const listings = await prisma.listing.findMany({
        where: query,
        orderBy: { createdAt: "desc" },
      });
      console.log(listings)
      res.status(200).json({
        success: true,
        data: listings,
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
