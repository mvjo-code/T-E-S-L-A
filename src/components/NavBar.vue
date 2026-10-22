<script setup>
import { ref } from 'vue'

const links = ['Modelos', 'Comprar', 'Supercharger', 'Solar', 'More']
const menuAberto = ref(false) // false = menu do celular fechado
</script>

<template>
  <nav class="nav">
    <a class="logo" href="#">TESLA</a>
    <button class="menu-btn" @click="menuAberto = !menuAberto">Menu</button>
    <ul :class="{ aberto: menuAberto }">
      <li v-for="(link, i) in links" :key="link" :class="{ ativo: i === 0 }">
        <a href="#">{{ link }}</a>
      </li>
    </ul>
    <span class="icones" aria-hidden="true">🌐 ? ☺</span>
  </nav>
</template>

<style scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 2.75rem;
  font-size: 0.8rem;
}

.logo {
  font: 0.9rem var(--fonte-titulo);
  letter-spacing: 0.4em;
}

ul {
  display: flex;
  gap: 1.6rem;
  list-style: none;
}

ul a {
  transition: color 0.2s;
}

ul a:hover { text-underline-offset: 0.3rem; color: #ffffffc7; }

.ativo {
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
    padding: 1.1rem 1.25rem;
  }

  .menu-btn {
    display: block;
  }

  ul {
    display: none;
    position: absolute;
    top: 4rem;
    left: 1.25rem;
    right: 1.25rem;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    border-radius: 0.9rem;
    background: var(--painel);
  }

  ul.aberto {
    display: flex;
  }

  .icones {
    display: none;
  }
}
</style>
