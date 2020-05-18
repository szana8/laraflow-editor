<template>
    <div class="flex" id="schema">
        <div class="flex bg-gray-200 w-full h-screen">
             <div class="ml-3 mt-2">
                <button class="block button w-24 bg-white px-4 py-2 border border-gray-400 text-purple-600 rounded-md justify-center text-sm font-semibold mb-2 hover:bg-purple-600 hover:text-white">
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
            <div id="container" class="w-full h-screen flex items-center justify-center">
                <div id="laraflow-editor-start" class="laraflow-editor-elements absolute rounded-full antialiased font-semibold shadow shadow-md cursor-pointer h-16 w-16 bg-green-100 border border-green-500 flex items-center justify-center">Start</div>

                <!-- <div id="laraflow-editor-step" class="laraflow-editor-elements absolute rounded-md antialiased font-semibold shadow shadow-md cursor-pointer px-8 py-2 bg-blue-100 border border-blue-500 flex items-center justify-center">Event Name</div>
                <div id="laraflow-editor-end" class="laraflow-editor-elements absolute rounded-full antialiased font-semibold shadow shadow-md cursor-pointer h-16 w-16 bg-red-100 border border-red-500 flex items-center justify-center">End</div> -->
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
            //
        }
    },

    mounted() {
        jsPlumb.ready(function() {
            jsPlumb.Defaults.Container = $("#container");
        });

        var instance = jsPlumb.getInstance({
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

   var basicType = {
        connector: "StateMachine",
        paintStyle: { stroke: "red", strokeWidth: 4 },
        hoverPaintStyle: { stroke: "blue" },
        overlays: [
            "Arrow"
        ]
    };
    instance.registerConnectionType("basic", basicType);

    // this is the paint style for the connecting lines..
    var connectorPaintStyle = {
            strokeWidth: 2,
            stroke: "#61B7CF",
            joinstyle: "round",
            outlineStroke: "white",
            outlineWidth: 2
        },
    // .. and this is the hover style.
        connectorHoverStyle = {
            strokeWidth: 3,
            stroke: "#216477",
            outlineWidth: 5,
            outlineStroke: "white"
        },
        endpointHoverStyle = {
            fill: "#216477",
            stroke: "#216477"
        },
    // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
            endpoint: "Dot",
            paintStyle: {
                stroke: "#7AB02C",
                fill: "transparent",
                radius: 7,
                strokeWidth: 1
            },
            isSource: true,
            connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
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
    // the definition of target endpoints (will appear when the user drags a connection)
        targetEndpoint = {
            endpoint: "Dot",
            paintStyle: { fill: "#7AB02C", radius: 7 },
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: -1,
            dropOptions: { hoverClass: "hover", activeClass: "active" },
            isTarget: true,
            overlays: [
                [ "Label", { location: [0.5, -0.5], cssClass: "endpointTargetLabel", visible:true } ]
            ]
        },

        init = function (connection) {
            //connection.getOverlay("label").setLabel('ConnectionOverlays' + "-" + connection.targetId.substring(15));
        };

         var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            instance.addEndpoint( toId, sourceEndpoint, {
                anchor: sourceAnchors[i], uuid: sourceUUID
            });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint(toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
        }
    };

    var  _saveFlowchart = function () {
        var totalCount = 0;
        var elementCount = 3;
        if (elementCount > 0) {
            var nodes = [];

            //check whether the diagram has a start element
            var elm = $("#laraflow-editor-start");
            if (elm.length == 0) {
                alert("The flowchart diagram should have a start element");
            } else {
                $(".laraflow-editor-elements").each(function (index, element) {
                    totalCount++;
                    var $element = $(element);
                    var type = $element.attr('class').toString().split(" ")[1];
                    if (type == "step" || type == "diamond" || type == "parallelogram") {
                        nodes.push({
                            elementId: $element.attr('id'),
                            elementName: $element.attr('name'),
                            nodeType: type,
                            positionX: parseInt($element.css("left"), 10),
                            positionY: parseInt($element.css("top"), 10),
                            clsName: $element.attr('class').toString(),
                            label: $element.text(),
                            width: $element.outerWidth(),
                            height: $element.outerHeight()
                        });
                    } else {
                        nodes.push({
                            elementId: $element.attr('id'),
                            elementName: $element.attr('name'),
                            nodeType: $element.attr('class').toString().split(" ")[1],
                            positionX: parseInt($element.css("left"), 10),
                            positionY: parseInt($element.css("top"), 10),
                            clsName: $element.attr('class').toString(),
                            label: $element.text()
                        });
                    }
                });

                var connections = [];
                $.each(instance.getConnections(), function (index, connection) {
                    connections.push({
                        connectionId: connection.id,
                        sourceUUId: connection.endpoints[0].getUuid(),
                        targetUUId: connection.endpoints[1].getUuid(),
                        sourceId: connection.sourceId,
                        targetId: connection.targetId
                    });
                });

                var flowchart = {};
                flowchart.nodes = nodes;
                flowchart.connections = connections;
                flowchart.numberOfElements = totalCount;
                console.log(JSON.stringify(flowchart));
            }
        }
    }

    instance.batch(function () {

        _addEndpoints("laraflow-editor-start", ["RightMiddle"], []);
        // _addEndpoints("laraflow-editor-step", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
        // _addEndpoints("laraflow-editor-end", [], ["TopCenter"]);

        // listen for new connections; initialise them the same way we initialise the connections at startup.
        instance.bind("connection", function (connInfo, originalEvent) {
            init(connInfo.connection);
        });

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".laraflow-editor-elements"), { grid: [20, 20] });
        instance.draggable(jsPlumb.getSelector("#laraflow-editor-start"), { grid: [20, 20] });

        //
        // listen for clicks on connections, and offer to delete connections on click.
        //
        instance.bind("click", function (conn, originalEvent) {
            if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
                instance.detach(conn);
        });

        instance.bind("connectionDrag", function (connection) {
            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        instance.bind("connectionDragStop", function (connection) {
           _saveFlowchart();
        });

        instance.bind("connectionMoved", function (params) {
            console.log("connection " + params.connection.id + " was moved");
        });
    });


    },

    methods: {

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
