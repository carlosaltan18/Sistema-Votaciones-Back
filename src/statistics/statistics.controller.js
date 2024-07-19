'use strict'

import WhiteBallot from './../whiteBallot/white-ballot.model.js';
import GreenBallot from './../greenBallot/green-ballot.model.js';
import GreenTeam from './../greenTeam/green-team.model.js';
import WhiteTeam from './../whiteTeam/white-team.model.js';

export const getPresidential = async (req, res) => {
    try {
        let statistics = await WhiteBallot.aggregate([
            {
                $group: {
                    _id: '$whiteTeam',
                    count: { $sum: 1 }
                }
            }
        ])

        let whiteTeams = await WhiteTeam.find().select('-candidates').populate({ path: 'partie', select: 'name colorHex acronym' });

        let whiteTeamsMap = {};
        whiteTeams.forEach(team => {
            whiteTeamsMap[team._id.toString()] = team;
        })

        let combinedStatistics = statistics.map(stat => ({
            whiteTeam: whiteTeamsMap[stat._id.toString()],
            count: stat.count
        }));

        return res.send({ combinedStatistics });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error al obtener estadística presidencial.` });
    }
}

export const getNationalList = async (req, res) => {
    try {
        // Realizar la agregación para obtener las estadísticas
        let statistics = await GreenBallot.aggregate([
            {
                $group: {
                    _id: '$greenTeam',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Obtener el año actual
        const currentYear = new Date().getFullYear();

        // Realizar la consulta de GreenTeam con la condición del año actual

        let greenTeams = await GreenTeam.find().select('-candidates').populate({ path: 'partie', select: 'name colorHex acronym' });

        let greenTeamsMap = {};
        greenTeams.forEach(team => {
            greenTeamsMap[team._id.toString()] = team;
        })

        let combinedStatistics = statistics.map(stat => ({
            greenTeam: greenTeamsMap[stat._id.toString()],
            count: stat.count
        }));

        //req.io.emit('estadisticaActualizada', "hola");
        return res.send({ combinedStatistics });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error al obtener estadistica diputados por lista nacional.` })
    }
}
