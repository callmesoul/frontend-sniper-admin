import Vue from 'vue'
import {ApolloClient} from 'apollo-client'
import {HttpLink,createHttpLink } from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { ApolloLink, concat, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from "apollo-link-error";
import store from './vuex/store'
import router from './router'

import Config from '@/utils/config.js'
import {localLogin} from "./vuex/actions";


Vue.use(VueApollo)

// const httpLink = new HttpLink({
//   uri: Config.graphqlServer,
// })
const httpLink = createHttpLink({ uri: Config.service()+'/graphql' });


const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(Config.tokenName) || null
  operation.setContext({
    headers: {
      token: `${token}`
    }
  });
  return forward(operation);
})

const errorLink = onError(({ networkError }) => {
  debugger;
  if (networkError.statusCode === 403) {
    store.commit('LOGOUT_USER');
    router.push({name:'login'})
  }
});
const link = errorLink.concat(httpLink);

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  },
  errorHandler (error) {
    console.log('Global apollo error handler')
    console.error(error)
  }
})

export default apolloProvider
