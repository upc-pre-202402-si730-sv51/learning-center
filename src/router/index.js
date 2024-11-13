import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CategoryManagementComponent from "../publishing/pages/category-management.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',                    name: 'home',       component: HomeComponent,               meta: { title: 'Home'}},
        { path: '/about',                   name: 'about',      component: AboutComponent,              meta: { title: 'About Us'}},
        { path: '/publishing/categories',   name: 'categories', component: CategoryManagementComponent, meta: { title: 'Category Management'}},
        { path: '/sign-in',                 name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign In'}},
        { path: '/sign-up',                 name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign Up'}},
        { path: '/',                        redirect: '/home'}
    ]
});

router.beforeEach((to, from, next) => {
    // Set the page title
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
})
export default router;