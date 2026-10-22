<script setup>
import { ref } from 'vue'
import BotaoPill from './BotaoPill.vue'
import ControlesCarrossel from './ControlesCarrossel.vue'

// Recebe a lista de cards (itens), o texto do rodapé (rotulo) e qual card começa no centro (inicio)
const props = defineProps({
  itens: { type: Array, required: true },
  rotulo: { type: String, default: '' },
  inicio: { type: Number, default: 0 },
})

const total = props.itens.length
const atual = ref(props.inicio)                                // índice do card que está no centro
const semTransicao = ref(props.itens.map(() => false))         // quais cards "pulam" em vez de deslizar
const base = import.meta.env.BASE_URL

// 1) Posição relativa de um card em relação ao centro:
//    0 = centro, -1 = esquerda, 1 = direita. O % faz a lista funcionar em círculo.
function deslocamento(i, centro = atual.value) {
  let d = (i - centro + total) % total   // distância "para frente" (de 0 até total-1)
  if (d > total / 2) d -= total          // se for mais perto "por trás", vira número negativo
  return d
}

// 2) Traduz o deslocamento em um nome de classe, que o CSS usa para posicionar o card
function posicao(i) {
  const d = deslocamento(i)
  if (d === 0) return 'centro'
  if (d === -1) return 'esq'
  if (d === 1) return 'dir'
  return 'oculto'
}

// 3) Gira o carrossel. passo = 1 (avançar) ou -1 (voltar)
function mover(passo) {
  const novo = (atual.value + passo + total) % total
  // O card que sai de uma ponta e reaparece na outra (diferença maior que 1) não pode
  // atravessar o centro deslizando: ele "pula" direto, sem transição.
  semTransicao.value = props.itens.map((_, i) => Math.abs(deslocamento(i, novo) - deslocamento(i)) > 1)
  atual.value = novo
}

// 4) Clicar num card lateral traz ele para o centro
function clicar(i) {
  const d = deslocamento(i)
  if (d === -1 || d === 1) mover(d)
}
</script>

<template>
  <div class="carrossel">
    <div class="palco">
      <article v-for="(item, i) in itens" :key="item.nome" class="card"
        :class="[posicao(i), { 'sem-transicao': semTransicao[i] }]" @click="clicar(i)">
        <img :src="`${base}img/${item.img}`" alt="" @error="$event.target.style.display = 'none'" />
        <div class="sombra"></div>

        <!-- visível só no card do centro -->
        <div class="info-centro">
          <p class="categoria">{{ item.categoria }}</p>
          <div>
            <h3>{{ item.nome }}</h3>
            <p class="descricao">{{ item.descricao }}</p>
            <div class="acoes">
              <BotaoPill v-for="b in item.botoes" :key="b.texto" :variante="b.variante">{{ b.texto }}</BotaoPill>
            </div>
          </div>
        </div>

        <!-- visível só nos cards laterais -->
        <div class="info-mini">
          <small>{{ item.miniSub }}</small>
          <strong>{{ item.nome }}</strong>
        </div>
      </article>
    </div>

    <div class="rodape">
      <span>{{ rotulo }}</span>
      <ControlesCarrossel :total="total" :atual="atual" @anterior="mover(-1)" @proximo="mover(1)" />
    </div>
  </div>
</template>

<style scoped>
.palco {
  --duracao: 0.45s;
  /* <- velocidade do carrossel: diminua para ficar mais rápido */
  --ease: cubic-bezier(0.65, 0, 0.35, 1);
  position: relative;
  height: clamp(27.5rem, 31vw, 40rem);
}

.card {
  position: absolute;
  overflow: hidden;
  border-radius: 1.1rem;
  border: 1px solid var(--borda);
  background: linear-gradient(160deg, #1c2740, #0b1220);
  transition: left var(--duracao) var(--ease), width var(--duracao) var(--ease), height var(--duracao) var(--ease), top var(--duracao) var(--ease), opacity var(--duracao);
}

.card.sem-transicao {
  transition: none;
}

/* As quatro posições possíveis */
.centro {
  left: 15%;
  width: 70%;
  top: 0;
  height: 100%;
  z-index: 2;
}

.esq,
.dir,
.oculto {
  top: 34%;
  height: 32%;
  width: 13%;
  cursor: pointer;
}

.esq {
  left: 0;
}

.dir {
  left: 87%;
}

.oculto {
  left: 43.5%;
  opacity: 0;
  pointer-events: none;
}

.card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sombra {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 35%, rgba(0, 0, 0, 0.82));
}

.info-centro {
  position: absolute;
  inset: 0;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: opacity 0.3s calc(var(--duracao) * 0.5);
}

.card:not(.centro) .info-centro {
  opacity: 0;
  pointer-events: none;
  transition-delay: 0s;
}

.categoria {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: #d3d9e6;
}

h3 {
  font-size: clamp(1.5rem, 3.2vw, 2.6rem);
  margin-bottom: 0.4rem;
}

.descricao {
  font-size: 0.9rem;
  color: #d3d9e6;
  margin-bottom: 1.1rem;
}

.acoes {
  display: flex;
  gap: 0.75rem;
}

.info-mini {
  position: absolute;
  left: 0.8rem;
  bottom: 0.7rem;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.4s;
}

.card:not(.centro) .info-mini {
  opacity: 1;
}

.info-mini small {
  font-size: 0.55rem;
  color: var(--suave);
}

.info-mini strong {
  font-size: 0.8rem;
  font-weight: 500;
}

.rodape {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.4rem 1.4rem 0;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--suave);
}

@media (max-width: 800px) {
  .palco {
    height: 23rem;
  }

  .centro {
    left: 10%;
    width: 80%;
  }

  .esq,
  .dir,
  .oculto {
    width: 8%;
  }

  .dir {
    left: 92%;
  }

  .oculto {
    left: 46%;
  }

  .info-mini {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
</style>
