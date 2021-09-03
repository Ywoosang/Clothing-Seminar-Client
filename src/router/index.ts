import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import OralPresentation from '@/views/OralPresentation.vue'
import KoscoPresentation from '@/views/KoscoPresentation.vue'
import PosterPresentation from '@/views/PosterPresentation.vue'
import PostList from '@/views/PostList.vue';
import NotFound from '@/components/NotFound.vue'; 
import Admin from '@/views/Admin.vue';
import Post from '@/views/Post.vue';
import NewPost from '@/views/NewPost.vue';
import Profile from '@/views/Profile.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', component: Home,
  },
  {
    path: '/login', component: Login,
  },
  {
    path : '/register', component: Register,
  },
  {
    path: '/profile', component: Profile,
  },
  {
    path : '/admin', component: Admin,
  },
  {
    path : '/presentation/kosco', component: KoscoPresentation
  },
  {
    path : '/presentation/poster', component: PosterPresentation
  },
  {
    path : '/presentation/oral', component: OralPresentation
  },
  {
    path : '/presentation/poster/:name', component: PostList, props:true
  },
  {
    // post id 는 query param 으로 받는다. 
    path : '/post/:name',component: Post, props:true
  },
  {
    path : '/post/:name/write',component: NewPost, props:true
  },
  {
    path : '/404',
    name : 'notFound',
    component : NotFound,
    props : true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect : "/404"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
