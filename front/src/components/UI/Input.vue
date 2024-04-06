<template lang="">
    <div class="input-ui">
        <label v-if="label" :for="name">{{ label }}</label>
        <input 
            :name="name" 
            :type="inputType" 
            :value="value"
        />
    </div>
</template>
<script>
export default {
    name: "input-ui",
    props: {
        name: String,
        inputType: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: undefined
        },
        value: {
            default: undefined
        }
    }
}
</script>
<style lang="scss">
    .input-ui {
        display: flex;
        flex-direction: column;
        padding: 5px;

        label {
            margin-bottom: 10px;
        }

        input {
            min-width: 50px;
            min-height: 30px;
            border-radius: 15px;
            border: 1px solid black;
            padding-left: 10px;
        }
    }
</style>