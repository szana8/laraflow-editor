<template>
  <div class="flex w-full" id="schema">
    <div class="flex bg-gray-200 w-full h-screen">
      <div class="ml-3 mt-2">
        <button class="block button w-24 bg-white px-4 py-2 border border-gray-400 text-purple-600 rounded-md justify-center text-sm font-semibold mb-2 hover:bg-purple-600 hover:text-white" @click="add">
          <div class="tooltip focus:outline-none inline-flex mr-2 items-center">
            <i class="fas fa-plus pr-1" />Add
          </div>
        </button>

        <button class="block button w-24 bg-white px-4 py-2 border border-gray-400 text-purple-600 rounded-md justify-center text-sm font-semibold mb-2 hover:bg-purple-600 hover:text-white">
          <div class="tooltip focus:outline-none inline-flex mr-2 items-center">
            <i class="fas fa-save pr-1" />Save
          </div>
        </button>
      </div>

      <div id="container" class="w-full h-screen flex justify-center pt-8">
        <node v-for="node in nodes" v-bind:key="node.id" v-bind:attrs="node" />
      </div>
    </div>
  </div>
</template>
<script>
import Node from "./Node";
import DragSelect from "dragselect";
import Plumbing from "../lib/Plumbing";

export default {
  name: "schema",

  components: { Node },

  mixins: [Plumbing],

  data() {
    return {
      dragselect: null,
      selectedItems: [],
      selectedConnection: {
        id: null,
        object: null
      },
      nodes: [
        {
          id: this.uuid(),
          name: "Start",
          class: this.getStartNodeStyle(),
          endpoints: {
            out: ["BottomCenter"],
            in: []
          }
        }
      ]
    };
  },

  mounted() {
    this.registerEvents();

    this.dragselect = new DragSelect({
      selectables: this.$models().all(),
      multiSelectKeys: ["altKey", "shiftKey"],
      onElementSelect: this.select,
      onElementUnselect: this.unselect
    });
  },

  methods: {
    select(model) {
      const $model = $(model).not(".hidden-model, .filtered");
      $model.addClass("selected");
      jsPlumb.addToDragSelection($model);
    },

    unselect(model) {
      const $model = $(model).not(".hidden-model, .filtered");
      $model.removeClass("selected");
      jsPlumb.removeFromDragSelection($model);
    },

    registerEvents() {
      EventBus.$on("detach", this.detach);
      EventBus.$on("addStep", this.addStep);
      EventBus.$on("changeLabel", this.changeLabel);
      EventBus.$on("registerConnectionData", this.registerConnectionData);
    },

    // Add a new node to the instance with a unique id
    addStep(stepName, id) {
      this.nodes.push({
        id: id,
        name: stepName,
        class: this.getNewNodeStyle(),
        endpoints: {
          out: ["RightMiddle", "BottomCenter"],
          in: ["TopCenter", "LeftMiddle"]
        }
      });
      this.$nextTick(() => {
        this.dragselect.addSelectables($("#" + id));
      });
    },

    // Open the add step modal window
    add() {
      EventBus.$emit("modal-open", "", "new-model");

      setTimeout(() => {
        EventBus.$emit("openNewStepModal");
      }, 1);
    },

    // Delete a connection
    detach() {
      if (this.selectedConnection.id != null) {
        jsPlumb.deleteConnection(this.selectedConnection.object);
        this.selectedConnection.object = null;
        this.selectedConnection.id = null;
      } else {
        // Have to remove the active connections first from the
        // element(s)
        for (var i = 0; i < this.$selected().length; i++) {
          jsPlumb.deleteConnectionsForElement(this.$selected()[i]);
          jsPlumb.removeAllEndpoints(this.$selected()[i]);
        }

        $(".selected").remove();
      }
    },

    // Change the connection label text
    changeLabel(label) {
      label.setLabel("You clicked the label.");
    },

    // When a user click to a connector register the
    // connection data and set the connector style
    registerConnectionData(id, conn) {
      // If the user clicked the selected connection
      // we have to remove the selection and set
      // the style back to the original
      if (this.selectedConnection.id == conn.id) {
        this.selectedConnection.object.setPaintStyle(
          this.getSourceEndpointStyle().connectorStyle
        );
        // than reset the properties to null
        this.selectedConnection.object = null;
        this.selectedConnection.id = null;
      } else {
        // If the selectedConnectionId is not null
        // a connection is already selected so
        // we have to deselect it and set the
        // style back to the original first
        if (this.selectedConnection.id != null) {
          this.selectedConnection.object.setPaintStyle(
            this.getSourceEndpointStyle().connectorStyle
          );
        }

        // after that set the property to the selected
        // connection and set the style to selected
        this.selectedConnection.object = conn;
        this.selectedConnection.id = conn.id;
        conn.setPaintStyle(
          this.getSourceEndpointStyle().selectedConnectorStyle
        );
      }
    }
  }
};
</script>

<style>
.aLabel {
  background-color: white;
  padding: 0.4em;
  font: 12px sans-serif;
  color: #444;
  z-index: 21;
  border: 1px dotted gray;
  opacity: 0.8;
  cursor: pointer;
}
.jtk-endpoint,
.endpointTargetLabel,
.endpointSourceLabel {
  z-index: 21;
  cursor: pointer;
}
.aLabel.jtk-hover {
  background-color: #5c96bc;
  color: white;
  border: 1px solid white;
}

.window.jtk-connected {
  border: 1px solid green;
}

.jtk-drag {
  outline: 4px solid pink !important;
}

path,
.jtk-endpoint {
  cursor: pointer;
}

.jtk-overlay {
  background-color: transparent;
}
.selected {
  border: 2px double rgba(255, 71, 58, 0.81);
}
</style>
