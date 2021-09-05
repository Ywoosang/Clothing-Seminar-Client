import { Commit, createStore } from 'vuex'
import { RootState,UserInfo, AuthResponse } from '../types/type';


const initalState: RootState = {
  authority: "MEMBER",
  userId: "",
  username: "",
  authenticated: false,
  requestUrl: 'http://localhost:3000',
  category : '',
  categories: ['복식사', '복식미학 · 패션디자인', '패션마케팅 · 심리', '복식일반 의복구성 · 텍스타일']
}

export default createStore({
  state: initalState,
  mutations: {
    SET_AUTHENTICATED_USER(state: RootState, user: UserInfo) {
      state.authenticated = user.authenticated;
      state.userId = user.userId;
      state.authority = user.authority;
      state.username = user.username;
    },
    SET_CATEGORY(state:RootState,category: string){
      state.category = category;
    }
  },
  actions: {
    // 비동기 처리
    async setUserInfo({ commit }: { commit: Commit }) {
      let response: AuthResponse = await fetch(`${this.state.requestUrl}/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }) as AuthResponse;
      if (response.ok) {
        response = await response.json();
        commit('SET_AUTHENTICATED_USER', {
          authenticated: true,
          userId: response.userId,
          username: response.username,
          authority: response.authority,
        });
      } else {
        commit('SET_AUTHENTICATED_USER', { 
          authenticated: false,
          userId: '',
          username: '',
          authority: ''
         });
      }
    }
  },
})
