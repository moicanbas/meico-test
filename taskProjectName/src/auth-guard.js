import { useGlobalstore } from "./stores/globalStore";

export const hasPermission = (to, from, next) => {
    const store = useGlobalstore();
    const authToken = store.authToken;
    if (authToken && to.name === 'Login') {
        next({ name: 'Inicio' });
    } else if (!authToken && to.name !== 'Login') {
        const urlFrom = encodeURIComponent(to.fullPath);
        
        next({ name: 'Login', query: { urlFrom } });
    } else {
        next();
    }
};
