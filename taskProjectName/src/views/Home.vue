<template>
    <div class="flex justify-center align-center w-full h-full">
        <div class="bg-red-500">
            <h1>Hola mundo</h1>
        </div>
    </div>
    <Dialog v-model:visible="loading" modal pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
        <template #container>
            <ProgressSpinner />
        </template>
    </Dialog>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>