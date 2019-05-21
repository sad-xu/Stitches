<template>
  <div>
    {{ msg }}
    <p>
      <router-link to="/pixmap">
        Jump to pixmap...
      </router-link>
    </p>
    <p>
      <router-link to="/landing-page">
        Jump to landing page...
      </router-link>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      msg: 'hello'
    }
  },
  methods: {

  }
}
</script>
