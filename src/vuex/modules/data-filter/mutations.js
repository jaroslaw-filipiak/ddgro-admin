export default {
  dataTableReadBegin(state) {
    state.loading = true;
  },

  dataTableReadSuccess(state, data) {
    state.loading = false;
    state.tableData = data;
    state.tableDataFiler = data;
  },

  dataTableReadErr(state, err) {
    state.loading = false;
    state.error = err;
  },
  filterWithSubmitBegin(state) {
    state.loading = true;
  },

  filterWithSubmitSuccess(state, data) {
    state.loading = false;
    state.tableData = data;
  },

  filterWithSubmitErr(state, err) {
    state.loading = false;
    state.error = err;
  },

  dataLiveFilterBegin(state) {
    state.loading = true;
  },

  dataLiveFilterSuccess(state, data) {
    state.loading = false;
    state.tableDataFiler = data;
  },

  dataLiveFilterErr(state, err) {
    state.loading = false;
    state.error = err;
  },
};
