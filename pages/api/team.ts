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
