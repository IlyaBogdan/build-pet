<template lang="">
    <div>
        You are authenticated
    </div>
</template>
<script>
import authGuard from '@/mixins/authGuard';

export default {
    name: 'personal-cabinet',
    mixins: [authGuard]
}
</script>
<style lang="scss">
    
</style>