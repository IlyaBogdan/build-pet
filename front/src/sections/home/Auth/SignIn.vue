<template>
    <div class="sign-in">
        <pre-loader v-if="loading"/>
        <div class="title">Sign In</div>
        <form class="sign-in__form">
            <input-ui
                label="Email"
                v-model:value="email"
                @keyup.enter="loginHandle"
            />
            <input-ui
                label="Password"
                type="password"
                v-model:value="password"
                @keyup.enter="loginHandle"
            />
            <errors-list :errors="errors"/>
            <button-ui type="primary" @keyup.enter="loginHandle" @click="loginHandle">Sign In</button-ui>
        </form>
        <div class="sign-in__footer">
            <div>Don't have an account?</div>
            <div>
                <router-link to="/sign-up">Sign Up</router-link>
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
            errors: [],
            loading: false
        }
    },
    methods: {
        loginHandle() {
            const data = this.validate();

            if (!this.errors.length) {
                this.loading = true;
                API.login(data.email, data.password)
                    .then(() => {
                        window.location.href = '/personal';
                    }, (errors) => {
                        this.errors = errors;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        validate() {
            const data = { email: this.email, password: this.password };
            this.errors = [];
            const validationResult = Validator.payloadValidation(data);
            if (Array.isArray(validationResult)) this.errors = this.errors.concat(validationResult);

            return data;
        }
    }
}
</script>
<style lang="scss">
    .sign-in {
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