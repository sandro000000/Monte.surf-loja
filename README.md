# monte.surf — loja de roupas masculinas (site)

> Projeto demonstrativo: site de e-commerce estilo C&A com tema surf e rodapé interativo.

## Stack usado
- Vite + React
- TailwindCSS

## Funcionalidades implementadas
- Página inicial com hero e destaques
- Loja com grade de produtos
- Páginas de produto
- Carrinho com persistência local (localStorage)
- Rodapé interativo com SVG de onda e newsletter
- Paleta de cores moderna (teal, azul profundo, areia, pôr do sol)

## Como rodar localmente

1) Instale dependências

```bash
npm install
```

2) Rode em modo desenvolvimento

```bash
npm run dev
```

3) Build para produção

```bash
npm run build
```

## Notas
- As imagens são puxadas de Unsplash via URL (só para demonstração)
- Para transformar isso em uma loja real você precisará adicionar integração com gateway de pagamentos, backend para estoque e um CMS para gerenciar produtos.

## Paleta sugerida (exemplo)
- Teal: #14b8a6
- Sky: #0369a1
- Sand: #fbf6f0
- Accent (sunset): #fb923c

Se quiser, eu posso:
- Adicionar filtros por categoria e tamanhos;
- Implementar busca real com indexação;
- Integração com Stripe/PayPal;
## Stripe + Backend (opcional)

Para finalizar com Stripe em modo de teste, siga estes passos:

1) Entre na pasta `server` e instale dependências:

```bash
cd server
npm install
```

2) Crie um arquivo `.env` dentro de `server/` com sua chave de teste do Stripe (não coloque a chave pública no repositório):

```
STRIPE_SECRET_KEY=sk_test_xxx
SUCCESS_URL=http://localhost:5173/
CANCEL_URL=http://localhost:5173/
```

3) Rode o servidor do Stripe localmente:

```bash
npm start
```

4) No frontend, a rota `/api/create-checkout-session` será proxyada para o servidor se você usar um proxy ou se hospedar o backend e configurar o endereço corretamente.

Se você não quiser rodar o server, o checkout usará um modo mock que limpa o carrinho e simula o pagamento.

## Docker e Deploy (opcional)

Foi adicionada uma `Dockerfile` para o frontend e outra para o servidor, junto com `docker-compose.yml` para rodar ambos localmente.

Build e run com Docker:

```bash
# Na raiz do projeto
docker compose build
docker compose up
```

O frontend ficará exposto em `http://localhost:5173` e o server em `http://localhost:4242`.

## GitHub CI

Adicionei um workflow em `.github/workflows/ci.yml` que executa o build do frontend e do servidor em push/PR para `main`. Ele garante que a aplicação seja construtível antes do merge.

## Filtros Avançados

Na página de `Loja` você tem agora:
- Busca por termo (nome ou marca)
- Filtros por `Categoria` e `Tamanho`
- Filtragem por faixa de `Preço` (mínimo / máximo)
- Ordenação por `Preço (asc/desc)` e `Nome`
- Paginação (6 produtos por página)

Use a barra de busca no cabeçalho para navegar rapidamente para a loja com um termo de busca pré-carregado.

## Dark Mode & Visual Enhancements

- Adicionei um `theme toggle` no `Header` que alterna entre `claro` e `escuro` (persistido no `localStorage`).
- O Tailwind foi configurado para `darkMode: 'class'` e as principais seções tem estilos `dark:` para uma boa experiência.
- Adicionei animação/hover em `ProductCard` e melhoria visual no `Home` hero e no `Footer`.




- Implementar autenticação de usuário e painel de administração;
- Transformar em um PWA e adicionar suporte offline.

Desenvolvido com ❤️ para surfistas — monte.surf

## Histórico de operações (novas funcionalidades)

O app agora registra todas as operações feitas no carrinho (adicionar, remover, atualizar quantidade, limpar). As opções disponíveis são:

- Persistência local: o histórico é armazenado no `localStorage` como `cartOps`.
- Export: você pode exportar o histórico como JSON ou CSV direto pelo Drawer do carrinho.
- Sincronização: há um endpoint `/operations` no backend (pasta `server/`) que recebe e persiste o histórico em `server/operations.json`.
- Visualização: o `CartDrawer` tem um botão `Histórico` que lista as operações com timestamp e detalhes.

Como usar:

1) Faça ações no carrinho (adicionar, remover, etc.) — elas serão gravadas localmente.
2) Abra o `Carrinho` e clique em `Histórico` para ver as operações.
3) Exporte ou sincronize com o backend clicando em `Exportar JSON/CSV` ou `Sincronizar`.

Se quiser, posso adicionar um botão para limpar o arquivo `server/operations.json` no servidor ou enviar operações em tempo real usando WebSockets.

## Autenticação local (registro/entrar)

O projeto contém um fluxo de autenticação simples, totalmente no cliente, que utiliza `localStorage` para guardar usuários e sessão:

- `Cadastrar`: cria um usuário simples com `email` e `password` no `localStorage`.
- `Entrar`: autentica verificando email + senha no `localStorage`.
- `Checkout`: somente disponível quando logado.

Observação: para produção use um backend seguro com hashing de senha e tokens (JWT / session cookies).
