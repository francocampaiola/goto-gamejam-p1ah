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
async function judgeExist(req, res, id) {
  try {
    const judge = await JudgesServices.getJudgeById(id);
    return judge !== null;
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
}

export default {
  getJudgeById,
  judgeExist,
};

export { getJudgeById, judgeExist };
