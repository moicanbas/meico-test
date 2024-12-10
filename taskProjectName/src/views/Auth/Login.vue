<template>
    <div class="flex items-center justify-center h-screen">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center opacity-8">
            <span class="text-xl text-black">Inicio de sesión</span>
            <LoginForm @update:loading="loading = $event" />
        </div>
    </div>
    <Dialog v-model:visible="loading" modal pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
        <template #container>
            <ProgressSpinner />
        </template>
    </Dialog>
</template>

<script setup>
import LoginForm from './components/LoginForm.vue';
import { ref } from 'vue';

let loading = ref(false); 
</script>

<style scoped></style>
