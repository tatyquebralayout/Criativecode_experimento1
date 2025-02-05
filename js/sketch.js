/**
 * Heart Gallery - Parallax Effect Experiment
 * This code creates an interactive parallax effect using multiple layers
 * of an SVG heart inside a stylized frame
 */

// Global variables for layer control and animation
let layers = [];                // Array to store heart layers
const NUM_LAYERS = 5;          // Number of layers for depth effect
let baseScale = 0.8;           // Base scale for heart size
let mouseVelocityX = 0;        // Mouse horizontal velocity
let mouseVelocityY = 0;        // Mouse vertical velocity
let lastMouseX = 0;            // Last mouse X position
let lastMouseY = 0;            // Last mouse Y position
let easing = 0.15;             // Movement smoothing factor
let frame, matting, shadow;    // Frame elements

// Array of red shades for each layer
const redShades = [
    'rgb(255, 0, 0)',      // Original red
    'rgb(180, 0, 0)',      // Darker red
    'rgb(140, 0, 0)',      // Even darker
    'rgb(100, 0, 0)',      // Very dark red
    'rgb(60, 0, 0)'        // Almost black red
];

/**
 * Initial setup
 * Creates canvas and initializes elements
 */
function setup() {
    createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    
    // Create frame with separate elements for parallax
    createFrame();
    
    // Create heart layers with depth effect
    for (let i = 0; i < NUM_LAYERS; i++) {
        let layer = createDiv('');
        layer.class('camada-coracao');
        layer.id(`camada-${i}`);
        layers.push(layer);
    }
    
    // Load and configure SVG for each layer
    fetch('assets/heart.svg')
        .then(response => response.text())
        .then(svgData => {
            layers.forEach((layer, index) => {
                layer.html(svgData);
                let svgElement = select(`#camada-${index} svg`);
                
                // Configure SVG visual properties
                svgElement.style('width', '400px');
                svgElement.style('height', '400px');
                svgElement.style('position', 'absolute');
                svgElement.style('left', '50%');
                svgElement.style('top', '50%');
                
                // Set initial transform with progressive scaling
                svgElement.style('transform', `translate(-50%, -50%) scale(${baseScale + index * 0.05})`);
                
                // Apply visual effects for depth
                svgElement.style('opacity', `${1 - index * 0.1}`);  // Progressive transparency
                svgElement.style('fill', redShades[index]);         // Gradient color effect
                svgElement.style('filter', `blur(${index * 0.3}px)`); // Progressive blur
                svgElement.style('mix-blend-mode', 'multiply');     // Blend layers
                svgElement.style('background', 'none');
                
                // Smooth animation transition
                svgElement.style('transition', 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)');
            });
        });
}

/**
 * Creates frame elements for the artwork
 * Sets up main frame, matting, and shadow for 3D effect
 */
function createFrame() {
    // Create outer frame with blue finish
    frame = createDiv('');
    frame.class('moldura');
    
    // Create inner matting for depth
    matting = createDiv('');
    matting.class('paspatur');
    
    // Add shadow for floating effect
    shadow = createDiv('');
    shadow.class('sombra');
}

/**
 * Main animation loop
 * Handles all movement calculations and updates
 */
function draw() {
    clear();
    
    // Track mouse movement speed
    mouseVelocityX = mouseX - lastMouseX;
    mouseVelocityY = mouseY - lastMouseY;
    
    // Calculate normalized mouse position from center
    let mouseXNorm = (mouseX - width/2) / (width/2);
    // Restrict movement to left side only
    mouseXNorm = mouseXNorm > 0 ? 0 : mouseXNorm;
    let mouseYNorm = (mouseY - height/2) / (height/2);
    
    // Calculate distance from center for depth effect
    let distance = dist(mouseX, mouseY, width/2, height/2);
    let maxDist = min(width, height) / 2;
    let normalizedDist = constrain(distance/maxDist, 0, 1);
    
    // Update frame elements with parallax movement
    if (frame && matting && shadow) {
        // Subtle frame movement
        let frameX = mouseXNorm * 10;
        let frameY = mouseYNorm * 10;
        frame.style('transform', `translate(${frameX}px, ${frameY}px)`);
        
        // Enhanced matting movement for depth
        let mattingX = mouseXNorm * 15;
        let mattingY = mouseYNorm * 15;
        matting.style('transform', `translate(${mattingX}px, ${mattingY}px)`);
        
        // Exaggerated shadow movement for floating effect
        let shadowX = mouseXNorm * 20;
        let shadowY = mouseYNorm * 20;
        shadow.style('transform', `translate(${shadowX}px, ${shadowY}px)`);
    }
    
    // Update each heart layer with dynamic movement
    layers.forEach((layer, index) => {
        let svgElement = select(`#camada-${index} svg`);
        if (svgElement) {
            // Calculate movement based on mouse velocity
            let velocityFactor = map(abs(mouseVelocityX) + abs(mouseVelocityY), 0, 50, 0, 1);
            let offsetBase = map(index, 0, NUM_LAYERS - 1, 5, 15);
            let offset = offsetBase * (1 + velocityFactor);
            
            // Apply depth-based offset
            let depthOffset = map(normalizedDist, 0, 1, 0, index * 3);
            let x = mouseXNorm * offset * (1 + depthOffset);
            let y = mouseYNorm * offset * (1 + depthOffset);
            
            // Calculate rotation based on movement direction
            let rotation = mouseXNorm < 0 ? 
                map(mouseVelocityX, -20, 20, -2, 2) * (index + 1) * 0.2 : 0;
            
            // Apply combined transform
            svgElement.style('transform', `
                translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                rotate(${rotation}deg)
                scale(${baseScale + index * 0.05 + (velocityFactor * 0.02)})
            `);
        }
    });
    
    // Update previous mouse position
    lastMouseX = lerp(lastMouseX, mouseX, easing);
    lastMouseY = lerp(lastMouseY, mouseY, easing);
}

/**
 * Mouse wheel event handler
 * Controls heart zoom
 */
function mouseWheel(event) {
    baseScale = constrain(baseScale + event.delta * 0.0005, 0.6, 1.0);
    return false;
}

/**
 * Window resize handler
 * Maintains experiment responsiveness
 */
function windowResized() {
    resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);
}