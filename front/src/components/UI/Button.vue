<template lang="">
    <button :data-type="type" type="button">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: "button-ui",
    props: {
        type: String
    }
}
</script>
<style lang="scss">
    button {
        background: none;
        border-radius: 20px;
        padding: 10px 15px;
        color: black;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: .1s all;


        &[data-type="success"] {
            background-color: var(--green-ui);
            color: white;

            &:hover {
                background-color: var(--green-hover-ui);
            }
        }

        &[data-type="warning"] {
            background-color: var(--red-ui);
            color: white;

            &:hover {
                background-color: var(--red-hover-ui);
            }
        }

        &[data-type="primary"] {
            background-color: var(--blue-primary-ui);
            color: white;

            &:hover {
                background-color: var(--blue-primary-hover-ui);
            }
        }
    }
</style>