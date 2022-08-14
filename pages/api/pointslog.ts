// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import repository from "../../lib/repo/TeamRepo";
import TeamRepo from "../../lib/repo/TeamRepo";
import {Team} from "../../types";
import {useSession} from "next-auth/react";
import { getToken } from "next-auth/jwt"
import PointLogRepo from "../../lib/repo/PointLogRepo";

type Data = {
    name: string
}

const secret = process.env.SECRET;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const repo = new TeamRepo();
    const pointsRepo = new PointLogRepo();

    return new Promise(resolve => {

        if (req.method == "GET") {
            pointsRepo.getLog().then(r => {
                // @ts-ignore
                res.status(200).json({...r});
            })
                .catch(err => {
                    res.status(400);
                });
        }
        return resolve;
    })

}