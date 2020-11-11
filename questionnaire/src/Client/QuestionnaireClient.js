import axios from '../Util/axios';

export const getQuestionnaires = () => {
  return axios({
    method: 'get',
    url: `questionnaire/`,
  });
};

export const getQuestionnaire = id => {
  return axios({
    method: 'get',
    url: `questionnaire/` + id,
  });
};

export const answerQuestionnaire = data => {
  return axios({
    method: 'post',
    url: `standings/answer-question/`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getStandings = id => {
  return axios({
    method: 'get',
    url: `standings/` + id,
  });
}

export const getStandingsFromQuestionnaire = questionnaire => {
  return axios({
    method: 'get',
    url: `standings`,
    params: {
      questionnaire: questionnaire
    }
  });
};

