import { Commit, createStore } from 'vuex'
import { RootState, UserInfo, AuthResponse } from '../types/type';
import { getUserInfo }  from '../api/user'; 


const initalState: RootState = {
  id : 0,
  authority: "MEMBER",
  userId: "",
  username: "",
  authenticated: false,
  category: '',
  categories: ['History of Costume', 'Aesthetics · Fashion Design', 'Fashion Marketing · Psychology', 'Clothing Construction · Textiles · General Costume']
}

export default createStore({
  state: initalState,
  mutations: {
    SET_AUTHENTICATED_USER(state: RootState, user: UserInfo) {
      state.id = user.id;
      state.authenticated = user.authenticated;
      state.userId = user.userId;
      state.authority = user.authority;
      state.username = user.username;
    },
    SET_CATEGORY(state: RootState, category: string) {
      state.category = category;
    }
  },
  actions: {
    // 비동기 처리
    async setUserInfo({ commit }: { commit: Commit }) {
      try{
        const response  = await getUserInfo();  
        commit('SET_AUTHENTICATED_USER', {
          authenticated: true,
          id : response.data.id,
          userId: response.data.userId,
          username: response.data.username,
          authority: response.data.authority,
        });
      } catch (error: any) {
          if(error.response.status == 403){
             localStorage.removeItem("jwt");
          }  
          commit('SET_AUTHENTICATED_USER', {
            authenticated: false,
            id : 0,
            userId: '',
            username: '',
            authority: ''
          });
      }
    }
  },
})
