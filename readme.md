
# CriativeCode - Experimento 1

## Sobre o Projeto

Este é um experimento artístico interativo que explora efeitos simples de **parallax** e **profundidade**, utilizando  SVG, JavaScript e p5.js. 
O projeto apresenta um coração estilizado em um quadro com moldura azul, criando uma experiência visual imersiva por meio de múltiplas camadas e interações controladas pelo movimento do mouse.

O objetivo deste experimento é demonstrar como elementos visuais simples podem ser combinados para criar uma experiência dinâmica e envolvente, explorando conceitos de design interativo e animações suaves.

Repositório no GitHub: [CriativeCode_Experimento1](https://github.com/tatyquebralayout/Criativecode_experimento1.git)

---

### Aspectos Técnicos Principais

#### 1. Sistema de Camadas
- Implementação de 5 camadas SVG sobrepostas
- Cada camada possui:
  - Escala individual: `escalaBase + (index * 0.05)`
  - Opacidade progressiva: `1 - (index * 0.1)`
  - Blur gradual: `blur(${index * 0.3}px)`
  - Blend mode: `multiply`

#### 2. Cálculos de Movimento
```javascript
// Normalização da posição do mouse
mouseXNorm = (mouseX - width/2) / (width/2)
mouseYNorm = (mouseY - height/2) / (height/2)

// Cálculo de profundidade
depthOffset = map(distNormalizada, 0, 1, 0, index * 3)
```

#### 3. Sistema de Parallax
- **Movimento Horizontal**: Limitado à direção esquerda
- **Velocidade**: Calculada por camada usando `velocityFactor`
- **Profundidade**: Offset dinâmico baseado na distância do centro
- **Suavização**: Implementada via `lerp` com fator de `0.15`

#### 4. Hierarquia Visual
1. Moldura exterior (movimento sutil: 10px)
2. Paspatur intermediário (movimento médio: 15px)
3. Sombra projetada (movimento acentuado: 20px)
4. Camadas do coração (movimento dinâmico baseado no índice)

#### 5. Otimizações de Performance
- Uso de `transform` para manipulação DOM
- Transições CSS para suavização
- Throttling de movimento via `easing`
- Cálculos otimizados de posição

### Implementação de Movimento

```javascript
// Cálculo de movimento por camada
x = mouseXNorm * offset * (1 + depthOffset)
y = mouseYNorm * offset * (1 + depthOffset)

// Transformação aplicada
transform = `
    translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
    rotate(${rotacao}deg)
    scale(${escalaBase + index * 0.05 + (velocityFactor * 0.02)})
`
```

### Controles e Interatividade
- **Mouse**: 
  - Movimento horizontal (limitado à esquerda)
  - Velocidade afeta profundidade
- **Scroll**: 
  - Zoom dinâmico
  - Range: `0.6` a `1.0`
  - Incremento: `0.0005` por tick

### Requisitos Técnicos
- **Browser**: Suporte a CSS3 Transforms
- **JavaScript**: ES6+
- **Dependências**: p5.js
- **SVG**: Otimizado via SVGO

---

## Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- **HTML5**: Estrutura básica do projeto.
- **CSS3**: Estilização e animações visuais.
- **JavaScript**: Lógica de interação e controle dos efeitos.
- **p5.js**: Biblioteca usada para facilitar a criação de gráficos e interações.
- **SVG**: Elementos vetoriais para garantir alta qualidade visual em qualquer resolução.
- **SVGO**: Ferramenta utilizada para otimizar os arquivos SVG, reduzindo o tamanho sem perder qualidade.

---

## Como Usar

Siga os passos abaixo para executar o projeto localmente:

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
   - **Movimento do Mouse**: Mova o mouse para a esquerda para ativar o efeito parallax.
   - **Scroll do Mouse**: Use o scroll para ajustar o zoom do coração.
   - Observe como a moldura e outros elementos respondem às suas ações.

---

## Interação Detalhada

- **Movimento do Mouse**: Controla o efeito parallax, limitado ao lado esquerdo da tela.
- **Scroll do Mouse**: Permite ajustar o nível de zoom no coração central.
- **Resposta Dinâmica da Moldura**: A moldura e outros elementos visuais também reagem ao movimento do mouse, criando uma experiência mais imersiva.

---

## Créditos

Este projeto foi desenvolvido como parte do estudo de **Creative Coding** e exploração de efeitos visuais interativos. A ideia é inspirada na busca por combinar arte digital e programação para criar experiências únicas e envolventes.

Desenvolvido por: [Taty QuebraLayout](https://github.com/tatyquebralayout)

---

## Contribuições

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


