Aqui está a versão atualizada com o comando correto:

---

# 🚀 Monitorify

**Monitorify** é uma biblioteca que fornece um middleware personalizável para registrar requisições HTTP em aplicações **Express**. Ele inclui uma interface gráfica para monitoramento de logs e armazena as informações de forma estruturada, facilitando a análise e otimização da gestão de logs em suas aplicações.

## ✨ Recursos

- 🛠️ Middleware Express para monitoramento de requisições HTTP
- 💾 Armazenamento de logs de forma estruturada (JSON, banco de dados, etc.)
- 📊 Interface gráfica (Dashboard) para visualização e análise de logs
- ⚙️ Suporte a customizações e opções de configuração flexíveis
- 🚀 Ferramenta ideal para análise de performance e otimização de APIs
- 🔍 Suporte a filtros avançados para consultas de logs

## 📦 Instalação

Você pode instalar o **Monitorify** via npm:

```bash
npm install monitorify
```

Ou utilizando o Yarn:

```bash
yarn add monitorify
```

## 🧑‍💻 Uso

Integre facilmente o **Monitorify** à sua aplicação Express adicionando o middleware no ponto de entrada da aplicação.

### Exemplo básico

```javascript
const express = require('express');
const monitorify = require('monitorify');

const app = express();

// Adiciona o middleware do monitorify
app.use(monitorify());

app.get('/', (req, res) => {
  res.send('Monitorify está ativo!');
});

app.listen(3000, () => {
  console.log('Aplicação rodando na porta 3000');
});
```

## ⚙️ Opções de Configuração

O **Monitorify** suporta uma ampla gama de configurações para que você possa customizar o comportamento do middleware e a forma como os logs são armazenados e exibidos.

### Configuração básica

```javascript
const options = {
  logFormat: 'combined',  // Formato dos logs (ex: 'combined', 'common', etc.)
  logStorage: 'json',     // Onde armazenar os logs ('json', 'database', etc.)
  displayLogs: true,      // Exibe logs no console
  dashboard: {
    enabled: true,        // Habilita a interface gráfica
    port: 4000,           // Porta para acessar o dashboard
  },
  filters: {
    method: ['GET', 'POST'], // Filtrar logs por método HTTP
    statusCode: [200, 500]   // Filtrar logs por código de status
  }
};

// Integrar o middleware com as opções personalizadas
app.use(monitorify(options));
```

## 🖥️ Interface Gráfica

O **Monitorify** também inclui uma interface gráfica para monitoramento em tempo real. Ao habilitar o dashboard nas configurações, você pode acessar a interface via navegador.

### Rodando o Dashboard

Para iniciar o servidor da interface gráfica, use o seguinte comando:

```bash
npx monitorify:studio
```

Se o dashboard estiver habilitado, acesse `http://localhost:4000` (ou a porta configurada) para visualizar as requisições HTTP em tempo real, incluindo gráficos e dados estruturados para uma análise completa.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).

---

