import axios from '../Util/axios';

export const getQuestionnaire = () => {
  return axios({
    method: 'get',
    url: `questionnaire/`,
  });
};