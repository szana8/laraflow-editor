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
        <div id="laraflow-editor-start" :class="this.getStartNodeStyle()">
          Start
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlumbStyles from "../lib/PlumbStyles";
import Helpers from "../lib/Helpers";

export default {
  name: "schema",

  components: {},

  mixins: [PlumbStyles, Helpers],

  data() {
    return {
      selectedConnectionId: null,
      selectedConnection: null,
      instance: null,
      zoomLevel: 1
    };
  },

  mounted() {
    EventBus.$on("detach", this.detach);
    EventBus.$on("addStep", this.addStep);
    EventBus.$on("changeLabel", this.changeLabel);
    EventBus.$on("registerConnectionData", this.registerConnectionData);

    jsPlumb.ready(() => {
      //
    });

    this.addEndpoints("laraflow-editor-start", ["BottomCenter"], []);

    jsPlumb.draggable(jsPlumb.getSelector("#laraflow-editor-start"), {
      grid: [10, 10]
    });

    this.$nextTick(() => {
      //listen for clicks on connections, and offer to delete connections on click.
      jsPlumb.bind("click", function(conn, originalEvent) {
        EventBus.$emit("registerConnectionData", conn.id, conn);
      });

      //listen for new connections; initialise them the same way we initialise the connections at startup.
      jsPlumb.bind("connection", function(connInfo, originalEvent) {
        connInfo.connection.getOverlay("label").setLabel("Valami label");
      });

      $("html").keyup(function(e) {
        if (e.keyCode == 46)
          EventBus.$emit("detach", this.selectedConnection);
      });
    });

  }
  methods: {
    addEndpoints(toId, sourceAnchors, targetAnchors) {
      for (var i = 0; i < sourceAnchors.length; i++) {
        var sourceUUID = toId + sourceAnchors[i];
        jsPlumb.addEndpoint(toId, this.getSourceEndpointStyle(), {
          isSource: true,
          isTarget: false,
          anchor: sourceAnchors[i],
          uuid: sourceUUID,
          connectorOverlays: this.getConnectionOverlay()
        });
      }
      for (var j = 0; j < targetAnchors.length; j++) {
        var targetUUID = toId + targetAnchors[j];
        jsPlumb.addEndpoint(toId, this.getTargetEndpointStyle(), {
          isSource: false,
          isTarget: true,
          anchor: targetAnchors[j],
          uuid: targetUUID,
          connectorOverlays: this.getConnectionOverlay()
        });
      }
    },

    // Add a new node to the instance with a unique id
    addStep(stepName) {
      var elementUID = this.uuid();
      var style = this.getNewNodeStyle();

      var element = $("#container").append(
        '<div id="' + elementUID + '">' + stepName + "</div>"
      );

      $("#" + elementUID).addClass(style);

      /*       element.bind("click", function() {
        alert("click");
      }); */

      this.addEndpoints(
        elementUID,
        ["RightMiddle", "BottomCenter"],
        ["TopCenter", "LeftMiddle"]
      );
      jsPlumb.draggable($("#" + elementUID), {
        grid: [10, 10]
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
    detach(conn) {
      jsPlumb.deleteConnection(this.selectedConnection);
      this.selectedConnection = null;
      this.selectedConnectionId = null;
    },

    changeLabel(label) {
      label.setLabel("You clicked the label.");
    },

    // When a user click to a connector register the
    // connection data and set the connector style
    registerConnectionData(id, conn) {
      // If the user clicked the selected connection
      // we have to remove the selection and set
      // the style back to the original
      if (this.selectedConnectionId == conn.id) {
        this.selectedConnection.setPaintStyle(
          this.getSourceEndpointStyle().connectorStyle
        );
        // than reset the properties to null
        this.selectedConnection = null;
        this.selectedConnectionId = null;
      } else {
        // If the selectedConnectionId is not null
        // a connection is already selected so
        // we have to deselect it and set the
        // style back to the original first
        if (this.selectedConnectionId != null) {
          this.selectedConnection.setPaintStyle(
            this.getSourceEndpointStyle().connectorStyle
          );
        }

        // after that set the property to the selected
        // connection and set the style to selected
        this.selectedConnection = conn;
        this.selectedConnectionId = conn.id;
        conn.setPaintStyle(
          this.getSourceEndpointStyle().selectedConnectorStyle
        );
      }
    }
  }
}
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
</style>
