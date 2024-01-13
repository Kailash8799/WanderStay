import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../libs/prismaclient";

export async function getSession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try {
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }
        const currentuser = await prisma.user.findUnique({
            where:{
                email:session?.user?.email
            }
        })
        if(!currentuser){
            return null;
        }
        return currentuser;
    } catch (error) {
        return null
    }
}