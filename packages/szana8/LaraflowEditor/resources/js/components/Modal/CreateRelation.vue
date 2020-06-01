<template>
  <!-- tweet creation modal -->
  <div class="">
    <!-- header -->
    <div class="border-b border-purple-600 text-purple-600">
      <div class="p-4">
        <span class="cursor-pointer" @click="hide">X</span>
        <span>Create connection</span>
      </div>
    </div>

    <!-- body -->
    <div class="p-4 pl-20 relative">
      <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Transaction Name" v-model="transactionName" />
    </div>

    <!-- footer -->
    <div class="p-4 pl-20 flex justify-between">
      <div class="flex items-center text-3xl">
      </div>
      <div class="flex items-center">
        <button class="rounded-md antialiased bg-white text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white py-2 px-4" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-relation",

  data() {
    return {
      display: false,
      transactionName: null,
      connection: null
    };
  },
  mounted() {
    EventBus.$on("openNewRelationModal", this.show);
  },
  methods: {
    show(connection) {
      this.connection = connection;
      this.display = true;
    },

    hide() {
      this.transactionName = null;
      EventBus.$emit("modal-close");
    },

    save() {
      if (this.transactionName) {
        console.log(this.connection);
        this.connection.connection
          .getOverlay("label")
          .setLabel(this.transactionName);
        EventBus.$emit("addRelation", this.transactionName, this.uuid());
        this.hide();
      }
    }
  }
};
</script>

<style>
#keys {
  margin-left: -3px;
}
</style>
