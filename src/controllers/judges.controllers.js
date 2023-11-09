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
        msg: err.msg,
      });
    });
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
        msg: err.msg,
      });
    });
}

/**
 * 
 *     id_judge: yup.string(stringError).required(requiredError),
    name_judge: yup.string(stringError).required(requiredError),
    id_game: yup.string(stringError).required(requiredError),
    name_game: yup.string(stringError).required(requiredError),
    gameplay: yup.number().integer(integerError).min(1, minNumberError).max(10, maxNumberError).required(requiredError),
    art: yup.number().integer(integerError).min(1, minNumberError).max(10, maxNumberError).required(requiredError),
    sound: yup.number().integer(integerError).min(1, minNumberError).max(10, maxNumberError).required(requiredError),
    affinity: yup.number().integer(integerError).min(1, minNumberError).max(10, maxNumberError).required(requiredError)
 */

function generateVote(req, res) {
  const vote = {
    id_judge: req.body.id_judge,
    name_judge: req.body.name_judge,
    id_game: req.body.id_game,
    name_game: req.body.name_game,
    gameplay: req.body.gameplay,
    art: req.body.art,
    sound: req.body.sound,
    affinity: req.body.affinity,
  };

  JudgesServices.generateVote(vote).then((generatedVote) => {
    const totalScore =
      req.body.gameplay + req.body.art + req.body.sound + req.body.affinity;

    const idGame = req.body.id_game;
    
  });
}

export default {
  getJudges,
  getJudgeById,
};
