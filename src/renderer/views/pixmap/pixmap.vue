<template>
  <div id="pixmap">
    {{ msg }}
    <div id="pixmap-container"></div>
  </div>
</template>

<script>
import { initCube } from './pixmapEditor.js'

export default {
  name: 'Pixmap',
  data() {
    return {
      msg: 'hello pixmap'
    }
  },
  mounted() {
    this.$nextTick(() => {
      initCube()
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  canvas {
    width: 300px;
    height: 300px;
  }
</style>

