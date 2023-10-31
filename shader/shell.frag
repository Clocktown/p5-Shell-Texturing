precision mediump float;

float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
	
float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

uniform float h;
uniform vec2 res;

varying vec4 color;
varying vec2 uv;

void main() {
    vec2 coord = res * uv + 0.5;
    vec2 st = 2.0 * fract(coord) - 1.0;
    coord = vec2(floor(coord));
    float r = noise(coord);
    float radius = clamp((r - h) / r, 0.0, 1.0);
    if(h > 0.0 && (h > r || dot(st, st) > 2.0 * radius * radius)) {
        discard;
    }
    float ao = mix(0.2, 1.0, h);
    gl_FragColor = vec4(ao * vec3(0.2, 0.8, 0.2), 1.0);

}