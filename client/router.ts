import Vue from 'vue';
import VueRouter from 'vue-router';
import FeedPage from './components/Feed/FeedPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import RegisterPage from './components/Login/RegisterPage.vue';
import ProfilePage from './components/Profile/ProfilePage.vue';
import FindFriendsPage from './components/FindFriends/FindFriendsPage.vue';
import MixtapePage from './components/Mixtape/MixtapePage.vue';
import CommentsPage from './components/Comment/CommentsPage.vue';
import ProfileMemoriesPage from './components/Profile/ProfileMemoriesPage.vue';
import ProfileSongsPage from './components/Profile/ProfileSongsPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: FeedPage},
  {path: '/account', name: 'Settings', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/register', name: 'Register', component: RegisterPage},
  {
    path: '/profile/:name',
    name: 'Profile',
    component: ProfilePage,
    params: true
  },
  {path: '/findFriends', name: 'Find Friends', component: FindFriendsPage},
  {
    path: '/mixtape/:mixtapeId',
    name: 'Mixtape',
    component: MixtapePage,
    params: true
  },
  {
    path: '/comments/:mixtapeId?',
    name: 'Comments',
    component: CommentsPage,
    params: true
  },
  {path: '/profile/memories', name: 'Memories', component: ProfileMemoriesPage},
  {path: '/profile/songs', name: 'Favorites', component: ProfileSongsPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (
      to.name !== 'Login' &&
      to.name !== 'Register' &&
      !router.app.$store.state.username
    ) {
      next({name: 'Login'}); // Go to Login page if user navigates to any page and are not signed in
      return;
    }
  }

  next();
});

export default router;
