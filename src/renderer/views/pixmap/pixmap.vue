<template>
  <div id="pixmap">
    {{ msg }}
    <div id="pixmap-container"></div>
  </div>
</template>

<script>
import { initPixmapEditor } from './pixmapEditor.js'

export default {
  name: 'Pixmap',
  data() {
    return {
      msg: 'hello pixmap'
    }
  },
  mounted() {
    this.$nextTick(() => {
      initPixmapEditor()
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  #pixmap-container {
    width: 600px;
    height: 500px;
  }
</style>

