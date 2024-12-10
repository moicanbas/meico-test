import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes';
import { hasPermission } from '@/auth-guard';

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
router.beforeEach(hasPermission);
export default router
