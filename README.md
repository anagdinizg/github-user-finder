# GitHub User Finder

Aplicação que permite buscar informações públicas de usuários do GitHub, com histórico de buscas e cache local.

Desenvolvido com **React + TypeScript**, estilizado com **TailwindCSS** de forma responsiva, e testado com **Vitest**.

---

## Funcionalidades

- Buscar usuários do GitHub pelo nome
- Cache local dos dados para evitar requisições repetidas
- Histórico de buscas persistido no localStorage
- Visualizar usuários com mais seguidores no GitHub

---

## Escolhas Técnicas

### Por que escolhi o React
O **React** é uma tecnologia com a qual já tenho bastante familiaridade. Desde que soube que a vaga para a qual estou me candidatando envolve **desenvolvimento mobile**, comecei a estudar **React Native com Expo**.

No entanto, como ainda estou nos primeiros dias de estudo com o React Native, não me senti confiante em realizar o desafio diretamente com ele.  
Por isso, decidi usar o **React (Web)** para demonstrar minhas habilidades atuais e, ao mesmo tempo, aplicar os princípios de **responsividade**, o que tem relação direta com o desenvolvimento mobile.

---

### Por que escolhi o TailwindCSS
Escolhi o **TailwindCSS** porque é uma ferramenta que já utilizei com frequência para construir interfaces responsivas de forma prática e rápida.

- Permite focar na lógica da aplicação sem abrir mão de um bom visual
- Oferece controle detalhado e direto com classes utilitárias
- Ideal para projetos onde **a velocidade e clareza na estilização são prioridade**

---

### Por que escolhi o Vitest
Embora eu tivesse experiência anterior com o Jest, optei por utilizar o **Vitest + @testing-library/react** neste projeto por oferecer uma **melhor integração com projetos Vite + React**.

- É leve, rápido e moderno
- Possui sintaxe e práticas semelhantes ao Jest, o que facilitou a transição
- Vi no desafio uma oportunidade para sair da zona de conforto e aprender uma ferramenta mais atual

---

## Estrutura do Projeto
api → Comunicação com a API externa (Github)
components → Componentes reutilizáveis
pages → Páginas principais (Home e History)
services → Lógica de negócio (cache e histórico)
tests → Testes unitários
types → Tipagem TypeScript

---

## Desafios Enfrentados

### 1. Configuração e uso do Vitest
Apesar da minha experiência anterior com o Jest, esta foi a **primeira vez que utilizei o Vitest**.  
A curva de aprendizado foi leve, mas enfrentei dificuldades na configuração do ambiente de testes com o Vite, especialmente para simular corretamente:
- funcionalidades do react-router-dom
- acesso ao localStorage

Mesmo assim, considerei essencial aprender e aplicar uma **ferramenta moderna** e mais integrada com o ecossistema do React.

---

### 2. Integração com o TailwindCSS
Embora já tivesse experiência com o Tailwind, tive problemas iniciais na configuração com Vite:
- temas personalizados não aplicados corretamente
- classes utilitárias ignoradas no build

Foi necessário ajustar os arquivos:
- tailwind.config.ts
- postcss.config.js
- index.css

Com esses ajustes, consegui garantir que a responsividade fosse aplicada corretamente.

---

## Propostas para Escalabilidade Futura

- **API Layer mais robusta:** centralizar chamadas HTTP com tratamento de erros, retry e cache.
- **Persistência remota:** mover os dados do localStorage para uma solução como Firebase.
- **Gerenciamento de estado:** usar Context API ou Redux Toolkit conforme a complexidade crescer.
- **Modularização de estilos:** criar tokens de design reutilizáveis com Tailwind e considerar o uso de Storybook.

---
## Como Rodar o Projeto

### 1. Instalar dependências
npm install


### 2. Rodar localmente
npm run dev

### 3. Rodar os testes
npx vitest


