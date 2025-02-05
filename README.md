# **CriativeCode - Experimento 1**

## **Sobre o Projeto**
Este é um experimento artístico interativo que explora conceitos simples de **parallax** e **profundidade**, utilizando **SVG**, **JavaScript** e a biblioteca **p5.js**. A ideia central foi criar um coração estilizado dentro de um quadro com moldura azul, onde múltiplas camadas respondem ao movimento do mouse, gerando uma experiência visual imersiva.

O objetivo aqui não foi apenas criar algo bonito, mas também explorar como elementos visuais simples podem ser combinados para criar dinamismo e envolvimento. Estou aprendendo bastante sobre como pequenos ajustes no código podem transformar uma ideia básica em algo que parece vivo e responsivo.

---

## **Aspectos Técnicos Principais**

### **1. Sistema de Camadas**
O coração é composto por **5 camadas SVG sobrepostas**, cada uma com propriedades específicas para criar profundidade:

- **Escala individual**: `escalaBase + (index * 0.05)`
- **Opacidade progressiva**: `1 - (index * 0.1)`
- **Blur gradual**: `blur(${index * 0.3}px)`
- **Blend mode**: `multiply`

Essas configurações garantem que as camadas pareçam se fundir naturalmente, criando um efeito suave e orgânico.

---

### **2. Cálculos de Movimento**
Para controlar o movimento das camadas, usei algumas fórmulas básicas de normalização e mapeamento:

```javascript
// Normalização da posição do mouse
mouseXNorm = (mouseX - width / 2) / (width / 2);
mouseYNorm = (mouseY - height / 2) / (height / 2);

// Cálculo de profundidade
depthOffset = map(distNormalizada, 0, 1, 0, index * 3);
```

Esses cálculos ajudam a determinar como cada camada deve se mover em relação à posição do mouse, criando o efeito de parallax.

---

### **3. Sistema de Parallax**
O parallax foi implementado com foco na direção horizontal (limitado à esquerda). Aqui estão os detalhes:

- **Velocidade**: Calculada por camada usando `velocityFactor`.
- **Profundidade**: Offset dinâmico baseado na distância do centro.
- **Suavização**: Aplicada via `lerp` com um fator de `0.15`.

Aqui está um exemplo de como o movimento é aplicado:

```javascript
// Cálculo de movimento por camada
x = mouseXNorm * offset * (1 + depthOffset);
y = mouseYNorm * offset * (1 + depthOffset);

// Transformação aplicada
transform = `
    translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
    rotate(${rotacao}deg)
    scale(${escalaBase + index * 0.05 + (velocityFactor * 0.02)})
`;
```

---

### **4. Hierarquia Visual**
A hierarquia visual foi pensada para criar uma sensação de profundidade:

- **Moldura exterior**: Movimento sutil (`10px`).
- **Paspatur intermediário**: Movimento médio (`15px`).
- **Sombra projetada**: Movimento acentuado (`20px`).
- **Camadas do coração**: Movimento dinâmico baseado no índice.

Essa estrutura ajuda a criar uma sensação de "camadas flutuantes", onde cada elemento responde de forma única ao movimento do mouse.

---

### **5. Otimizações de Performance**
Para garantir que tudo funcione de forma suave, apliquei algumas otimizações:

- Uso de `transform` para manipulação DOM.
- Transições CSS para suavização.
- Throttling de movimento via easing.
- Cálculos otimizados de posição.

### **6. Otimização SVG**
O projeto utiliza um arquivo de configuração `svgo.config.js` para otimizar os SVGs:

```javascript
// svgo.config.js
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,      // Mantém viewBox para responsividade
          cleanupIDs: false,         // Mantém IDs originais
          removeHiddenElems: false,  // Mantém elementos ocultos
        },
      },
    },
    'removeDimensions',  // Remove width/height fixos
    'removeXMLNS',      // Remove namespace XML desnecessário
  ],
};
```

Esta configuração:
- Preserva atributos essenciais para animação
- Remove metadados desnecessários
- Otimiza o tamanho do arquivo
- Mantém a qualidade visual

Essas práticas ajudaram a manter o desempenho mesmo com várias camadas em movimento.

---

## **Controles e Interação**

### **Mouse**
- **Movimento horizontal**: Controla o efeito parallax (limitado à esquerda).
- **Velocidade**: Afeta a profundidade das camadas.

### **Scroll**
- **Zoom dinâmico**: Ajusta o zoom do coração.
- **Range**: `0.6` a `1.0`.
- **Incremento**: `0.0005` por tick.

---

## **Tecnologias Utilizadas**


- **HTML5**: Estrutura básica do projeto.
- **CSS3**: Estilização e animações visuais.
- **JavaScript**: Lógica de interação e controle dos efeitos.
- **p5.js**: Biblioteca usada para facilitar a criação de gráficos e interações.
- **SVG**: Elementos vetoriais para garantir alta qualidade visual em qualquer resolução.
- **SVGO**: Ferramenta de otimização SVG configurada via `svgo.config.js`:
  - Reduz tamanho dos arquivos
  - Mantém atributos essenciais
  - Remove metadados desnecessários
  - Preserva qualidade visual

---

## **Como Usar**
Se você quiser experimentar o projeto localmente, siga os passos abaixo:

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/tatyquebralayout/Criativecode_experimento1.git
   ```

2. **Abra o Projeto**:
   - Navegue até a pasta do projeto:
     ```bash
     cd Criativecode_experimento1
     ```
   - Abra o arquivo `index.html` em um navegador ou use um servidor local para evitar problemas de carregamento de recursos.

3. **Interaja com o Projeto**:
   - Mova o mouse para a esquerda para ativar o efeito parallax.
   - Use o scroll para ajustar o zoom do coração.
   - Observe como a moldura e outros elementos respondem às suas ações.

---

## **Créditos**
Este projeto foi desenvolvido como parte do meu estudo de **Creative Coding** e exploração de efeitos visuais interativos. 

Desenvolvido por: **Taty QuebraLayout** ([@tatyquebralayout](https://github.com/tatyquebralayout))

---

## **Contribuições**
Contribuições são bem-vindas! Se você deseja melhorar este projeto ou adicionar novas funcionalidades, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua contribuição:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Envie suas alterações:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
4. Abra um pull request no GitHub.

---

## **Contato e Suporte**

Estou à disposição para qualquer dúvida ou sugestão sobre este projeto! Você pode me encontrar através de:

- 🐦 Twitter:[@umataldetatiana]
- 🌐 GitHub: [@tatyquebralayout](https://github.com/tatyquebralayout)

Ficarei feliz em ajudar e trocar experiências sobre creative coding e desenvolvimento web!

---

**Nota**: Este é um projeto em constante evolução. Feedbacks e sugestões são sempre bem-vindos! 😊