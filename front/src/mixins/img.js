import noIcon from '@/assets/no-icon.png';

export default {
    data() {
        return {
            avatar: noIcon
        }
    },
    methods: {
        staticUrl(relationUrl) {
            return relationUrl ? `${process.env.VUE_APP_BACKEND_PUBLIC}/${relationUrl}` : '';
        }
    },
}