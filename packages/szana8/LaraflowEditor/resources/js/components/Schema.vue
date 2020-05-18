<template>
    <div class="flex w-full" id="schema">
        <div class="flex bg-gray-200 w-full h-screen">
             <div class="ml-3 mt-2">
                <button class="block button w-24 bg-white px-4 py-2 border border-gray-400 text-purple-600 rounded-md justify-center text-sm font-semibold mb-2 hover:bg-purple-600 hover:text-white" @click="add">
                    <div class="tooltip focus:outline-none inline-flex mr-2 items-center">
                        <i class="fas fa-plus pr-1"/>Add
                    </div>
                </button>
                <button class="block button w-24 bg-white px-4 py-2 border border-gray-400 text-purple-600 rounded-md justify-center text-sm font-semibold hover:bg-purple-600 hover:text-white">
                    <div class="tooltip focus:outline-none inline-flex mr-2 items-center">
                        <i class="fas fa-save pr-1"/>Save
                    </div>
                </button>
            </div>
            <div id="container" class="w-full h-screen flex justify-center pt-8" ref="container">
                <div id="laraflow-editor-start" class="laraflow-editor-elements absolute rounded-full antialiased font-semibold shadow shadow-md cursor-pointer h-16 w-16 bg-green-100 border border-green-500 flex items-center justify-center">Start</div>


                <!-- <div id="laraflow-editor-step" class="laraflow-editor-elements absolute rounded-md antialiased font-semibold shadow shadow-md cursor-pointer px-8 py-2 bg-blue-100 border border-blue-500 flex items-center justify-center">Event Name</div>
                <div id="laraflow-editor-end" class="laraflow-editor-elements absolute rounded-full antialiased font-semibold shadow shadow-md cursor-pointer h-16 w-16 bg-red-100 border border-red-500 flex items-center justify-center">End</div>-->

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
            elementID: 1,
            instance: null,
            connectorPaintStyle: {
                strokeWidth: 2,
                stroke: "#61B7CF",
                joinstyle: "round",
                outlineStroke: "white",
                outlineWidth: 2
            },
             connectorHoverStyle: {
                strokeWidth: 3,
                stroke: "#216477",
                outlineWidth: 5,
                outlineStroke: "white"
            },
            endpointHoverStyle: {
                fill: "#216477",
                stroke: "#216477"
            },
            sourceEndpoint: {
                endpoint: "Dot",
                paintStyle: {
                    stroke: "#7AB02C",
                    fill: "transparent",
                    radius: 5,
                    strokeWidth: 1
                },
                isSource: true,
                maxConnections: -1,
                connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
                connectorStyle: this.connectorPaintStyle,
                hoverPaintStyle: this.endpointHoverStyle,
                connectorHoverStyle: this.connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    [ "Label", {
                        location: [0.5, 1.5],
                        //label: "Drag",
                        cssClass: "endpointSourceLabel",
                        visible:true
                    } ]
                ]
            },
             targetEndpoint: {
                endpoint: "Dot",
                paintStyle: {
                    fill: "#7AB02C",
                    radius: 5
                },
                hoverPaintStyle: this.endpointHoverStyle,
                maxConnections: -1,
                dropOptions: { hoverClass: "hover", activeClass: "active" },
                isTarget: true,
                overlays: [
                    [ "Label", { location: [0.5, -0.5], cssClass: "endpointTargetLabel", visible:true } ]
                ]
            },
            basicType: {
                connector: "StateMachine",
                paintStyle: { stroke: "red", strokeWidth: 4 },
                hoverPaintStyle: { stroke: "blue" },
                overlays: [
                    "Arrow"
                ]
            },
        }
    },

    mounted() {
        jsPlumb.ready(function() {
            jsPlumb.Defaults.Container = $("#container");
        });

        this.instance = jsPlumb.getInstance({
            DragOptions: {
                cursor: 'pointer',
                zIndex: 2000
            },
            //the arrow overlay for the connection
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    visible: true,
                    id: "ARROW"
                }]
            ],
            Container: "canvas"
        });

        this.instance.registerConnectionType("basic", this.basicType);

        // var  _saveFlowchart = function () {
        //     var totalCount = 0;
        //     var elementCount = 3;
        //     if (elementCount > 0) {
        //         var nodes = [];

        //         //check whether the diagram has a start element
        //         var elm = $("#laraflow-editor-start");
        //         if (elm.length == 0) {
        //             alert("The flowchart diagram should have a start element");
        //         } else {
        //             $(".laraflow-editor-elements").each(function (index, element) {
        //                 totalCount++;
        //                 var $element = $(element);
        //                 var type = $element.attr('class').toString().split(" ")[1];
        //                 if (type == "step" || type == "diamond" || type == "parallelogram") {
        //                     nodes.push({
        //                         elementId: $element.attr('id'),
        //                         elementName: $element.attr('name'),
        //                         nodeType: type,
        //                         positionX: parseInt($element.css("left"), 10),
        //                         positionY: parseInt($element.css("top"), 10),
        //                         clsName: $element.attr('class').toString(),
        //                         label: $element.text(),
        //                         width: $element.outerWidth(),
        //                         height: $element.outerHeight()
        //                     });
        //                 } else {
        //                     nodes.push({
        //                         elementId: $element.attr('id'),
        //                         elementName: $element.attr('name'),
        //                         nodeType: $element.attr('class').toString().split(" ")[1],
        //                         positionX: parseInt($element.css("left"), 10),
        //                         positionY: parseInt($element.css("top"), 10),
        //                         clsName: $element.attr('class').toString(),
        //                         label: $element.text()
        //                     });
        //                 }
        //             });

        //             var connections = [];
        //             $.each(this.instance.getConnections(), function (index, connection) {
        //                 connections.push({
        //                     connectionId: connection.id,
        //                     sourceUUId: connection.endpoints[0].getUuid(),
        //                     targetUUId: connection.endpoints[1].getUuid(),
        //                     sourceId: connection.sourceId,
        //                     targetId: connection.targetId
        //                 });
        //             });

        //             var flowchart = {};
        //             flowchart.nodes = nodes;
        //             flowchart.connections = connections;
        //             flowchart.numberOfElements = totalCount;
        //             console.log(JSON.stringify(flowchart));
        //         }
        //     }
        // }
        this.$nextTick(()=>{
            this.addEndpoints("laraflow-editor-start", ["BottomCenter"], []);
            this.instance.draggable(jsPlumb.getSelector("#laraflow-editor-start"), { grid: [20, 20] });

             this.instance.bind("connectionDrag", function (connection) {
                console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
            });

             //listen for clicks on connections, and offer to delete connections on click.

            this.instance.bind("click", function (conn, originalEvent) {
                if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
                    this.instance.detach(conn);
            });

           this.instance.batch(function () {

                // _addEndpoints("laraflow-editor-step", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
                // _addEndpoints("laraflow-editor-end", [], ["TopCenter"]);

                // listen for new connections; initialise them the same way we initialise the connections at startup.
                // this.instance.bind("connection", function (connInfo, originalEvent) {
                //     init(connInfo.connection);
                // });

                // make all the window divs draggable
                //this.instance.draggable(jsPlumb.getSelector(".laraflow-editor-elements"), { grid: [20, 20] });






                // this.instance.bind("connectionDragStop", function (connection) {
                //    _saveFlowchart();
                // });

                // this.instance.bind("connectionMoved", function (params) {
                //     console.log("connection " + params.connection.id + " was moved");
                // });
            });
        });
    },

    methods: {
        addEndpoints (toId, sourceAnchors, targetAnchors) {
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                this.instance.addEndpoint( toId, this.sourceEndpoint, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                });
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                this.instance.addEndpoint(toId, this.targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
            }
        },

        add() {
            this.elementID++;
            $('#container').append('<div id="laraflow-editor-step-'+this.elementID+'" class="laraflow-editor-elements absolute rounded-md antialiased font-semibold shadow shadow-md cursor-pointer px-8 py-2 bg-blue-100 border border-blue-500 flex items-center justify-center">Event Name</div>');
            this.addEndpoints("laraflow-editor-step-" + this.elementID, [], ["TopCenter"]);
            this.instance.draggable(jsPlumb.getSelector("#laraflow-editor-step-"+this.elementID), { grid: [20, 20] });
        },
    }
}

</script>
<style>
.window {
    border: 0.1em solid black;
    width: 100px;
    height: 100px;
    position: absolute;
}

#window1 {
    left: 2em;
    top: 2em;
}

#window2 {
    left: 5em;
    top: 10em;
}

#window3 {
    left: 20em;
    top: 5em;
}

</style>
