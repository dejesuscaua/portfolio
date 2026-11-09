# Portfólio · Cauã Gonçalves

Portfólio pessoal de **Cauã Gonçalves de Jesus**, Analista DevOps Júnior (Azure · Terraform · Kubernetes).

Site estático em HTML, CSS e JavaScript puro, sem build e sem dependências, pronto para a Vercel.

## Estrutura

```
index.html          conteúdo do site (todas as seções)
css/style.css       estilos, tema claro/escuro e responsividade
js/script.js        tema, menu mobile, animações e terminal
assets/             imagens e currículo em PDF
vercel.json         headers e cache
```

## Rodar localmente

```bash
npx serve .
# ou
python3 -m http.server 3000
```

## Deploy na Vercel

1. Em vercel.com, clique em **Add New → Project** e importe este repositório.
2. Framework Preset: **Other**. Deixe Build Command e Output Directory vazios.
3. Clique em **Deploy**. Cada push na `main` gera um novo deploy automaticamente.

## Atualizar o conteúdo

- Textos e experiências: edite `index.html`.
- Currículo: substitua `assets/curriculo-caua-goncalves.pdf` mantendo o mesmo nome.
