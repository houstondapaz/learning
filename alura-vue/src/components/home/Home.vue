<template>
    <div>
        <h1 class="centralizado">{{titulo}}</h1>
        <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="digita aqui">
        <ul class="lista-fotos">
            <li class="lista-fotos-item" v-for="foto in fotosComFiltro">
                <meu-painel :titulo="foto.titulo">
                    <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
                    <meu-botao 
                        tipo="button" 
                        rotulo="REMOVER"
                        estilo="perigo"
                        :confirmacao="true"
                        @botaoAtivado="remove($event, foto)" 
                    />
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import Botao from '../shared/botao/Botao.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';

export default {
    components: {
        'meu-painel': Painel,
        'meu-botao': Botao,
        'imagem-responsiva': ImagemResponsiva
    },

    data() {
        return {
            titulo: 'Fotos ZIcas',
            fotos: [],
            filtro: ''
        }
    },

    computed: {
        fotosComFiltro() {
            if (this.filtro) {
                const exp = new RegExp(this.filtro.trim(), 'i');
                return this.fotos.filter(f => exp.test(f.titulo));
            } else
                return this.fotos;
        }
    },

    methods: {
        remove(e, foto) {
            console.log(e);
            alert(`Remove foto ${foto.titulo}`);
        }
    },

    created() {
        this.$http.get('http://localhost:3000/v1/fotos')
            .then(res => res.json())
            .then(fotos => this.fotos = fotos);
    }
}
</script>

<style lang="scss">
.centralizado {
    text-align: center;
}

.lista-fotos {
    list-style: none;
}

.lista-fotos .lista-fotos-item {
    display: inline-block;
}

.filtro {
    width: 100%;
}
</style>
