<template>
    <div>
        <h1 class="centralizado">{{titulo}}</h1>
        <p v-show="mensagem">{{mensagem}}</p>
        <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="digita aqui">
        <ul class="lista-fotos">
            <li class="lista-fotos-item" v-for="foto in fotosComFiltro">
                <meu-painel :titulo="foto.titulo">
                    <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:scale.animate="1.1" />
                    <router-link :to="{ name : 'altera', params : { id : foto._id } }">
                        <meu-botao tipo="button" rotulo="ALTERAR" />
                    </router-link>
                    <meu-botao tipo="button" rotulo="REMOVER" estilo="perigo" :confirmacao="true" @botaoAtivado="remove($event, foto)" />
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import Botao from '../shared/botao/Botao.vue';
import TransformDirective from '../../directives/Transform';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import FotoService from '../../domain/foto/FotoService';

export default {
    components: {
        'meu-painel': Painel,
        'meu-botao': Botao,
        'imagem-responsiva': ImagemResponsiva
    },

    directives: {
        'meu-transform': TransformDirective
    },

    data() {
        return {
            mensagem: '',
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
            this.fotoService.apaga(foto._id)
                .then(() => {
                    this.fotos = this.fotos.filter(f => f._id != foto._id);
                    this.mensagem = "foto removida com sucesso";
                },
                err => this.mensagem = err.message);
        }
    },

    created() {
        this.fotoService = new FotoService(this.$resource);
        this.fotoService
            .list()
            .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
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
