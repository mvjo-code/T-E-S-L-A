<script setup>
import { ref, computed, watch } from 'vue'
import NavBar from './NavBar.vue'
import BotaoPill from './BotaoPill.vue'
import ControlesCarrossel from './ControlesCarrossel.vue'
import { modelosHero } from '../data/modelosHero.js'

// 1) Qual slide está na tela (0 = primeiro). Quando muda, o Vue atualiza a tela.
const indice = ref(0)

// 2) Dados do slide atual, recalculados sempre que o índice muda
const modelo = computed(() => modelosHero[indice.value])

// 3) Os três números exibidos, montados a partir do modelo atual
const stats = computed(() => [
  { rotulo: 'Aceleração', valor: modelo.value.aceleracao },
  { rotulo: 'Velocidade', valor: modelo.value.velocidade },
  { rotulo: 'Autonomia', valor: modelo.value.autonomia },
])

// 4) Lista (comum, não reativa) que guarda cada elemento <video>.
//    Precisamos deles para mandar tocar e pausar pelo JavaScript.
const videos = []

// 5) Avançar e voltar: o % faz a lista dar a volta (depois do último, volta ao primeiro)
function proximo() {
  indice.value = (indice.value + 1) % modelosHero.length
}
function anterior() {
  indice.value = (indice.value - 1 + modelosHero.length) % modelosHero.length
}

// 6) Sempre que o slide muda, cuidamos dos vídeos:
//    - o que ENTRA volta ao início e toca (play)
//    - o que SAIU é pausado depois do fade, para não gastar processador à toa
watch(indice, (novo, antigo) => {
  const entrando = videos[novo]
  if (entrando) {
    entrando.currentTime = 0
    entrando.play().catch(() => { }) // o catch evita erro no console se o navegador recusar
  }
  setTimeout(() => {
    // só pausa se ele continuar fora da tela (a pessoa pode ter clicado rápido e voltado)
    if (antigo !== indice.value) videos[antigo]?.pause()
  }, 900)
})

const base = import.meta.env.BASE_URL
</script>

<template>
  <header class="hero">
    <!-- Um <video> para cada modelo, todos empilhados. Só o "ativo" fica visível (opacity 1);
         a troca é um fade entre eles. -->
    <video v-for="(m, i) in modelosHero" :key="m.video" :ref="(el) => (videos[i] = el)" class="fundo"
      :class="{ ativo: i === indice }" :src="`${base}video/${m.video}`" :autoplay="i === 0"
      :preload="i === 0 ? 'auto' : 'metadata'" muted loop playsinline
      @error="$event.target.style.display = 'none'"></video>

    <!-- Camada escura em degradê: garante a leitura do texto sobre qualquer cena -->
    <div class="sombra"></div>

    <NavBar />

    <div class="conteudo">
      <p class="chamada">DEVELOPING THE CARS OF THE FUTURE</p>

      <!-- Transition + :key: quando o modelo muda, o bloco antigo sai e o novo entra com fade -->
      <Transition name="troca" mode="out-in">
        <div :key="modelo.nome">
          <h1>{{ modelo.nome }}</h1>
          <ul class="stats">
            <li v-for="s in stats" :key="s.rotulo">
              <span>{{ s.rotulo }}</span>
              <b>{{ s.valor }}</b>
            </li>
          </ul>
        </div>
      </Transition>

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
  background: #060914;
}

.fundo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.9s ease;
}

.fundo.ativo {
  opacity: 1;
}

/* Escurece mais à esquerda (onde fica o texto) e funde o final do hero com o fundo da página */
.sombra {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(5, 8, 16, 0.85) 0%, rgba(5, 8, 16, 0.45) 45%, rgba(5, 8, 16, 0.1) 100%),
    linear-gradient(transparent 65%, var(--fundo));
}

.conteudo {
  position: relative;
  z-index: 2;
  padding: 0 var(--margem);
  width: 100%;
}

.chamada {
  color: #b4bccd;
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
  color: #b4bccd;
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

/* Animação de troca do título e dos números */
.troca-enter-active,
.troca-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.troca-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}

.troca-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (max-width: 800px) {
  .hero {
    min-height: 40rem;
    padding-top: 6rem;
  }

  .controles-hero {
    right: var(--margem);
    bottom: 1.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {

  .fundo,
  .troca-enter-active,
  .troca-leave-active {
    transition: none;
  }
}
</style>