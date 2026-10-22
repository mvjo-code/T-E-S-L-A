import { ref, onMounted, onUnmounted } from 'vue'

// Um "composable" é uma função que guarda uma lógica reutilizável.
// Esta faz um número contar de 0 até "alvo" quando o elemento aparece na tela.
export function useContagem(alvo, duracao = 1800) {
  const valor = ref(0)        // número mostrado na tela (começa em 0)
  const elemento = ref(null)  // vai guardar o elemento HTML observado
  let observador

  function iniciar() {
    const inicio = performance.now() // hora em que a contagem começou (ms)

    function passo(agora) {
      // progresso vai de 0 a 1 conforme o tempo passa
      const progresso = Math.min((agora - inicio) / duracao, 1)
      // easing: começa rápido e desacelera no final
      const suave = 1 - Math.pow(1 - progresso, 3)
      valor.value = Math.round(alvo * suave)
      if (progresso < 1) requestAnimationFrame(passo) // ainda não acabou: próximo quadro
    }
    requestAnimationFrame(passo)
  }

  // onMounted roda quando o componente já está na tela (e o elemento existe)
  onMounted(() => {
    observador = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {  // o elemento apareceu na janela
        iniciar()
        observador.disconnect()      // conta uma vez só
      }
    }, { threshold: 0.4 })           // dispara com 40% do elemento visível
    observador.observe(elemento.value)
  })

  // Ao sair da página, desliga o observador para não deixar lixo na memória
  onUnmounted(() => observador?.disconnect())

  return { valor, elemento }
}
