<script setup>
import BotaoPill from './BotaoPill.vue'
const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="assembleia">
    <!-- O vídeo é o fundo da seção: preenche a caixa inteira, atrás de tudo -->
    <video class="fundo" :src="`${base}video/assembleia.mp4`" :poster="`${base}img/assembleia.jpg`" autoplay muted loop
      playsinline preload="metadata" @error="$event.target.style.display = 'none'"></video>

    <!-- Camada escura em degradê para o texto continuar legível sobre o vídeo -->
    <div class="sombra"></div>

    <!-- Textos e botão ficam POR CIMA do vídeo -->
    <div class="conteudo">
      <h2>2026 Annual<br />Shareholder Meeting</h2>
      <div class="lado">
        <p>The future of Tesla is in your hands. Learn why your vote matters.</p>
        <BotaoPill>Ler mais</BotaoPill>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* position: relative faz da seção a "referência" para as camadas absolutas lá dentro */
.assembleia {
  position: relative;
  aspect-ratio: 21 / 8;
  min-height: 20rem;
  overflow: hidden;
  border: 1px solid var(--borda);
  border-radius: 1.25rem;
  background: linear-gradient(135deg, #1c2740, #0b1220);
}

.fundo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sombra {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 25%, rgba(0, 0, 0, 0.78));
}

.conteudo {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  padding: 2.5rem 2.75rem;
}

h2 {
  font-size: 1.9rem;
  line-height: 1.25;
}

.lado {
  max-width: 19rem;
}

.lado p {
  font-size: 0.8rem;
  color: #dfe4ee;
  margin-bottom: 1rem;
}

@media (max-width: 800px) {
  .assembleia {
    aspect-ratio: auto;
    min-height: 24rem;
  }

  .conteudo {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 1.5rem 1.25rem;
    gap: 1rem;
  }

  h2 {
    font-size: 1.4rem;
  }
}
</style>