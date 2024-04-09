<template>
    <div class="dialog-message" :class="{ grouped: nextUserIsEqual() }" :data-destination="message.type">
        <div class="dialog-message__content">
            <div class="text-wrapper">{{ message.content }}</div>
            <div class="dialog-message__date">{{ messageDate(message.date) }}</div>
            <div v-if="!nextUserIsEqual()" class="triangle"></div>
        </div>
        <div v-if="!nextUserIsEqual()" class="dialog-message__author">
            <img 
                width="50"
                height="50"
                class="avatar"
                :src="message.user?.avatar ?? loadImage"
            />
        </div>
    </div>
</template>
<script>

import noIcon from '@/assets/no-icon.png';

export default {
    name: "dialog-message",
    props: {
        message: Object,
        next: Object
    },
    data() {
        return {
            loadImage: noIcon
        }
    },
    methods: {
        messageDate(date) {
            date = new Date(date);
            return `${date.getHours()}:${date.getMinutes()}`;
        },
        nextUserIsEqual() {
            console.log(this.next?.id);
            console.log(this.message.author.id);
            return this.next && this.next.id === this.message.author.id;
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

            .avatar {
                border-radius: 50%;
            }
        }

        &[data-destination="in"] {
            flex-direction: row;
            justify-content: right;

            .dialog-message__content {
                margin-right: 40px;

                .text-wrapper {
                    text-align: left;
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