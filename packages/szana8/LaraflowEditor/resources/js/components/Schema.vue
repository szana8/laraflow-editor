<template>
    <div class="flex w-full" id="schema">
        <div class="flex bg-gray-200 w-full h-screen">
             <div class="ml-3 mt-2">
                <button class="block button w-24 bg-white px-4 py-2 border border-gray-400 text-purple-600 rounded-md justify-center text-sm font-semibold mb-2 hover:bg-purple-600 hover:text-white" @click="add">
                    <div class="tooltip focus:outline-none inline-flex mr-2 items-center">
                        <i class="fas fa-plus pr-1"/>Add
                    </div>
                </button>

                <button class="block button w-24 bg-white px-4 py-2 border border-gray-400 text-purple-600 rounded-md justify-center text-sm font-semibold mb-2 hover:bg-purple-600 hover:text-white">
                    <div class="tooltip focus:outline-none inline-flex mr-2 items-center">
                        <i class="fas fa-save pr-1"/>Save
                    </div>
                </button>
            </div>

            <div id="container" class="w-full h-screen flex justify-center pt-8">
                <div id="laraflow-editor-start" class="laraflow-editor-elements absolute rounded-full antialiased font-semibold shadow shadow-md cursor-pointer h-16 w-16 bg-green-100 border border-green-500 flex items-center justify-center">Start</div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    name: "schema",

    components: {

    },

    data() {
        return {
            selectedConnectionId: null,
            selectedConnection: null,
            elementID: 1,
            instance: null,
            zoomLevel: 1,
            sourceEndpoint: {
                endpoint: "Dot",
                paintStyle: {
                    stroke: "#7AB02C",
                    fill: "transparent",
                    radius: 5,
                    strokeWidth: 1
                },
                isSource: true,
                connectionsDetachable:true,
                maxConnections: -1,
                connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
                connectorStyle: {
                    strokeWidth: 2,
                    stroke: "#61B7CF",
                    joinstyle: "round",
                    outlineStroke: "white",
                    outlineWidth: 2
                },
                hoverPaintStyle: {
                    fill: "#216477",
                    stroke: "#216477",
                    cursor: 'pointer'
                },
                connectorHoverStyle: {
                    strokeWidth: 3,
                    stroke: "#216477",
                    outlineWidth: 0,
                    outlineStroke: "white",
                    cursor: 'pointer'
                },
                dragOptions: {
                    magnetize:true
                },
            },
            targetEndpoint: {
                endpoint: "Dot",
                paintStyle: {
                    fill: "#7AB02C",
                    radius: 5
                },
                hoverPaintStyle: {
                    fill: "#216477",
                    stroke: "#216477"
                },
                maxConnections: -1,
                connectionsDetachable:true,
                dropOptions: { hoverClass: "hover", activeClass: "active" },
                isTarget: true,
                overlays: [
                    [ "Label", { location: 0.5, cssClass: "endpointTargetLabel", visible:true } ]
                ]
            }
        }
    },

    mounted() {
        EventBus.$on('detach', this.detach);
        EventBus.$on('addStep', this.addStep);
        EventBus.$on('changeLabel', this.changeLabel);
        EventBus.$on('registerConnectionData', this.registerConnectionData);
        EventBus.$on('resetConnectionData', this.resetConnectionData);

        jsPlumb.ready(function() {
            //
        });

        this.instance = jsPlumb.getInstance({
            DragOptions: {
                cursor: 'pointer',
                zIndex: 40
            },
            //the arrow overlay for the connection
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    visible: true,
                    width:11,
                    length:11,
                    id: "ARROW",
                    events:{
                        dblclick(conn, originalEvent) {
                            console.log(conn);
                        }
                }
                }],
                [ "Label", {
                    location: 0.5,
                    id: "label",
                    cssClass: "aLabel",
                    events:{
                        click() {
                            EventBus.$emit('changeLabel', this);
                        }
                    }
                }]
            ],
            Container: "container"
        });

        this.addEndpoints("laraflow-editor-start", ["BottomCenter"], []);
        this.instance.draggable(jsPlumb.getSelector("#laraflow-editor-start"), { grid: [10, 10] });


        this.$nextTick(()=> {
            //listen for clicks on connections, and offer to delete connections on click.
            this.instance.bind("click", function (conn, originalEvent) {
                EventBus.$emit('registerConnectionData', conn.id, conn);
            });

            //listen for new connections; initialise them the same way we initialise the connections at startup.
            this.instance.bind("connection", function (connInfo, originalEvent) {
                connInfo.connection.getOverlay("label").setLabel('Valami label');
            });

            this.instance.bind("endpointClick", function () {
                alert('Endpoint click!');
            });

            $('html').keyup(function(e){
                if(e.keyCode == 46) {
                    EventBus.$emit('detach', this.selectedConnection);
                }
            });
        });

        jsPlumb.fire("jsPlumbDemoLoaded", this.instance);
    },

    methods: {
        addEndpoints (toId, sourceAnchors, targetAnchors) {
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                this.instance.addEndpoint( toId, this.sourceEndpoint, {
                    isSource:true,
                    isTarget:false,
                    anchor: sourceAnchors[i],
                    uuid: sourceUUID,
                });
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                this.instance.addEndpoint(toId, this.targetEndpoint, {
                    isSource:false,
                    isTarget:true,
                    anchor: targetAnchors[j],
                    uuid: targetUUID
                });
            }
        },

        addStep(stepName) {
            this.elementID++;
            $('#container').append('<div id="laraflow-editor-step-'+this.elementID+'" class="laraflow-editor-elements max-w-md absolute rounded-md antialiased font-semibold shadow shadow-md cursor-pointer px-8 py-2 bg-blue-100  border border-blue-500 flex items-center justify-center hover:bg-blue-200">'+ stepName +'</div>');
            this.addEndpoints("laraflow-editor-step-" + this.elementID, ["RightMiddle", "BottomCenter"], ["TopCenter", "LeftMiddle"]);
            this.instance.draggable(jsPlumb.getSelector("#laraflow-editor-step-"+this.elementID), { grid: [10, 10] });
        },

        add() {
            EventBus.$emit(
                'modal-open',
                '',
                'new-model'
            );

            setTimeout(() => {
                EventBus.$emit('openNewStepModal');
            }, 1);
        },

        detach(conn) {
            this.instance.deleteConnection(this.selectedConnection);
            this.selectedConnection = null;
            this.selectedConnectionId = null;
        },

        resetConnectionData() {
            console.log('asd');
            this.registerConnectionData(this.selectedConnectionId, this.selectedConnection);
        },

        changeLabel(label) {
            label.setLabel('adasdad');
        },

        registerConnectionData(id, conn) {
            if(this.selectedConnectionId == conn.id) {
                this.selectedConnection.setPaintStyle({stroke: "#61B7CF"});
                this.selectedConnection = null;
                this.selectedConnectionId = null;
            }
            else {
                if (this.selectedConnectionId != null) {
                    this.selectedConnection.setPaintStyle({stroke: "#61B7CF"});
                }
                this.selectedConnection = conn;
                this.selectedConnectionId = conn.id;
                conn.setPaintStyle({stroke: "red"});
            }

        },

        selectElement(id) {
            alert(id);
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
.jtk-endpoint, .endpointTargetLabel, .endpointSourceLabel {
    z-index: 21;
    cursor: pointer;
}
.aLabel.jtk-hover {
    background-color: #5C96BC;
    color: white;
    border: 1px solid white;
}

.window.jtk-connected {
    border: 1px solid green;
}

.jtk-drag {
    outline: 4px solid pink !important;
}

path, .jtk-endpoint {
    cursor: pointer;
}

.jtk-overlay {
    background-color:transparent;
}
</style>
