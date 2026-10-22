<script setup>
// As colunas do rodapé são dados: para mudar um link, é só editar aqui.
// O v-for do template desenha uma coluna para cada item desta lista.
const colunas = [
  { titulo: 'Veículos', links: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'] },
  { titulo: 'Energia', links: ['Powerwall', 'Painéis solares', 'Wall Connector', 'Supercharger'] },
  { titulo: 'Suporte', links: ['Central de suporte', 'Carregamento', 'Manuais', 'Conta Tesla'] },
  { titulo: 'Institucional', links: ['Sobre a Tesla', 'Carreiras', 'Notícias', 'Investidores'] },
]
</script>

<template>
  <footer class="rodape">
    <div class="interno">
      <div class="colunas">
        <a class="logo" href="#">TESLA</a>
        <nav v-for="coluna in colunas" :key="coluna.titulo">
          <h4>{{ coluna.titulo }}</h4>
          <a v-for="link in coluna.links" :key="link" href="#">{{ link }}</a>
        </nav>
      </div>
      <div class="legal">
        <span>Tesla © 2026 · Conceito de redesign não oficial, sem vínculo com a Tesla</span>
        <span>Privacidade · Termos de uso</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  border-top: 1px solid var(--borda);
}

.interno {
  padding: 3.2rem var(--margem) 1.5rem;
}

.colunas {
  display: grid;
  grid-template-columns: 1.4fr repeat(4, 1fr);
  gap: 1.5rem;
}

.logo {
  font: 1.1rem var(--fonte-titulo);
  letter-spacing: 0.4em;
}

h4 {
  font: 500 0.75rem var(--fonte-texto);
  color: var(--suave);
  margin-bottom: 0.9rem;
}

nav a {
  display: block;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
}

nav a:hover {
  text-decoration: underline;
}

.legal {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--borda);
  font-size: 0.7rem;
  color: var(--suave);
}

@media (max-width: 800px) {
  .interno {
    padding: 2.2rem var(--margem) 1.25rem;
  }

  .colunas {
    grid-template-columns: 1fr 1fr;
  }

  .logo {
    grid-column: 1 / -1;
  }

  .legal {
    flex-direction: column;
  }
}
</style>
