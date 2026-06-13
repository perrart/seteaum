# ⚽ 7x1

Jogo casual de futebol em **React + TypeScript + Tailwind CSS + Vite**.
Você monta uma seleção dos sonhos com craques históricos de Copas do Mundo: a cada
rodada o sistema sorteia **uma seleção + uma edição da Copa**, você escolhe um jogador
daquele elenco para a posição da vez, completa os 11 e **simula a partida**. O objetivo
emocional é vencer por **7 a 0**.

Tudo roda 100% no navegador — sem backend, sem imagens externas, dados mockados.

---

## 🚀 Rodando localmente (opcional)

Pré-requisito: **Node.js 18+**.

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # gera a versão de produção na pasta dist/
npm run preview  # serve localmente o build de produção
```

---

## 🧩 Estrutura

```
src/
  App.tsx                 # máquina de estados das telas (home/jogo/resultado/compartilhado)
  main.tsx
  data/mockData.ts        # 12 seleções, ~163 jogadores
  types/index.ts          # tipos centrais (Player, Squad, SimulationResult...)
  utils/
    gameLogic.ts          # draft, sorteio, simulação, link de compartilhamento
    rarity.ts             # estilos por raridade
    flags.ts              # bandeiras (emoji) por seleção/ano
  components/             # Header, HomePage, GamePage, ResultPage, LineupField, etc.
```

---

## 🎮 Como jogar

1. **Role** — o sistema sorteia uma seleção e uma Copa.
2. **Monte** — escolha um craque compatível com a posição atual (ordem fixa: GOL, LD, ZAG, ZAG, LE, VOL, MEI, MEI, PE, CA, PD).
3. **Simule** — com os 11 preenchidos, descubra se seu time chega ao 7 a 0.

Você tem **3 rerolls** por partida. Pode compartilhar o time por um link (`?team=id1,id2,...`)
que reconstrói a escalação no navegador de quem abrir.

---

## 🌐 Hospedando no GitHub pelo navegador (repositório `seteaum`)

Sem usar terminal — só pelo site do GitHub. O projeto já vem pronto para o GitHub Pages:
o `vite.config.ts` usa `base: "./"` e o fluxo de publicação já está incluído em
`.github/workflows/deploy.yml`, então o site é montado automaticamente.

> Antes de começar: descompacte o `7x1.zip`. Você vai enviar **o conteúdo de dentro**
> da pasta (os arquivos `index.html`, `package.json`, a pasta `src`, a pasta `.github`,
> etc.) — **não** envie a pasta `node_modules` (ela nem está no zip, é gerada sozinha).

### Passo 1 — Criar o repositório

1. Acesse <https://github.com/new>.
2. Em **Repository name**, digite `seteaum`.
3. Deixe como **Public**.
4. **Não** marque "Add a README" nem nenhuma outra opção (deixe o repositório vazio).
5. Clique em **Create repository**.

### Passo 2 — Enviar os arquivos (arrastar e soltar)

1. Na página do repositório recém-criado, clique em **uploading an existing file**
   (ou em **Add file → Upload files**).
2. Abra a pasta descompactada no seu computador, **selecione todos os arquivos e pastas
   de dentro dela** (incluindo a pasta `.github`) e **arraste para a área de upload** do GitHub.
   - Dica: a pasta `.github` pode ficar "escondida". Se ela não subir junto, faça um
     segundo upload arrastando só a pasta `.github` — é ela que publica o site.
3. Embaixo, em **Commit changes**, clique em **Commit changes**.

### Passo 3 — Ligar o GitHub Pages

1. No repositório, vá em **Settings** (aba do topo) → **Pages** (menu da esquerda).
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Pronto — não precisa configurar mais nada.

### Passo 4 — Aguardar a publicação

1. Vá na aba **Actions** do repositório. Um fluxo chamado *"Deploy to GitHub Pages"*
   vai rodar sozinho (instala, faz o build e publica). Leva ~1–2 minutos.
2. Quando ficar verde, seu jogo estará no ar em:

   ```
   https://SEU_USUARIO.github.io/seteaum/
   ```

   (troque `SEU_USUARIO` pelo seu nome de usuário do GitHub)

### Atualizando o jogo depois

Para mudar qualquer coisa, é só editar/enviar os arquivos de novo pelo navegador
(**Add file → Upload files** ou editando direto no GitHub). Cada novo commit dispara
o deploy automático de novo.

### Observações

- O `base: "./"` já está configurado — funciona em subpasta (`/seteaum/`), na raiz ou
  com domínio próprio, sem mexer em nada.
- Se o site não aparecer logo de cara, espere 1–2 minutos e atualize a página.

Bom jogo — e que venha o 7 a 0! 🏆
