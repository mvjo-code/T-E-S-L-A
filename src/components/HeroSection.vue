<script setup>
import { ref, computed } from 'vue'
import NavBar from './NavBar.vue'
import BotaoPill from './BotaoPill.vue'
import ControlesCarrossel from './ControlesCarrossel.vue'
import { modelosHero } from '../data/modelosHero.js'

// 1) "indice" guarda qual carro está na tela (0 = primeiro). ref() torna o valor
//    "reativo": quando ele muda, o Vue atualiza a tela sozinho.
const indice = ref(0)

// 2) "modelo" é calculado a partir do índice. Sempre que o índice muda,
//    o computed recalcula e o template mostra os dados do carro novo.
const modelo = computed(() => modelosHero[indice.value])

// 3) Textos das estatísticas, também derivados do modelo atual
const stats = computed(() => [
  { rotulo: 'Aceleração', valor: modelo.value.aceleracao },
  { rotulo: 'Velocidade', valor: modelo.value.velocidade },
  { rotulo: 'Autonomia', valor: modelo.value.autonomia },
])

// 4) Avançar: soma 1 e usa % (resto da divisão) para voltar ao 0 depois do último
function proximo() {
  indice.value = (indice.value + 1) % modelosHero.length
}

// 5) Voltar: soma o total antes do % para nunca ficar negativo quando está no 0
function anterior() {
  indice.value = (indice.value - 1 + modelosHero.length) % modelosHero.length
}

// 6) Caminho base das imagens (funciona local e no GitHub Pages)
const base = import.meta.env.BASE_URL
</script>

<template>
  <header class="hero">
    <NavBar />
    <div class="brilho"></div>

    <!-- :key faz o Vue recriar a imagem a cada carro novo, e assim a animação de entrada roda de novo -->
    <img :key="modelo.nome" class="carro" :src="`${base}img/${modelo.img}`" :alt="modelo.nome"
      @error="$event.target.style.display = 'none'" />

    <div class="conteudo">
      <p class="chamada">DEVELOPING THE CARS OF THE FUTURE</p>
      <h1>{{ modelo.nome }}</h1>

      <ul class="stats">
        <li v-for="s in stats" :key="s.rotulo">
          <span>{{ s.rotulo }}</span>
          <b>{{ s.valor }}</b>
        </li>
      </ul>

      <div class="acoes">
        <BotaoPill>Personalizar</BotaoPill>
        <BotaoPill variante="vazado">Ver detalhes</BotaoPill>
      </div>
    </div>

    <ControlesCarrossel class="controles-hero" :total="modelosHero.length" :atual="indice" @anterior="anterior"
      @proximo="proximo" />
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 47.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: radial-gradient(ellipse at 75% 55%, #1c2a45 0%, #0a1020 55%, #060914 100%);
}

.brilho {
  position: absolute;
  right: 4%;
  bottom: 10%;
  width: 52%;
  aspect-ratio: 16 / 6;
  border-radius: 50%;
  background: radial-gradient(ellipse, #2a3550, transparent 70%);
  filter: blur(2rem);
}

.carro {
  position: absolute;
  right: -4%;
  bottom: 6%;
  width: 60%;
  max-width: 72rem;
  z-index: 1;
  animation: chega 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes chega {
  from {
    opacity: 0;
    transform: translateX(18rem) scale(0.6);
    filter: blur(0.5rem);
  }

  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

.conteudo {
  position: relative;
  z-index: 2;
  padding: 0 var(--margem);
  width: 100%;
}

.chamada {
  color: var(--suave);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
}

h1 {
  font-size: clamp(2.75rem, 6vw, 5.25rem);
  line-height: 1.05;
  margin: 0.9rem 0 2.25rem;
  max-width: 35rem;
}

.stats {
  display: flex;
  gap: 2.75rem;
  list-style: none;
  margin-bottom: 3.75rem;
}

.stats span {
  display: block;
  font-size: 0.65rem;
  color: var(--suave);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stats b {
  font-size: 1.15rem;
  font-weight: 500;
}

.acoes {
  display: flex;
  gap: 0.75rem;
}

.controles-hero {
  position: absolute;
  right: var(--margem);
  bottom: 3.75rem;
  z-index: 3;
}

@media (max-width: 800px) {
  .hero {
    align-items: flex-start;
    padding-top: 7.5rem;
  }

  .carro {
    width: 120%;
    right: -20%;
    bottom: 6rem;
  }

  .controles-hero {
    right: var(--margem);
    bottom: 1.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carro {
    animation: none;
  }
}
</style>
