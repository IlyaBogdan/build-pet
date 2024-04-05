<template lang="">
    <a>
        <slot></slot>
    </a>
</template>
<script>
export default {
    name: "link-ui",
    props: {
        type: String
    }
}
</script>
<style lang="scss">
    a {
        text-decoration: none;
        color: black;
        cursor: pointer;
        transition: .1s all;

        &:hover {
            color: var(--black-hover-ui);
            text-decoration: underline;
        }
    }
</style>