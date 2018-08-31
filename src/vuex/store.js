import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import * as actions from './actions'
// import * as getters from './getters'
import auth  from './modules/auth'


Vue.use(Vuex);
const debug = process.env.NODE_ENV === 'development';
Vue.config.debug = debug;
Vue.config.warnExpressionErrors = false;


export default new Vuex.Store({
    actions,
    // getters,
    modules: {
        auth
    },
    strict: debug,
    middlewares
})
