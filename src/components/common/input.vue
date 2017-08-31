<template>
  <div>
    <input v-model="currentValue">
  </div>
</template>
<script>
  export default {
      props: {
        value: {
          type: String,
          default: ''
        }
      },
    data() {
          return {
            currentValue: ''
          }
    },
      methods: {

      },
    watch: {
          value(val) {
            this.currentValue = val;
          },
      currentValue(val) {
        val = 'abc';
        this.$emit('input', val)
      }
    }
  }
</script>
