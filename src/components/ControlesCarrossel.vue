<script setup>
// Componente reutilizável: setas + pontinhos. Ele não decide nada sozinho,
// só avisa o pai (emit) quando uma seta é clicada. Vamos reaproveitar nos outros carrosséis.
defineProps({ total: Number, atual: Number })
defineEmits(['anterior', 'proximo'])
</script>

<template>
  <div class="controles">
    <button class="seta" aria-label="Anterior" @click="$emit('anterior')">‹</button>
    <div class="pontos">
      <i v-for="n in total" :key="n" :class="{ on: n - 1 === atual }"></i>
    </div>
    <button class="seta" aria-label="Próximo" @click="$emit('proximo')">›</button>
  </div>
</template>

<style scoped>
.controles {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.seta {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 0;
  background: #fff;
  color: #000;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.seta:hover {
  background: #ffffffe3;
  color: #000;
}

.seta:active {
  background: #fff;
  color: #000;
  transform: scale(0.9)
}

.pontos {
  display: flex;
  gap: 0.4rem;
}

.pontos i {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #4a5572;
  transition: background 0.2s;
}

.pontos i.on {
  background: #fff;
}
</style>
