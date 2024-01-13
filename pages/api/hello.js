// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import connectDb from "@/_db"

const handler = (req, res)=>{
  res.status(200).json({ name: 'John Doe' })
}

// export default connectDb(handler);
// export default handler;