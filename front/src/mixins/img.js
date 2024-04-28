import noIcon from '@/assets/no-icon.png';

export default {
    data() {
        return {
            avatar: noIcon
        }
    },
    methods: {
        staticUrl(relationUrl) {
            return relationUrl ? `http://localhost:8000/${relationUrl}` : '';
        }
    },
}