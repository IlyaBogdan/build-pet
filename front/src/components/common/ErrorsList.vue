<template lang="">
    <div v-if="errors.length" class="errors">
        <div v-for="(error, index) in errors" :key="index" class="error">
            {{ error }}
        </div>
    </div>
</template>
<script>
export default {
    name: "errors-list",
    props: {
        errors: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .errors {
        display:flex;
        flex-direction: column;

        .error {
            margin-top: 10px;
            color: var(--red-ui);
        }
    }
</style>