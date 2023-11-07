import JudgesServices from "../services/judges.services.js";

/**
 * Función que retorna todos los jueces
 * @param {*} req 
 * @param {*} res 
 */
function getJudges(req, res) {
    JudgesServices.getJudges()
    .then((judges) => {
        return res.status(200).json(judges);
    })
    .catch((err) => {
        return res.status(500).json({
            msg: err.msg
        })
    })
}

/**
 * Función que retorna un juez en función de su ID
 * @param {*} req 
 * @param {*} res 
 */
function getJudgeById(req, res) {
    JudgesServices.getJudgeById(req.params.id)
    .then((judge) => {
        return res.status(200).json(judge);
    })
    .catch((err) => {
        return res.status(500).json({
            msg: err.msg
        })
    })
}

export default {
    getJudges,
    getJudgeById
}