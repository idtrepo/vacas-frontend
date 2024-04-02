import { storeToRefs } from 'pinia'
import useAuthStore from "@/modules/auth/stores/useAuthStore.js";


const VISTA_LOGIN = 'autenticacion-login';


export default (to, from, next) => {
    const authStore = useAuthStore();
    const { sesionVigente } = storeToRefs(authStore);

    if(!sesionVigente.value && to.name !== VISTA_LOGIN){
        next({ name: 'autenticacion-login' });
    }else{
        next();
    }
}