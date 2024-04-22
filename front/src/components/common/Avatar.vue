<template>
    <img class="avatar-icon"
        width="50"
        height="50"
        :src="getAvatar"
    />
</template>
<script>
import noIcon from '@/assets/no-icon.png';
export default {
    name: 'avatar-icon',
    props: {
        avatar: {
            type: String,
            default: ''
        }
    },
    computed: {
        getAvatar() {
            return this.avatar != '' ? this.avatar : noIcon;
        }
    }
}
</script>
<style lang="scss" scoped>
    .avatar-icon {
        border-radius: 50%;
    }
</style>