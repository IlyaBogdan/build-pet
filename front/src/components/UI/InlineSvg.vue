<template lang="">
    <div class="inline-svg" ref="content">

    </div>
</template>
<script>

export default {
    name: 'inline-svg',
    props: {
        src: {
            type: String
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    },
    mounted() {
        fetch(this.src)
            .then((response) => response.text())
            .then((svg) => this.$refs.content.innerHTML = svg);
    }
}
</script>
<style lang="scss">

</style>