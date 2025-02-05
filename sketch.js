/**
 * Heart Gallery - Parallax Effect Experiment
 * This code creates an interactive parallax effect using multiple layers
 * of an SVG heart inside a stylized frame
 */

// ... código inicial mantido igual ...

function setup() {
    createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    
    // Create frame with separate elements for parallax
    createFrame();
    
    // Create heart layers
    for (let i = 0; i < NUM_LAYERS; i++) {
        let layer = createDiv('');
        layer.class('camada-coracao');  // Alterado de 'heart-layer'
        layer.id(`camada-${i}`);        // Alterado de 'layer-${i}'
        layers.push(layer);
    }
    
    // Load SVG into each layer
    fetch('assets/heart.svg')           // Alterado de 'heart_optimized.svg'
        .then(response => response.text())
        .then(svgData => {
            layers.forEach((layer, index) => {
                layer.html(svgData);
                let svgElement = select(`#camada-${index} svg`);  // Alterado seletor
                
                // ... resto das configurações SVG mantidas iguais ...
            });
        });
}

function createFrame() {
    // Create main frame
    frame = createDiv('');
    frame.class('moldura');    // Alterado de 'frame'
    
    // Create matting
    matting = createDiv('');
    matting.class('paspatur');  // Alterado de 'matting'
    
    // Add wall shadow
    shadow = createDiv('');
    shadow.class('sombra');     // Alterado de 'shadow'
}

function draw() {
    // ... código inicial do draw mantido igual ...
    
    // Update heart layers position
    layers.forEach((layer, index) => {
        let svgElement = select(`#camada-${index} svg`);  // Alterado seletor
        if (svgElement) {
            // ... resto do código mantido igual ...
        }
    });
    
    // ... resto do código mantido igual ...
}

// ... funções mouseWheel e windowResized mantidas iguais ... 