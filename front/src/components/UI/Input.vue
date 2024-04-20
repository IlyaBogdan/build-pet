<template lang="">
    <div class="input-ui">
        <label v-if="label" :class="{'required': required}" :for="name">{{ label }}</label>
        <input 
            :name="name" 
            :type="type" 
            v-model="writableValue"
        />
    </div>
</template>
<script>
export default {
    name: "input-ui",
    props: {
        name: String,
        type: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: undefined
        },
        required: {
            type: Boolean,
            default: false
        },
        value: {
            default: undefined,
        }
    },
    emits: ['update:value'],
    computed: {
        writableValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('update:value', newValue);
            }
        }
    },
}
</script>
<style lang="scss">
    .input-ui {
        display: flex;
        flex-direction: column;
        padding: 5px;

        label {
            margin-bottom: 10px;

            &.required::after {
                content: '*';
                color: var(--red-ui);
                margin-left: 3px;
            }
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