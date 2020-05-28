export default {
    methods: {
        getSourceEndpointStyle() {
            return {
                endpoint: "Dot",
                paintStyle: {
                    stroke: "#7AB02C",
                    fill: "transparent",
                    radius: 5,
                    strokeWidth: 1
                },
                isSource: true,
                connectionsDetachable: true,
                maxConnections: -1,
                connector: [
                    "Flowchart",
                    {
                        stub: [40, 60],
                        gap: 10,
                        cornerRadius: 5,
                        alwaysRespectStubs: true
                    }
                ],
                connectorStyle: {
                    strokeWidth: 2,
                    stroke: "#61B7CF",
                    joinstyle: "round",
                    outlineStroke: "white",
                    outlineWidth: 2
                },
                selectedConnectorStyle: {
                    strokeWidth: 2,
                    stroke: "#e53e3e",
                    joinstyle: "round",
                    outlineStroke: "white",
                    outlineWidth: 2
                },
                hoverPaintStyle: {
                    fill: "#216477",
                    stroke: "#216477",
                    cursor: "pointer"
                },
                connectorHoverStyle: {
                    strokeWidth: 3,
                    stroke: "#216477",
                    outlineWidth: 5,
                    outlineStroke: "white",
                    cursor: "pointer"
                },
                dragOptions: {
                    magnetize: true
                }
            };
        },

        getTargetEndpointStyle() {
            return {
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
                connectionsDetachable: true,
                dropOptions: { hoverClass: "hover", activeClass: "active" },
                isTarget: true,
                overlays: [
                    [
                        "Label",
                        {
                            location: 0.5,
                            cssClass: "endpointTargetLabel",
                            visible: true
                        }
                    ]
                ]
            };
        },

        getStartNodeStyle() {
            return [
                "model",
                "laraflow-editor-elements",
                "absolute",
                "rounded-full",
                "antialiased",
                "font-semibold",
                "shadow",
                "shadow-md",
                "cursor-pointer",
                "h-16",
                "w-16",
                "bg-green-100",
                "border",
                "border-green-500",
                "flex",
                "items-center",
                "justify-center"
            ];
        },

        getNewNodeStyle() {
            return [
                "model",
                "laraflow-editor-elements",
                "absolute",
                "rounded-md",
                "antialiased",
                "font-semibold",
                "shadow",
                "shadow-md",
                "cursor-pointer",
                "px-8",
                "py-2",
                "bg-blue-100",
                "border",
                "border-blue-500",
                "flex",
                "items-center",
                "justify-center"
            ];
        },

        getConnectionOverlay() {
            return [
                [
                    "Arrow",
                    {
                        location: 1,
                        visible: true,
                        width: 11,
                        length: 11,
                        id: "ARROW",
                        events: {
                            dblclick(conn, originalEvent) {
                                console.log(conn);
                            }
                        }
                    }
                ],
                [
                    "Label",
                    {
                        location: 0.5,
                        id: "label",
                        cssClass: "aLabel",
                        events: {
                            click() {
                                EventBus.$emit("changeLabel", this);
                            }
                        }
                    }
                ]
            ];
        }
    }
};
