export default {
    created() {
        EventBus.$on("plumb", this.plumb);
        EventBus.$on("group", this.group);
    },

    destroyed() {
        //EventBus.$off("chart-style");
        EventBus.$off("plumb");
        EventBus.$off("group");
    },

    mounted() {
        jsPlumb.ready(() => {
            this.$nextTick(() => {
                //listen for clicks on connections, and offer to delete connections on click.
                jsPlumb.bind("click", function(conn, originalEvent) {
                    EventBus.$emit("registerConnectionData", conn.id, conn);
                });

                //listen for new connections; initialise them the same way we initialise the connections at startup.
                jsPlumb.bind("connection", function(connInfo, originalEvent) {
                    EventBus.$emit("modal-open", "", "new-relation");

                    setTimeout(() => {
                        EventBus.$emit("openNewRelationModal", connInfo);
                    }, 1);
                });

                $("html").keyup(function(e) {
                    if (e.keyCode == 46) EventBus.$emit("detach");
                });
            });
        });
    },

    methods: {
        //
    }
};
