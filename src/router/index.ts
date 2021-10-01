import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import OralPresentation from '@/views/OralPresentation.vue'
import KoscoPresentation from '@/views/KoscoPresentation.vue'
import PosterPresentation from '@/views/PosterPresentation.vue'
import PostList from '@/views/PostList.vue';
import NotFound from '@/components/NotFound.vue';
import Admin from '@/views/Admin.vue';
import Post from '@/views/Post.vue';
import NewPost from '@/views/NewPost.vue';
import Program from '@/views/Program.vue';
import WelcomeMessage from '@/views/WelcomeMessage.vue';
import ZoomSession from '@/views/ZoomSession.vue';
import Review from '@/views/Review.vue';
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/', component: Home, meta : {
      title : "2021 KSCIC"
    }
  },
  {
    path: '/login', component: Login, meta: {
      title : "KSCIC > Login"
    }
  },
  {
    path: '/admin', component: Admin, meta: {
      title : "KSCIC > Admin"
    }
  },
  {
    path: '/presentation/kosco', component: KoscoPresentation, meta: {
      title : "KSCIC > Kosco Presentation"
    }
  },
  {
    path: '/presentation/poster', component: PosterPresentation, meta: {
      title : "KSCIC > Poster Presentation"
    }
  },
  {
    path: '/presentation/oral', component: OralPresentation,meta: {
      title : "KSCIC > Oral Presentation"
    }
  },
  {
    path: '/presentation/poster/:category', component: PostList
  },
  {
    // post id 는 query param 으로 받는다. 
    path: '/post/:category', component: Post
  },
  {
    path: '/post/:category/write', component: NewPost, props: true, meta: {
      title: "KSCIC > Register"
    }
  },
  {
    path: '/info/program', component: Program
  },
  {
    path: '/info/welcome', component: WelcomeMessage, meta: {
      title : 'KICIC > Welcome'
    }
  },
  {
    path: '/live/session', component: ZoomSession,
  },
  {
    path: '/review', component: Review, meta: {
      title: "KSCIC > Review"
    }
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound,
    props: true, 
    meta: {
      title : 'Page Not Found'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
    if(to.meta.title){
      document.title = to.meta.title as any;
    }
});

export default router
