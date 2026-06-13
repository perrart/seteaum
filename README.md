# ⚽ 7x1

Jogo casual de futebol em **React + TypeScript + Tailwind CSS + Vite**, todo
centrado na **Seleção Brasileira**. Você escolhe a **formação**, sorteia craques
de todas as Copas (Pelé, Garrincha, Ronaldo, Romário, Zico, Neymar e cia.), monta
o seu onze, **simula a campanha jogo a jogo** e gera um **card para compartilhar**.
O sonho é fechar a Copa com um **7 a 0** e levantar a taça.

Tudo roda 100% no navegador — sem backend, sem imagens externas, dados embutidos.

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
  App.tsx                 # máquina de estados (home → formação → jogo → simulação → card)
  main.tsx
  data/brazilData.ts      # elenco histórico da Seleção Brasileira (todas as Copas)
  types/index.ts          # tipos centrais (Player, Formation, DrawOption, CupResult...)
  utils/
    formations.ts         # 8 formações + posições no campo
    gameLogic.ts          # sorteio de 5, escalação, simulação da Copa, seed, link
    cardCanvas.ts         # gera a imagem PNG do card para download
    rarity.ts             # estilos por raridade
  components/             # Header, HomePage, FormationPicker, GamePage, DrawList,
                          # FieldView, CupSimulation, ShareCard, Footer
```

---

## 🎮 Como jogar

1. **Escolha a formação** — 4-3-3, 4-4-2, 4-2-3-1, 4-2-4, 3-5-2, 5-3-2, 4-5-1 ou 3-4-3.
2. **Sorteie e escale** — a cada rodada aparecem **5 jogadores** (um goleiro, um da
   defesa, um do meio, um do ataque e um aleatório). Escolha um para preencher a vaga.
   Quem já tem a posição ocupada no seu time aparece apagado, mas **sempre há pelo
   menos um selecionável**. Você tem **3 re-sorteios** por rodada.
3. **Simule a Copa** — com os 11 prontos, aperte **Simular Copa** e acompanhe a
   campanha jogo a jogo (placar, gols e minutos). Fase de grupos + mata-mata até o título.
4. **Veja o card** — ao final, gere um card com o time, as estatísticas e o craque da
   campanha. O botão **Compartilhar imagem** baixa um **PNG** pronto para mandar pros amigos.

Dá pra compartilhar o time também por um link (`?f=FORMACAO&team=id1,id2,...`) que
reconstrói a escalação no navegador de quem abrir.

> Química: como todos são do Brasil, o time fica mais entrosado quando você junta
> craques da **mesma era** (mesmo ano de Copa).

---
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
