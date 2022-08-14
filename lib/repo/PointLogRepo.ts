import PointLogModel from "../model/PointLogModel";
import mongoose, {MongooseError} from "mongoose";
import {Team, TPointsLog} from '../../types';
import teamModel from "../model/TeamsModel";

class PointLogRepo {
    constructor() {
        mongoose.connect("mongodb+srv://lectr1c:" + process.env.MONGO_PASS + "@cluster0.0w2vvps.mongodb.net/?retryWrites=true&w=majority")
    }

    async addPoints(teamName: string, pointsToAdd: number, reason: string) : Promise<Team>{
        try {
            const team = await teamModel.findOne({name: teamName});
            const doc = await teamModel.updateOne({name: teamName}, {points: team.points + pointsToAdd});

            await PointLogModel.create({
                teamName: teamName,
                reason: reason,
                points: pointsToAdd,
                registeredAt: new Date()
            })
            return team;
        } catch (e : MongooseError | any) {
            return e;
        }
    }
}

export default PointLogRepo