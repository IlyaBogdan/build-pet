<template>
    <div class="sign-up">
        <pre-loader v-if="loading"/>
        <div class="title">Sign Up</div>
        <form class="sign-up__form">
            <input-ui label="Email" :required="true" type="email" v-model:value="email"/>
            <input-ui label="Password" :required="true" type="password" v-model:value="password"/>
            <input-ui label="Password repeat" :required="true" type="password" v-model:value="passwordRepeat"/>
            <input-ui label="First Name" :required="true" v-model:value="firstName"/>
            <input-ui label="Last Name" v-model:value="lastName"/>

            <errors-list :errors="errors"/>

            <button-ui type="primary" @click="signUp">Register</button-ui>
        </form>
        <div class="sign-up__footer">
            <div>Do you have an account?</div>
            <div>
                <router-link to="/sign-in">Sign In</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { API } from '@/utils/API.js';
import { Validator } from '@/utils/Validator.js';

export default {
    data() {
        return {
            email: undefined,
            password: undefined,
            passwordRepeat: undefined,
            firstName: undefined,
            lastName: undefined,
            passwordsEquals: false,
            errors: [],
            loading: false,
        }
    },
    methods: {
        signUp() {
            this.validate();

            if (!this.errors.length) {
                this.loading = true;
                API.signUp(this.email, this.password)
                .then((response) => {
                    // redirect
                    console.log(response);
                })
                .finally(() => {
                    this.loading = false;
                });
            }
        },
        validate() {
            this.errors = [];
            const validationResult = Validator.payloadValidation({ email: this.email, password: this.password, 'First name': this.firstName });
            if (Array.isArray(validationResult)) this.errors = this.errors.concat(validationResult);
        }
    }
}
</script>
<style lang="scss" scoped>
    .sign-up {
        width: 500px;
        margin: 10px 20px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding-bottom: 20px;

        .title {
            font-weight: 600;
            font-size: 20px;
            margin: 5px 0 15px;
            text-align: center;
        }

        &__form {
            margin: 0 0 20px;
            display: flex;
            flex-direction: column;

            .errors {
                text-align: center;
            }

            button {
                margin: 20px auto 0;
                width: 200px;
            }
        }
        &__footer {
            text-align: center;
            div {
                margin-top: 5px;
            }
        }
    }
</style>