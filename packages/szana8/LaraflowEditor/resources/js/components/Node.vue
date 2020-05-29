<template>
  <div v-bind:id="this.attrs.id" v-bind:class="this.attrs.class">
    {{ this.attrs.name }}
  </div>
</template>

<script>
export default {
  props: ["attrs"],
  data() {
    return {};
  },

  mounted() {
    this.addEndpoints(
      this.attrs.id,
      this.attrs.endpoints.out,
      this.attrs.endpoints.in
    );

    jsPlumb.draggable(jsPlumb.getSelector("#" + this.attrs.id), {
      grid: [10, 10]
    });
  },

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
    }
  }
};
</script>
