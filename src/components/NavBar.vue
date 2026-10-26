<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const base = import.meta.env.BASE_URL

const icones = [
  { arquivo: 'internet.svg', nome: 'Idioma' },
  { arquivo: 'question.svg', nome: 'Ajuda' },
  { arquivo: 'user.svg', nome: 'Minha conta' },
]

// Cada link tem o texto e o destino (href). "#modelos" leva à seção com id="modelos".
const links = [
  { texto: 'Modelos', href: '#modelos' },
  { texto: 'Comprar', href: '#' },
  { texto: 'Supercharger', href: '#' },
  { texto: 'Solar', href: '#energia' },
  { texto: 'More', href: '#' },
]

const menuAberto = ref(false) // menu do celular: false = fechado
const rolou = ref(false)      // true quando a pessoa já rolou a página um pouco

// 1) Descobre se a página já rolou. window.scrollY é quantos pixels foram rolados.
function aoRolar() {
  rolou.value = window.scrollY > 40
}

// 2) onMounted roda quando o menu já está na tela: aí começamos a "ouvir" a rolagem.
//    O { passive: true } avisa o navegador que não vamos bloquear a rolagem (mais fluido).
onMounted(() => {
  aoRolar() // checa já na abertura (caso a página recarregue no meio)
  window.addEventListener('scroll', aoRolar, { passive: true })
})

// 3) Ao sair da tela, paramos de ouvir (senão o listener ficaria vivo à toa)
onUnmounted(() => window.removeEventListener('scroll', aoRolar))
</script>

<template>
  <!-- :class="{ rolou }" liga a classe "rolou" quando a variável rolou é true -->
  <nav class="nav" :class="{ rolou }">
    <a class="logo" href="#" aria-label="Tesla, página inicial">
      <img :src="`${base}icons/logo_tesla.svg`" alt="logo" />
    </a>
    <button class="menu-btn" @click="menuAberto = !menuAberto">Menu</button>
    <ul :class="{ aberto: menuAberto }">
      <li v-for="(link, i) in links" :key="link.texto" :class="{ ativo: i === 0 }">
        <a :href="link.href" @click="menuAberto = false">{{ link.texto }}</a>
      </li>
    </ul>
    <<div class="icones">
      <button v-for="icone in icones" :key="icone.arquivo" class="icone" :aria-label="icone.nome">
        <img :src="`${base}icons/${icone.arquivo}`" alt="" />
      </button>
      </div>
  </nav>
</template>

<style scoped>
/* fixed = fica preso no topo da janela, mesmo rolando */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem var(--margem);
  font-size: 0.8rem;
  border-bottom: 1px solid transparent;
  transition: padding 0.3s ease, background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
}

/* depois de rolar: fundo escuro translúcido com desfoque, e o menu fica mais compacto */
.nav.rolou {
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  background: rgba(5, 8, 16, 0.72);
  backdrop-filter: blur(0.75rem);
  border-bottom-color: var(--borda);
}

.logo img {
  display: block;
  height: 1rem;
  width: auto;
  filter: brightness(0) invert(1);
}

.icones {
  display: flex;
  gap: 1.1rem;
}

.icone {
  background: none;
  border: 0;
  padding: 0.25rem;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s, transform 0.2s;
}

.icone:hover {
  opacity: 0.8;
  transform: translateY(-0.08rem);
}

.icone img {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  filter: brightness(0) invert(1);
}

ul {
  display: flex;
  gap: 1.6rem;
  list-style: none;
}

/* HOVER: o sublinhado é um pseudo-elemento (::after) que "cresce" quando passa o mouse */
li a {
  position: relative;
  display: inline-block;
  padding: 0.3rem 0;
  color: #c4cbd9;
  transition: color 0.2s;
}

li a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  /* começa "zerado", preso à esquerda */
  transition: transform 0.25s ease;
}

li a:hover {
  color: #fff;
}

li a:hover::after {
  transform: scaleX(1);
}

/* :hover (estado) + ::after (elemento criado) */
.ativo a {
  color: #fff;
  font-weight: 700;
}

.menu-btn {
  display: none;
  background: none;
  border: 1px solid #33425e;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
}

@media (max-width: 800px) {
  .nav {
    padding: 1.1rem var(--margem);
  }

  .nav.rolou {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }

  .menu-btn {
    display: block;
  }

  ul {
    display: none;
    position: absolute;
    top: 100%;
    left: var(--margem);
    right: var(--margem);
    margin-top: 0.5rem;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.25rem;
    border-radius: 0.9rem;
    background: var(--painel);
    border: 1px solid var(--borda);
  }

  ul.aberto {
    display: flex;
  }

  .icones {
    display: none;
  }
}
</style>