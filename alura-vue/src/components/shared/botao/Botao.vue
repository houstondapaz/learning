<template>
    <button @click="disparaAcao()" :class="estiloDoBotao" :type="tipo">
        {{ rotulo }}
    </button>
</template>

<script>
export default {
    props: {
        rotulo: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        estilo: {
            type: String,
            default: 'padrao'
        },
        confirmacao: Boolean
    },

    methods: {
        disparaAcao() {
            if (this.confirmacao) {
                if (confirm('Confirma Acao?'))
                    this.$emit('botaoAtivado', new Date());
            } else
                this.$emit('botaoAtivado', new Date());

        }
    },

    computed: {
        estiloDoBotao() {

            // se o valor é padrão ou não passou nada para estilo
            if (this.estilo == 'padrao' || !this.estilo) return 'botao botao-padrao';

            if (this.estilo == 'perigo') return 'botao botao-perigo';
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './Botao.scss';
</style>
