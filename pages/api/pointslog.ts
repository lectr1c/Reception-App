// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import repository from "../../lib/repo/TeamRepo";
import TeamRepo from "../../lib/repo/TeamRepo";
import {Team} from "../../types";
import {useSession} from "next-auth/react";
import { getToken } from "next-auth/jwt"
import PointLogRepo from "../../lib/repo/PointLogRepo";
const Cors = require('cors');


// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD', 'PUT'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

type Data = {
    name: string
}

const secret = process.env.SECRET;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await runMiddleware(req, res, cors);
    const repo = new TeamRepo();
    const pointsRepo = new PointLogRepo();


    return new Promise(resolve => {

        if (req.method == "GET") {
            pointsRepo.getLog().then(r => {
                // @ts-ignore
                res.status(200).json(r);
            })
                .catch(err => {
                    res.status(400);
                });
        }
        return resolve;
    })

}