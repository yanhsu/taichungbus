<template>
  <div>
    {{ message }}
  </div>
</template>

<script>


export default {
  asyncData ({redirect}) {
    redirect('/bus')
  },
  data () {
    return{
      message: this.$firebase.database().ref('message')
    }
  }
}
</script>

