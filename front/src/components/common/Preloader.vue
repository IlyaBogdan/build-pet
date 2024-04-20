<template>
    <dialog id="preloader" class="loader">
    </dialog>
</template>
<script>
export default {
    name: 'pre-loader',
    mounted() {
        document.getElementById('preloader').showModal();
    }
}
</script>
<style lang="scss" scoped>
    .loader {       
        position: fixed;
        top: 0;
        left: 0;
        border: none;
        background: none;
        width: 60px;
        aspect-ratio: 1;
        display: flex;
        animation: l10-0 2s infinite steps(1);
        outline: none;

        &::backdrop {
            background: rgba(255, 255, 255, 0.7);
        }
        
        &::before, &::after {
            content: "";
            flex: 1;
            animation: 
                l10-1 1s infinite linear alternate,
                l10-2 2s infinite steps(1) -.5s;
        }
        &::after {
            --s:-1,-1;
        }
        @keyframes l10-0 {
            0%  {transform: scaleX(1)  rotate(0deg)}
            50% {transform: scaleX(-1) rotate(-90deg)}
        }
        @keyframes l10-1 {
            0%,
            5%   {transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateY(0deg) }
            33%  {transform:scale(var(--s,1)) translate(-10px) perspective(150px) rotateX(0deg) }
            66%  {transform:scale(var(--s,1)) translate(-10px) perspective(150px) rotateX(-180deg)}
            95%,
            100% {transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateX(-180deg)}
        }
        @keyframes l10-2 {
            0%  {background:#514b82;border-radius: 0}
            50% {background:#25b09b;border-radius: 100px 0 0 100px}
        }
        
    }
</style>