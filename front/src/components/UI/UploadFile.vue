<template lang="">
    <label class="input-file">
        <input
            @change="onChange($event)"
            :accept="accept"
            type="file"
            name="file"
        >        
        <span class="input-file-text">{{ title }}</span>
    </label>
</template>

<script>

export default {
    name: 'upload-file',
    props: {
        accept: {
            type: String
        },
        title: {
            type: Number
        },
    },
    methods: {
        onChange(event) {
            this.$emit('selected', event.target.files[0]);
        }
    }
}
</script>
<style lang="scss">
    .input-file {
        cursor: pointer;
        transition: .3s all;
        text-decoration: underline;
        font-size: 12px;

        &:hover {
            color: var(--gray-ui);
        }

        input {
            display: none;
        }
    }
</style>