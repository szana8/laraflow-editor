<template>
  <div data-backdrop="static" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" :class="{ 'opacity-0 pointer-events-none' : closed }">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="w-1/3 rounded-lg shadow-lg bg-white absolute z-50">
      <div class="">
        <create-step v-if="type === 'new-model'" />
        <create-relation v-if="type === 'new-relation'" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateStep from "./Modal/CreateStep.vue";
import CreateRelation from "./Modal/CreateRelation.vue";

export default {
  name: "modal",

  components: {
    "create-step": CreateStep,
    "create-relation": CreateRelation
  },

  data() {
    return {
      closed: true,
      title: "",
      type: "",
      content: []
    };
  },
  created() {
    EventBus.$on("modal-open", (title, type, content) => {
      this.title = title;
      this.type = type;
      this.content = content;
      this.closed = false;
    });

    EventBus.$on("modal-close", this.close);
  },
  destroyed() {
    EventBus.$off("modal-open");
    EventBus.$off("modal-close");
  },
  methods: {
    close() {
      this.closed = true;
    }
  }
};
</script>

<style scoped>
.modal {
  z-index: 1100;
}
.modal-container {
  min-width: 600px;
  max-height: 90%;
}
</style>
