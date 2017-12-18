<template>
    <div id="app">
       <h3>hello vue !</h3>
    </div>
</template>
<script>
require('../static/styles/reset.scss')
export default {
    name: 'app'
}
</script>
<style lang="scss" scoped>
#app {
    width: 420px;
    height: auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    background: #f5f5f5;
}
</style>