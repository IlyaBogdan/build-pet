<template lang="">
    <div class="send-message">
        <div class="attachment clickable">
            <inline-svg :src="attachment" />
        </div>
        <div class="main-field">
            <textarea
                ref="textArea"
                placeholder="Message..."
                @keyup.enter="send"
                v-model="message"
                @focus="$emit('typing', true)"
                @blur="$emit('typing', false)"
                @input="$emit('typing', true)"
            ></textarea>
            <div class="emoji clickable">
                <inline-svg :src="emoji" />
            </div>
            <div class="photo clickable">
                <inline-svg :src="photo" />
            </div>
        </div>
        
        <div class="submit clickable" @click="send">
            <div class="send">
                <inline-svg :src="sendIcon"/>
            </div>
        </div>
    </div>
</template>

<script>
import Attachment from '@/assets/attachment.svg';
import Emoji from '@/assets/emoji.svg';
import Photo from '@/assets/photo.svg';
import SendIcon from '@/assets/send-icon.svg?inline';

export default {
    name: "send-message-field",
    data() {
        return {
            message: '',
            typing: false,
            attachment: Attachment,
            emoji: Emoji,
            photo: Photo,
            sendIcon: SendIcon
        }
    },
    methods: {
        send() {
            if (this.message.length) {
                this.$emit('sendMessage', this.message);
                this.$emit('typing', false);
                this.message = '';
            }
        },
        mounted() {
            const tx = this.$refs("textArea");

            tx.setAttribute("style", "height:" + (tx[0].scrollHeight) + "px;overflow-y:hidden;");
            tx.addEventListener("input", function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + "px";
            }, false);
        }
    }
}
</script>
<style lang="scss">
    .send-message {
        background-color: gray;
        display: flex;
        align-items: center;
        padding: 10px;

        .clickable {
            cursor: pointer;
            .inline-svg svg {
                width: 23px;
                height: 23px;
                transition: .3s all;
            }

            &:hover .inline-svg svg path {
                fill: white;
            }
        }
        

        .attachment {
            margin-right: 10px;
            margin-left: 9px;
        }

        .main-field {
            width: 85%;
            display: flex;
            align-items: center;
            border: 1px solid var(--gray-ui);
            padding: 5px;
            border-radius: 10px;

            textarea {
                width: 85%;
                resize: none;
                height: 25px;
                padding: 5px 5px 0 5px;
                background-color: gray;
                border: none;
                color: white;
                font-weight: 600;

                &:focus {
                    outline: none;
                }
            }

            .emoji, .photo {
                margin-left: 10px;
                margin-right: 10px;
            }
        }

        .submit {
            margin-left: 10px;
        }
    }
</style>