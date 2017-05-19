//Para usar globalmente
//import Vue from 'vue';
//Vue.directive('meu-transform', { 

export default {
    bind(el, binding, vnode) {
        let current = 0;
        
        //binding contem:
        // - value (v-diretiva="value")
        // - arg (v-diretiva:arg="value")
        // - modifiers (v-diretiva.modifier1.modifier2)

        function onClick() {
            let incremento = binding.value || 90;
            let efeito;

            if (!binding.arg || binding.arg == 'rotate') {
                if (binding.modifiers.reverse)
                    current -= incremento;
                else
                    current += incremento;

                efeito = `rotate(${current}deg)`;
            } else if (binding.arg = 'scale')
                efeito = `scale(${incremento})`;

            el.style.transform = efeito;

            if (binding.modifiers.animate)
                el.style.transition = "transform 0.5s";

        }

        el.addEventListener('click', onClick);
    }
}
