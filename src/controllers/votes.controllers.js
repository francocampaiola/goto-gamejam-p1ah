import VotesServices from "../services/votes.services.js";
import GamesControllers from "../services/games.services.js";

/**
 * Función que obtiene todos los votos que recibió un juego a partir de su ID.
 * @param {*} req
 * @param {*} res
 */
function getVotesByGame(req, res) {
  VotesServices.getVotesByGame(req.params.id)
    .then((votes) => {
      return res.status(200).json(votes);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que obtiene todos los votos que realizó un juez a partir de su ID.
 * @param {*} req
 * @param {*} res
 */
function getVotesByJudge(req, res) {
  VotesServices.getVotesByJudge(req.params.id)
    .then((votes) => {
      return res.status(200).json(votes);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que obtiene el promedio de los votos que recibió un juego a partir de su ID.
 * @param {*} req 
 * @param {*} res 
 */
function getAverageByGame(req, res) {
  VotesServices.getVotesByGame(req.params.id)
    .then((votes) => {
      let gameplay = votes.map((vote) => vote.gameplay);
      let art = votes.map((vote) => vote.art);
      let sound = votes.map((vote) => vote.sound);
      let affinity = votes.map((vote) => vote.affinity);

      let gameplayAverage = gameplay.reduce((a, b) => a + b, 0) / gameplay.length;
      let artAverage = art.reduce((a, b) => a + b, 0) / art.length;
      let soundAverage = sound.reduce((a, b) => a + b, 0) / sound.length;
      let affinityAverage = affinity.reduce((a, b) => a + b, 0) / affinity.length;

      GamesControllers.getGameById(req.params.id)
        .then((game) => {
          const completeGame = {
            game_id: req.params.id,
            game_name: game.game_name,
            genre: game.genre,
            members: game.members,
            edition: game.edition,
            gameplayAverage: gameplayAverage,
            artAverage: artAverage,
            soundAverage: soundAverage,
            affinityAverage: affinityAverage,
          };

          res.status(200).json(completeGame);
        })
        .catch((err) => {
          return res.status(500).json({
            msg: err.msg,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que agrega un voto. Si lo consigue, lo retorna, de lo contrario, retorna un mensaje de error.
 * @param {*} req
 * @param {*} res
 */
function createVote(req, res) {
  const voteData = {
    id_judge: req.body.id_judge,
    id_game: req.body.id_game,
    gameplay: req.body.gameplay,
    art: req.body.art,
    sound: req.body.sound,
    affinity: req.body.affinity,
  };

  VotesServices.createVote({ ...voteData })
    .then((vote) => {
      const score =
        voteData.gameplay + voteData.art + voteData.sound + voteData.affinity;
      GamesControllers.editGameScore(voteData.id_game, score);
      return res.status(200).json(vote);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

export default {
  getVotesByGame,
  getVotesByJudge,
  getAverageByGame,
  createVote,
};

export { getVotesByGame, getVotesByJudge, getAverageByGame, createVote };
