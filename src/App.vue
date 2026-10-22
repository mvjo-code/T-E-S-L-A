<script setup>
import HeroSection from './components/HeroSection.vue'
import FsdSection from './components/FsdSection.vue'
import CarrosselRotativo from './components/CarrosselRotativo.vue'
import AssembleiaSection from './components/AssembleiaSection.vue'
import FooterTesla from './components/FooterTesla.vue'
import { modelos } from './data/modelos.js'
import { energia } from './data/energia.js'
</script>

<template>
  <HeroSection />
  <main class="conteudo">
    <FsdSection />

    <section id="modelos" class="bloco">
      <CarrosselRotativo :itens="modelos" rotulo="MODELOS" :inicio="1" />
    </section>

    <section class="bloco">
      <AssembleiaSection />
    </section>

    <section id="energia" class="bloco">
      <h2 class="titulo-secao">Find Your Charge</h2>
      <!-- o MESMO componente do carrossel de modelos, só com outros dados -->
      <CarrosselRotativo :itens="energia" rotulo="ENERGIA" :inicio="1" />
    </section>
  </main>
  <FooterTesla />
</template>

<style scoped>
.conteudo {
  max-width: 85rem;
  margin: 0 auto;
  padding: 1.5rem 2.75rem 5rem;
}

.bloco {
  margin-top: 4.5rem;
}

.titulo-secao {
  font-size: 1.9rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 800px) {
  .conteudo {
    padding: 1rem 1.25rem 4rem;
  }

  .bloco {
    margin-top: 3rem;
  }

  .titulo-secao {
    font-size: 1.4rem;
  }
}
</style>
