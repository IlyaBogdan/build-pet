<template lang="">

    <div>
        <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
        <div v-if="!online && reconnect">Trying to reconnecting after {{ reconnect }} s</div>
    </div>

</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    
</style>