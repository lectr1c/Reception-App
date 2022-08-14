import mongoose, {Schema} from "mongoose"

const teamSchema = new mongoose.Schema({
    name: String,
    points: Number
})

const teamModel = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default teamModel;