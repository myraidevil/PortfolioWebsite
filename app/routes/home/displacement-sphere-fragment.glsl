#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

uniform float time;
uniform float themeFactor; // 1.0 = light mode, 0.0 = dark mode

varying vec2 vUv;
varying vec3 newPosition;
varying float noise;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  // === Base dynamic pattern ===
  vec3 base = vec3(vUv * (0.2 - 2.0 * noise), 1.0);
  
  // Color logic — violet for light mode, blue-violet for dark mode
  vec3 darkTone = vec3(base.b * 1.4, base.r * 0.4, base.r * 1.2);   // neon blue-violet
  vec3 lightTone = vec3(base.r * 1.2, base.b * 0.9, base.r * 1.2);  // softer violet
  vec3 tone = mix(darkTone, lightTone, themeFactor);

  vec4 diffuseColor = vec4(cos(tone * noise * 3.0), 1.0);

  // === Flowing color effect ===
  float wave = sin(vUv.x * 8.0 + time * 1.5) * cos(vUv.y * 6.0 + time * 1.2);
  float pulse = abs(sin(time * 0.8 + noise * 3.0));
  float flowMask = smoothstep(0.4, 0.7, wave * 0.5 + 0.5) * pulse;

  // Flow colors
  vec3 flowColorDark = vec3(1.0); // glowing white for dark mode
  vec3 flowColorLight = vec3(0.0); // black veins for light mode
  vec3 flowColor = mix(flowColorDark, flowColorLight, themeFactor);

  // Adjust contrast & softness for each mode
  if (themeFactor > 0.5) {
    flowMask = pow(flowMask, 0.4); // sharper black veins
    flowColor *= 0.15;
  } else {
    flowMask = pow(flowMask, 1.3); // softer glowing white veins
  }

  // Merge flow into base tone
  diffuseColor.rgb = mix(diffuseColor.rgb, flowColor, flowMask * 0.7);

  // === Lighting accumulation ===
  ReflectedLight reflectedLight = ReflectedLight(
    vec3(0.0),
    vec3(0.0),
    vec3(0.0),
    vec3(0.0)
  );

  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <specularmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <emissivemap_fragment>
  #include <lights_phong_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>

  vec3 outgoingLight = reflectedLight.directDiffuse +
                       reflectedLight.indirectDiffuse +
                       reflectedLight.directSpecular +
                       reflectedLight.indirectSpecular +
                       totalEmissiveRadiance;

  #include <envmap_fragment>
  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

  gl_FragColor = vec4(outgoingLight * diffuseColor.rgb, diffuseColor.a);
}
