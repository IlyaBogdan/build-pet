<template>
    <div class="dialog-message" :class="{ grouped: nextUserIsEqual() }" :data-destination="message.type">
        <div class="dialog-message__content">
            <div class="text-wrapper" v-html="content"></div>
            <div class="dialog-message__date">{{ messageDate(message.date) }}</div>
            <div v-if="!nextUserIsEqual()" class="triangle"></div>
        </div>
        <div v-if="!nextUserIsEqual()" class="dialog-message__author">
            <avatar-icon :avatar="staticUrl(message.user?.avatar)"/>
        </div>
    </div>
</template>
<script>
import imgMixin from '@/mixins/img';

export default {
    name: "dialog-message",
    mixins: [imgMixin],
    props: {
        message: Object,
        next: Object
    },
    methods: {
        messageDate(date) {
            // TODO: add timezones
            date = new Date(date.date);
            const hours = `${date.getHours()}`.length == 1 ? `0${date.getHours()}` : `${date.getHours()}`;
            const minutes = `${date.getMinutes()}`.length == 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
            return `${hours}:${minutes}`;
        },
        nextUserIsEqual() {
            return this.next && this.next.id === this.message.user.id;
        }
    },
    computed: {
        content() {
            const message = this.message.message;
            const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
            return message.replace(urlRegex, function(url) {
                return '<a href="' + url + '">' + url + '</a>';
            });
        }
    }
}
</script>
<style lang="scss">
    .dialog-message {

        display: flex;
        position: relative;

        &__date {
            position: absolute;
            bottom: 10px;
        }

        &__content {
            background-color: var(--lavanda-ui);
            color:white;
            padding: 20px;
            border-radius: 10px;
            position: relative;
            min-height: 70px;
            min-width: 100px;
            display: inline-block;
            max-width: 350px;

            .triangle {
                position: absolute;
                display: block;
                bottom: -15px;
                width: 0;
                height: 0;
            }            
        }

        &__author {

            position: absolute;
            margin-top: 10px;
            bottom: -50px;
        }

        a {
            color: white;
            text-decoration: underline;

            &:hover {
                color: rgb(184, 183, 183);
            }
        }

        &[data-destination="in"] {
            flex-direction: row;
            justify-content: right;

            .dialog-message__content {
                margin-right: 40px;

                .text-wrapper {
                    text-align: left;
                    margin-bottom: 10px;
                }

                .dialog-message__date {
                    left: 15px;
                }

                .triangle {
                    right: 20px;
                    border-top: 20px solid var(--lavanda-ui);
                    border-left: 20px solid transparent;
                } 
            }
            
            .dialog-message__author {

            }

        }
        &[data-destination="out"] {
            flex-direction: row-reverse;
            justify-content: left;

            .dialog-message__content {
                margin-left: 40px;
        
                .text-wrapper {
                    text-align: right;
                    margin-bottom: 10px;
                }

                .dialog-message__date {
                    right: 15px;
                }

                .triangle {
                    left: 20px;
                    border-top: 20px solid var(--lavanda-ui);
                    border-right: 20px solid transparent;
                } 
            }

            .dialog-message__author {
                
            }
        }
    }
</style>