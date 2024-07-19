import { Schema, model } from "mongoose";

const pinkBallotSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        href: 'user',
        required: [true, 'Votante es requerido.']
    },
    pinkTeam: {
        type: Schema.ObjectId,
        href: 'pinkTeam',
        required: [true, 'Equipo rosado seleccionado es requerido.']
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('pinkBallot', pinkBallotSchema);