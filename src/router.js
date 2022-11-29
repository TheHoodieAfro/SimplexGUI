import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/home.vue";
import LoginView from "./views/login.vue";
import InstructionsView from "./views/instructions.vue"
import RegisterView from "./views/register.vue";
// lazy-loaded
const ClassificationView = () => import("./views/classification.vue")
const ProfileView = () => import("./views/profile.vue")
const DownloadView = () => import("./views/download.vue")
const UploadView = () => import("./views/upload.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/instructions",
    component: InstructionsView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/download",
    name: "download",
    component: DownloadView,
  },
  {
    path: "/upload",
    name: "upload",
    component: UploadView,
  },
  {
    path: "/classification",
    name: "classification",
    component: ClassificationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/instructions'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router;
