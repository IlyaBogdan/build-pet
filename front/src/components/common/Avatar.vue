<template>
    <div class="avatar">
        <img class="avatar-icon"
            width="50"
            height="50"
            :src="getAvatar"
        />
        <div v-if="online" class="online"></div>
    </div>
    
</template>
<script>
import noIcon from '@/assets/no-icon.png';
export default {
    name: 'avatar-icon',
    props: {
        avatar: {
            type: String,
            default: ''
        },
        online: {
            type: Boolean,
            default: () => { return false }
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
    .avatar {
        position: relative;
        width: 50px;
        height: 50px;

        .avatar-icon {
            border-radius: 50%;
        }

        .online {
            display: block;
            width: 10px;
            height: 10px;
            background-color: var(--green-ui);
            border-radius: 50%;
            position: absolute;
            bottom: 1px;
            right: 2px;
        }
    }
</style>