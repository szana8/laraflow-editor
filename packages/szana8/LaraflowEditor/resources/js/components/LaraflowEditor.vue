<template>
  <div class="laraflow-editor">
    <nav-bar />
    <div class="h-screen flex items-center justify-center">
      <side-bar />
      <loading />
      <schema />
      <modal />
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";
import Loading from "./Loading.vue";
import Sidebar from "./SideBar.vue";
import Schema from "./Schema.vue";
import Modal from "./Modal.vue";

export default {
  name: "laraflow-editor",

  components: {
    navBar: NavigationBar,
    loading: Loading,
    sideBar: Sidebar,
    schema: Schema,
    modal: Modal
  },
  mounted() {
    //EventBus.$emit('loading', true);
  },

  methods: {}
};
</script>

