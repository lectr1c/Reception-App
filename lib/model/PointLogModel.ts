import mongoose, {Schema} from "mongoose"

const PointLog = new mongoose.Schema({
    id: Number,
    teamName: String,
    reason: String,
    points: Number,
    registeredAt: Date
})

const PointLogModel = mongoose.models.PointLog || mongoose.model("PointLog", PointLog);

export default PointLogModel;