// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import repository from "../../lib/repo/TeamRepo";
import TeamRepo from "../../lib/repo/TeamRepo";
import {Team} from "../../types";
import {useSession} from "next-auth/react";
import { getToken } from "next-auth/jwt"
import PointLogRepo from "../../lib/repo/PointLogRepo";
import Cors from 'cors';

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

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

  const session = await getToken({req, secret})
  const repo = new TeamRepo();  const pointsRepo = new PointLogRepo();


  if (req.method != "GET") {
    if (!session?.email?.endsWith("isflemingsberg.se")) {
      res.status(403).json({name: "Unauthorised"})
    }
  }

    return new Promise(resolve => {
        if (req.method == "POST") {
            repo.createTeam({
                name: req.body.name,
                points: 1
            }).then(r => {
                // @ts-ignore
                res.status(200).json({...r._doc});
            }).catch(err => {
                res.status(400);
            });
        }

        if (req.method == "GET") {
            repo.getTeams()
                .then(r => {
                    // @ts-ignore
                    res.status(200).json(r);
                })
                .catch(err => {
                    res.status(400).json({name: err.message})
                    console.log(err);
                })
        }

        if (req.method == "PUT") {
            // @ts-ignore
            pointsRepo.addPoints(req.body.teamName, req.body.pointsToAdd, req.body.reason)
                .then(r => {
                    console.log(r);

                    // @ts-ignore
                    res.status(200).json({points: (r.points + req.body.pointsToAdd)})
                })
                .catch(err => {
                    // @ts-ignore
                    res.status(400).json({error: err.message});
                })
        }

        return resolve;
    })
}
