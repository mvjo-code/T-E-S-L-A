<script setup>
import BotaoPill from './BotaoPill.vue'
import { useContagem } from '../composables/useContagem.js'

// Cada chamada devolve o número atual (valor) e a "ref" do elemento a observar.
// O nome da variável da ref precisa ser igual ao ref="..." do template.
const { valor: colisoes, elemento: elColisoes } = useContagem(7)
const { valor: milhas, elemento: elMilhas } = useContagem(15790405278, 90000)

const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="fsd">
    <div class="texto">
      <h2>Full Self-Driving (Supervised)</h2>
      <p>Makes every drive easier. Subscribe for $99/mo.¹</p>

      <div class="numeros">
        <div>
          <b ref="elColisoes">{{ colisoes }}x</b>
          <span>Fewer collisions</span>
        </div>
        <div>
          <!-- toLocaleString('en-US') coloca as vírgulas: 15,790,405,278 -->
          <b ref="elMilhas">{{ milhas.toLocaleString('en-US') }}</b>
          <span>Miles driven</span>
        </div>
      </div>

      <div class="acoes">
        <BotaoPill>Schedule Demo</BotaoPill>
        <BotaoPill variante="vazado">Learn More</BotaoPill>
      </div>
    </div>

    <div class="foto">
      <!-- autoplay + muted + loop + playsinline: o navegador só deixa tocar sozinho se estiver sem som -->
      <video :src="`${base}video/fsd.webm`" :poster="`${base}img/fsd.jpg`" autoplay muted loop playsinline
        preload="metadata" @error="$event.target.style.display = 'none'"></video>
    </div>
  </section>
</template>

<style scoped>
.fsd {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  border: 1px solid var(--borda);
  border-radius: 1.25rem;
  overflow: hidden;
  background: var(--painel);
}

.texto {
  padding: 2.5rem 2.75rem;
}

h2 {
  font-size: 2.4rem;
  line-height: 1.2;
  margin-bottom: 0.9rem;
}

p {
  font-size: 1rem;
  color: #c4cbd9;
  margin-bottom: 1.4rem;
}

.numeros {
  display: flex;
  gap: 4rem;
  margin-bottom: 1.6rem;
}

.numeros b {
  display: block;
  font: 1.4rem var(--fonte-titulo);
}

.numeros span {
  font-size: 0.65rem;
  color: var(--suave);
  text-transform: uppercase;
}

.acoes {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
}

.foto {
  min-height: 16rem;
  background: linear-gradient(135deg, #1c2740, #0b1220);
}

.foto video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 800px) {
  .fsd {
    grid-template-columns: 1fr;
  }

  .texto {
    padding: 1.75rem 1.4rem;
  }

  .numeros b {
    font-size: 1.1rem;
  }
}
</style>
