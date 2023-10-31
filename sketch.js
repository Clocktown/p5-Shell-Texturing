let num_layers = 32
let layer_sep = 0.25
let resolution = [60, 60]

let theShader

function preload() {
  theShader = loadShader("shader/shell.vert", "shader/shell.frag")

}

function onLoadParams() {
  resolution[0] = document.getElementsByName("xres")[0].value
  resolution[1] = document.getElementsByName("yres")[0].value
  num_layers = document.getElementsByName("numLayers")[0].value
  layer_sep = document.getElementsByName("sep")[0].value
}

function setup() {
  createCanvas(700, 700, WEBGL);
  noStroke()
  shader(theShader)

  document.getElementsByName("xres")[0].value = resolution[0]
  document.getElementsByName("yres")[0].value = resolution[1]
  document.getElementsByName("numLayers")[0].value = num_layers
  document.getElementsByName("sep")[0].value = layer_sep
}

function draw() {
  background(250);
  theShader.setUniform("res", resolution)

  orbitControl()
  perspective(PI/3.0, width/height, 0.01, 1000.0)
  for(let i = 0; i < num_layers; ++i) {
    theShader.setUniform("sep", i * layer_sep)
    theShader.setUniform("h", i  / (num_layers - 1))
    plane()
  }
}
