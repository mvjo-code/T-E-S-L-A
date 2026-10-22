<script setup>
// "variante" define o estilo: 'cheio' (branco) ou 'vazado' (só borda)
defineProps({ variante: { type: String, default: 'cheio' } })
</script>

<template>
  <a href="#" class="btn" :class="variante"><slot /></a>
</template>

<style scoped>
.btn { display: inline-block; padding: 0.7rem 1.4rem; border-radius: 99rem; font: 700 0.8rem var(--fonte-texto); border: 1px solid transparent; transition: transform 0.2s; }
.btn:hover { transform: translateY(-0.125rem); }
.cheio { background: #fff; color: #000; }
.vazado { color: #fff; border-color: #33425e; }
</style>
