import mongoose, {MongooseError} from "mongoose";
import { Team } from '../../types';
import teamModel from '../model/TeamsModel';

class TeamRepo {
    constructor() {
        mongoose.connect("mongodb+srv://lectr1c:" + process.env.MONGO_PASS + "@cluster0.0w2vvps.mongodb.net/?retryWrites=true&w=majority")
    }

    async getTeams() : Promise<Team[]> {
        return teamModel.find();
    }

    async createTeam(team : Team) : Promise<Team> {
        try {
            const TeamCr = await teamModel.create({
                name: team.name,
                points: team.points
            })
            console.log(TeamCr);
            return TeamCr;
        } catch (err: MongooseError | any) {
            console.log(err.message);
            return err;
        }
    }
}

export default TeamRepo;