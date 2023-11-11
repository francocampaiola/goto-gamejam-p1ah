import JudgesServices from "../services/judges.services.js";

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
        msg: err.msg,
      });
    });
}

/**
 * Función que verifica si un juez existe.
 * @param {*} req
 * @param {*} res
 */
async function judgeExist(req, res) {
  JudgesServices.getJudgeById(req.body.id_judge)
    .then((judge) => {
      if (judge) {
        return res.status(200).json(judge);
      } else {
        return res.status(400).json({
          msg: "El juez indicado no existe.",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

export default {
  getJudgeById,
  judgeExist,
};

export { getJudgeById, judgeExist };
