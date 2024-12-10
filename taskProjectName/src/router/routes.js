
export const routes = [
    {
        path: '/',
        name: 'Inicio',
        meta: {
            icon: 'pi pi-home',
        },
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            icon: 'pi pi-home',
        },
        component: () => import('@/views/Auth/Login.vue'),
    },
]