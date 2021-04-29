import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Authors from '../views/Authors.vue'
import ChooseBlock from '../views/ChooseBlock.vue'
import NewBlock from '../views/NewBlock.vue'
import EditBlock from '../views/EditBlock.vue'
import NewStory from '../views/NewStory.vue'
import ReadStory from '../views/ReadStory.vue'
import SignUp from '../views/SignUp.vue'
import Validate from '../views/Validate.vue'
import Stories from '../views/Stories.vue'
import SuperUser from '../views/SuperUser.vue'
import UserProfile from '../views/UserProfile.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Error404 from '../views/Error404.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:catchAll(.*)',
    name: 'Error404',
    component: Error404
  },
  {
    path: '/autores',
    name: 'Authors',
    component: Authors
  },
  {
    path: '/moderar/:user/:id',
    name: 'ChooseBlock',
    component: ChooseBlock
  },
  {
    path: '/nuevo-fragmento/:story/:blockid/:title',
    name: 'NewBlock',
    component: NewBlock
  },
  {
    path: '/editar-fragmento/:id',
    name: 'EditBlock',
    component: EditBlock
  },
  {
    path: '/nueva-historia',
    name: 'NewStory',
    component: NewStory
  },
  {
    path: '/lectura/:id',
    name: 'ReadStory',
    component: ReadStory
  },
  {
    path: '/lectura/:id/:blockid',
    name: 'ReadStoryBlock',
    component: ReadStory
  },
  {
    path: '/registro',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/validar/:id',
    name: 'Validate',
    component: Validate
  },
  {
    path: '/libros',
    name: 'Stories',
    component: Stories
  },
  {
    path: '/administrar',
    name: 'SuperUser',
    component: SuperUser
  },
  {
    path: '/perfil/:nickname',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/cambiarcontrasena/:id',
    name: 'ChangePassword',
    component: ChangePassword
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
