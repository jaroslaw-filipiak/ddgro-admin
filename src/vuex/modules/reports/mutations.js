export default {
  reportDataBegin(state) {
    state.loading = true;
  },

  reportDataSuccess(state, data) {
    state.loading = false;
    state.reportData = data;
  },

  reportDataErr(state, err) {
    state.loading = false;
    state.error = err;
  },
};
