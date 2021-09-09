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
  categories: ['복식사', '복식미학 · 패션디자인', '패션마케팅 · 심리', '복식일반 의복구성 · 텍스타일']
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
        console.log(response);
        commit('SET_AUTHENTICATED_USER', {
          authenticated: true,
          id : response.data.id,
          userId: response.data.userId,
          username: response.data.username,
          authority: response.data.authority,
        });
      } catch (error: any) {
          console.log(error.response);
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
