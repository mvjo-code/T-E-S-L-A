<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

// Props = o que o componente pai envia: o número final, quantas casas decimais,
// o texto depois do número (s, km/h, km) e quanto tempo dura a contagem.
const props = defineProps({
  valor: { type: Number, required: true },
  decimais: { type: Number, default: 0 },
  sufixo: { type: String, default: '' },
  duracao: { type: Number, default: 1600 }, // milissegundos
})

const exibido = ref(0)  // o número que aparece na tela agora (começa em 0)
let animacao = null     // guarda o "pedido" de quadro atual, para podermos cancelar

// Formata no padrão brasileiro: 2.1 vira "2,1" e 1500 vira "1.500"
function formatar(n) {
  return n.toLocaleString('pt-BR', {
    minimumFractionDigits: props.decimais,
    maximumFractionDigits: props.decimais,
  })
}

const textoFinal = computed(() => `${formatar(props.valor)} ${props.sufixo}`)
const textoVivo = computed(() => `${formatar(exibido.value)} ${props.sufixo}`)

function animar(alvo) {
  cancelAnimationFrame(animacao) // se já havia uma contagem rodando, para ela

  // Quem pediu "reduzir movimento" no sistema vê o número final direto, sem contagem
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    exibido.value = alvo
    return
  }

  const inicio = performance.now() // hora em que a contagem começou

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / props.duracao, 1) // vai de 0 a 1
    const suave = 1 - Math.pow(1 - progresso, 3)                    // começa rápido, termina devagar
    exibido.value = alvo * suave
    if (progresso < 1) animacao = requestAnimationFrame(passo)      // ainda não acabou: próximo quadro
  }
  animacao = requestAnimationFrame(passo)
}

// immediate: true => roda assim que o componente aparece (abertura da página)
// e roda de novo se o "valor" mudar.
watch(() => props.valor, animar, { immediate: true })

onUnmounted(() => cancelAnimationFrame(animacao)) // limpeza ao sair da tela
</script>

<template>
  <span class="numero">
    <!-- O texto FINAL fica invisível só para reservar a largura certa e nada pular durante a contagem -->
    <span class="reserva">{{ textoFinal }}</span>
    <!-- O texto que cresce fica por cima, na mesma posição -->
    <span class="vivo" aria-hidden="true">{{ textoVivo }}</span>
  </span>
</template>

<style scoped>
.numero { position: relative; display: inline-block; font-variant-numeric: tabular-nums; }
.reserva { opacity: 0; }
.vivo { position: absolute; left: 0; top: 0; white-space: nowrap; }
</style>