import { Commit, createStore } from 'vuex'

interface RootState {
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
  authenticated: boolean; 
  userId: string;
  username: string;
  authority: string;
}

const initalState: RootState =  {
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
    SET_AUTHENTICATED_USER(state: RootState,user: User) {
        state.authenticated = user.authenticated; 
        if(user.authenticated){
          state.userId = user.userId;
          state.authority = user.authority;
          state.username = user.username;
        }
    },
  },
  actions: {
    // 비동기 처리
    async setUserInfo({ commit }: { commit: Commit }) {
      let response: any = fetch(`${this.state.requestUrl}/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    }); 
    if(response.status == 200) response =  response.json();
    else return  commit('SET_AUTHENTICATED_USER',{ authenticated: false});
    commit('SET_AUTHENTICATED_USER',{
            authenticated: true,
            userId: response.userId,
            username: response.username,
            authority: response.authority,
    });
    }
  },
})
