# História da Programação - Versão HTML/CSS/JavaScript

Uma versão convertida para HTML, CSS e JavaScript puro do projeto original em React.

## 📁 Estrutura de Pastas

```
vanilla/
├── index.html          # Arquivo HTML principal
├── styles/
│   └── main.css       # Estilos CSS
├── js/
│   └── app.js         # Lógica JavaScript
└── README.md          # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir diretamente no navegador
Simplesmente abra o arquivo `index.html` no seu navegador preferido.

### Opção 2: Usar um servidor HTTP local
Se quiser usar um servidor local (recomendado para melhor compatibilidade):

**Com Python 3:**
```bash
cd vanilla
python -m http.server 8000
```
Depois abra `http://localhost:8000`

**Com Python 2:**
```bash
cd vanilla
python -m SimpleHTTPServer 8000
```

**Com Node.js (http-server):**
```bash
cd vanilla
npx http-server
```

**Com PHP:**
```bash
cd vanilla
php -S localhost:8000
```

## ✨ Funcionalidades

- ✅ 7 abas interativas (Início, 5 tópicos, Quiz)
- ✅ Timeline interativa com eventos históricos
- ✅ Quiz com 8 questões e feedback
- ✅ Menu responsivo (mobile e desktop)
- ✅ Design escuro moderno
- ✅ Sem dependências externas
- ✅ Totalmente em HTML, CSS e JavaScript puro

## 📚 Conteúdo

1. **Início** - Introdução à história da programação e timeline completa
2. **Os Primórdios** - Tear de Jacquard (1801)
3. **Ada & Babbage** - Máquina Analítica e primeira programadora
4. **Década de 40** - Alan Turing, Assembly e computadores eletrônicos
5. **Linguagem C** - Dennis Ritchie e a mãe das linguagens modernas
6. **JavaScript & Impacto** - Web interativa e impacto na sociedade
7. **Quiz** - 8 questões para testar conhecimento

## 🎨 Design

- Design responsivo (mobile-first)
- Tema escuro com acentos em azul e amarelo
- Fonts: Courier Prime (títulos) e DM Sans (corpo)
- Inspirado em interfaces de desenvolvedor

## 🔧 Personalização

### Cores
Edite as variáveis CSS em `styles/main.css` na seção `:root`:

```css
:root {
    --color-primary: #3b82f6;    /* Azul principal */
    --color-accent: #fbbf24;     /* Amarelo destaque */
    --bg-background: #0a0e27;    /* Fundo */
    --bg-card: #1a1f3a;          /* Cards */
    /* ... mais variáveis ... */
}
```

### Fonts
Altere as variáveis de font em `styles/main.css`:

```css
--font-mono: 'Courier Prime', monospace;
--font-sans: 'DM Sans', sans-serif;
```

### Conteúdo
- Modifique as arrays `timelineEvents` e `quizQuestions` em `js/app.js`
- Edite o texto HTML em `index.html`

## 💾 Compatibilidade

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Opera 47+

## 📝 Notas

- Este projeto não usa nenhuma dependência external
- JavaScript é vanilla (puro), sem frameworks
- CSS é puro, sem preprocessadores
- Completamente self-contained - funciona offline

## 🎯 Diferenças em relação ao original React

- Sem JSX, componentes React, ou estado dinâmico de framework
- Código mais legível e didático
- Performance melhorada (sem overhead de React)
- Tamanho de arquivo significativamente menor

---

**Desenvolvido como demonstração de conversão de React para JavaScript puro.**
