import mutations from './mutations';
import axios from 'axios';

const API_URL = process.env.VUE_APP_APIURL;

const state = () => ({
  reportData: [],
  loading: false,
  error: null,
});

const actions = {
  async getReportData({ commit }, payload) {
    commit('reportDataBegin');
    console.log('getReportData..');
    try {
      const data = await axios.get(
        `${API_URL}/application/${payload.endpoint}`
      );
      commit('reportDataSuccess', data?.data || []);
    } catch (err) {
      commit('reportDataErr', err);
      console.log(err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
