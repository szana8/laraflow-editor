<template>
    <!-- tweet creation modal -->
    <div class="">
        <!-- header -->
        <div class="border-b border-purple-600 text-purple-600">
          <div class="p-4 cursor-pointer" @click="hide">X</div>
        </div>

        <!-- body -->
        <div class="p-4 pl-20 relative">
            <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Step Name" v-model="stepName" />
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
    data() {
        return {
            display: false,
            stepName: null,
        }
    },
    mounted() {
        EventBus.$on('openNewStepModal', this.show);
    },
    methods: {
        show() {
            this.display = true;
        },

        hide() {
            this.stepName = null;
            EventBus.$emit('modal-close');
        },

        save() {
            if (this.stepName) {
                EventBus.$emit('addStep', this.stepName);

                this.hide();
            }
        }
    }
};

</script>

