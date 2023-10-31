precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform mat4 uViewMatrix;
uniform float sep;

varying vec4 color;
varying vec2 uv;

void main() {
    uv = aTexCoord;
    color = vec4(0.5,0.5,0,1);
    vec3 pos = vec3(uModelViewMatrix * vec4(aPosition, 1.0))
        + sep * normalize(uNormalMatrix * aNormal);
    gl_Position = uProjectionMatrix * vec4(pos, 1.0);
}