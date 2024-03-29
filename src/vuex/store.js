import { createStore } from 'vuex';
import themeLayout from './modules/themeLayout/actionCreator';
import auth from './modules/authentication/axios/actionCreator';
import dataTable from './modules/data-filter/actionCreator';
import reports from './modules/reports/actionCreator';

export default createStore({
  modules: {
    themeLayout,
    auth,
    dataTable,
    reports,
  },
});
