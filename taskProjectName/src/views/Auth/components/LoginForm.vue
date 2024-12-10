<template>
    <form action="" class="p-6 formgrid">
        <div class="grid gap-y-6">
            <div class="col-12">
                <FloatLabel>
                    <InputText id="username" v-model="username" :class="{ 'p-invalid': errors.username }" />
                    <label for="username">Usuario</label>
                </FloatLabel>
                <small class="p-invalid text-red-700">{{ errors.username }}</small>
            </div>
            <div class="col-12">
                <FloatLabel>
                    <Password id="password" v-model="password" :feedback="false"
                        :class="{ 'p-invalid': errors.password }" />
                    <label for="password">Contraseña</label>
                </FloatLabel>
                <small class="p-invalid text-red-700">{{ errors.password }}</small>
            </div>
        </div>
    </form>
    <div class="card flex justify-center">
        <Button label="Iniciar sesión" icon="pi pi-user" @click="handleLogin" :disabled="loading" />
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useGlobalstore } from '@/stores/globalStore';
import { useRouter } from 'vue-router';
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['update:loading']);

const globalStore = useGlobalstore();
const router = useRouter();

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('Se espera un usuario para iniciar sesión'),
        password: yup.string().required('Se espera una contraseña para iniciar sesión')
    }),
});

const [username] = defineField('username');
const [password] = defineField('password');

let loading = ref(false);

const updateLoadingState = (state) => {
    loading.value = state;
    emit('update:loading', state);
};

const handleLogin = handleSubmit(async () => {
    updateLoadingState(true);
    try {
        await globalStore.login(username.value, password.value);
        const urlFrom = router.currentRoute.value.query.urlFrom;
        router.push({ path: urlFrom ? decodeURIComponent(urlFrom) : '/' });
    } catch (error) {
        console.error('Error during login:', error);
    } finally {
        updateLoadingState(false);
    }
});
</script>

<style lang="scss" scoped></style>
