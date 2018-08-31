import Api from '../api/index'
import * as types from './types'
import VueRouter from 'vue-router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
const router = new VueRouter();


export const localLogin = (store, path) => {
    location.href = Api.host + '/auth/wechat?state=' + path;
};
export const setToken = (store, token) => {
    localStorage.setItem('token', token);
    store.commit(types.LOGIN_SUCCESS, { token: token });
};

export const getUserInfo = (store) => {
    Api.getUserInfo().then((response) => {
        if (response.data.code === 200) {
            return new Promise((resolve, reject) => {
                store.commit(types.USERINFO_SUCCESS, { user: response.data.object.user });
                resolve();
            });
        } else {
            return store.commit(types.USERINFO_FAILURE)
        }
    }, (response) => {
        store.commit(types.USERINFO_FAILURE)
    })
}

export const logOut = (store) => {
    return store.commit(types.LOGOUT_USER);
};

export const getUser = (store) => {
    // console.log(store.state.auth.user);
};
