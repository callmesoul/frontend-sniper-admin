import {
    LOGIN_SUCCESS,
    USERINFO_SUCCESS,
    USERINFO_FAILURE,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
    CHANGE_COMMUNITY,
    SET_TRUENAME,
    SET_PHONE,
    UPDATE_USER_INTERGRAL,
    DEDUCTION_INTEGRAL,
  UPDATE_NEWS_NOT_READ,
  UPDATE_INTEGRAL
} from '../types'


const state = {
  token: localStorage.token? localStorage.token : null,
    // sessionKey: 'a578d2b5af01e3621969eceaa6dc6b34',
    // user:null,
    classId:null,
    assetsHost:'https://qt.callmesoul.cn/',
  newsNotRead:0,
  ShowScrollerTop:false,
  integral:0
};

const mutations = {
    setToken(state, action) {
        state.token = action.token;
        localStorage.token=action.token;
    },
    [USERINFO_SUCCESS](state, action) {
        state.user = action.user;
        console.log("USERINFO_SUCCESS.action:",action);
        state.classId = action.user.classList[0].id;
      console.log("USERINFO_SUCCESS.classId:",state.classId);
    },
    [USERINFO_FAILURE](state, action) {
        state.user = null
    },
    [LOGOUT_USER](state, action) {
        localStorage.removeItem("token");
        state.user = null;
        state.classId=null;
        state.sessionKey = null;
    },
    [UPDATE_USER_SUCCESS](state, action) {
        state.user = action.user
    },
    [CHANGE_COMMUNITY](state, action) {
        state.user.community_id = action.id;
    },
    [SET_TRUENAME](state, action) {
        state.user.truename = action.truename
    },
    [SET_PHONE](state, action) {
        state.user.phone = action.phone
    },
    [UPDATE_USER_INTERGRAL](state, action) {
        state.user.integral = parseInt(state.user.integral) + parseInt(action.integral);
    },
    [UPDATE_NEWS_NOT_READ](state,action) {
      state.newsNotRead = action.newsNotRead;
    },
    [DEDUCTION_INTEGRAL](state, action){ //扣减用户积分
        state.user.integral -= action;
    },
    [UPDATE_INTEGRAL](state, action){ //扣减用户积分
        state.integral = action.integral;
    }
};

export default {
    state,
    mutations,
}
