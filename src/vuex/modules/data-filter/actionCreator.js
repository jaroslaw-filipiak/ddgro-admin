import mutations from './mutations';
import axios from 'axios';

const API_URL = process.env.VUE_APP_APIURL;

const state = () => ({
  tableData: [],
  tableDataFiler: [],
  loading: false,
  error: null,
});

const actions = {
  async tableReadData({ commit }, payload) {
    try {
      const { data } = await axios.get(`${API_URL}/${payload.endpoint}`);
      commit('dataTableReadSuccess', data?.data || []);
    } catch (err) {
      commit('dataTableReadErr', err);
      console.log(err);
    }
  },

  async filterWithSubmit({ commit, state }, { id, status }) {
    URL: console.log(state);
    try {
      commit('filterWithSubmitBegin');
      setTimeout(() => {
        const data = state.tableData.filter((item) => {
          return (
            item.id.indexOf(id) >= 0 &&
            item.status.toLowerCase().indexOf(status.toLowerCase()) >= 0
          );
        });

        commit('filterWithSubmitSuccess', data);
      }, 100);
    } catch (err) {
      commit('filterWithSubmitErr', err);
    }
  },
  async dataLiveFilter({ commit, state }, { value, key }) {
    try {
      commit('dataLiveFilterBegin');
      if (value && key === 'id') {
        const data = state.tableData.filter(
          (item) => item[key] === Number(value)
        );
        commit('dataLiveFilterSuccess', data);
      } else if (value && key === 'name') {
        const data = state.tableData.filter((item) =>
          item[key].toLowerCase().includes(value.toLowerCase())
        );
        commit('dataLiveFilterSuccess', data);
      } else if (!value) {
        const data = state.tableData;
        commit('dataLiveFilterSuccess', data);
      }
    } catch (err) {
      commit('dataLiveFilterErr', err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
