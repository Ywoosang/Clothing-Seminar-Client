import { Commit, createStore } from 'vuex'

interface RootState {
  showModal : boolean;
  modalMessage: string;  
  authority: string;
  userId : string;
  username:string;
  authenticated: boolean;
  requestUrl: string;
  categories: string[];
}

// interface Category {
//   [key: string] : string;
// }

interface User {
  userId: string;
  username: string;
  authority: string;
}

const initalState: RootState =  {
  showModal: false,
  modalMessage: "",
  authority: "MEMBER",
  userId: "",
  username: "",
  authenticated: false,
  requestUrl: 'http://localhost:3000',
  categories : ['복식사','복식미학 · 패션디자인','패션마케팅 · 심리','복식일반 의복구성 · 텍스타일']
}
 

export default createStore({
  state:  initalState,
  mutations: {
    SET_AUTH(state: RootState, auth: boolean) {
      state.authenticated = auth;
    },
    SET_USERINFO(state: RootState, user: User) {
      state.userId = user.userId;
      state.authority = user.authority;
      state.username = user.username;
    },
    SHOW_MODAL(state: RootState,message: string ){
      state.showModal = true;
      state.modalMessage = message;
    },
    CLOSE_MODAL(state: RootState){
      state.showModal = false;
    }
  },
  actions: {
    // 비동기 처리
    setUserInfo({ commit }: { commit: Commit }) {
      return fetch(`${this.state.requestUrl}/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then(response => {
          if (response.status == 200) return response.json();
          else commit('SET_AUTH', false);
        })
        .then(res => {
          commit('SET_USERINFO', {
            userId: res.userId,
            username: res.username,
            authority: res.authority,
          });
          commit('SET_AUTH', true);
        })
    }
    // commit change
  },
  modules: {
  }
})
