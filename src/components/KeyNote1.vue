<template>
  <main>
    <article>
      <header>
        <p style="color: #5b9bd5">SPEAKERS</p>
      </header>
      <div class="speakers-list">
        <div class="speaker">
          <div class="speaker-img">
            <img src="/img/keynote1.png" />
          </div>
          <div class="speaker-body">
            <h3 style="color: #5b9bd5">
              Woo Seok Kong
              <br />
              KEYNOTE TALKS: Homo symbiosis
            </h3>
            <p>
              Woo Seok Kong is currently a professor of the Department of
              Geography at Kyunghee University in Korea. He received his Ph.D.
              in Biogeography from the University of Hull in UK. He is
              interested in how climate change has affected the distribution and
              diversity of plants growing in high mountains since geological
              times. He is currently researching the relationship between the
              natural environment, such as the current climate, topography, and
              soil, and humans and ecosystems in the field. He does not stop at
              researching and teaching natural ecosystems and environmental
              problems, but tries to solve them by putting them into practice in
              everyday life. He has authored 『Climate change and ecosystems 41
              keywords』, 『Biogeography of Korean Plants』, 『Vegetation
              History of the Korean Peninsula 』, 『Natural Ecosystem of North
              Korea』, 『Conifer Science I』, 『Why Climate Change Is it a
              Problem?”, “Climate Crisis”, “Walking in the Needle Leaf Forest”,
              “People who live in symbiosis with the Earth”, and “ Résumé of
              trees and forests of Korea .
            </p>
          </div>
        </div>
      </div>
      <zoom-button/> 
    </article>
  </main>
</template>

<script>
import ZoomButton from "./common/ZoomButton.vue"

export default {
 components: { ZoomButton }
}
  
</script>