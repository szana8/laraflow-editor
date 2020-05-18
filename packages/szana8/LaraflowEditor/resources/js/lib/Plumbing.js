export default {
    data() {
        return {
            style: localStorage.getItem(`LaraflowEditor-settings-style-tab-${LaraflowEditor.activeTab}`) || 'Bezier',
        }
    },

    created() {
        EventBus.$on('chart-style', style => {
            this.style = LaraflowEditor.style = style;
            this.plumb();
        });

        EventBus.$on('plumb', this.plumb);
        EventBus.$on('group', this.group);
    },

    destroyed() {
        EventBus.$off('chart-style');
        EventBus.$off('plumb');
        EventBus.$off('group');
    },

    mounted() {
        jsPlumb.ready(() => {
            //LaraflowEditor.style = this.style;

            jsPlumb.bind("beforeDrop", function (info) {
                if (info.sourceId === info.targetId) return;

                const $source = $(`#${info.sourceId}`),
                    $target = $(`#${info.targetId}`),
                    source = $source.data('model'),
                    target = $target.data('model'),
                    data = {
                        sourceTable: $source.data('table'),
                        targetTable: $target.data('table'),
                        source: source,
                        target: target,
                    };

                EventBus.$emit('modal-open', source, 'new-relation', data);

                setTimeout(() => {
                    EventBus.$emit('new-relation', data);
                    $('#method').focus();
                }, 1);
            });
        });
    },

    methods: {

        plumb() {
            this.$nextTick(() => {
                // EventBus.$emit('loading', false);

                setTimeout(() => {
                    jsPlumb.repaintEverything();
                    // EventBus.$emit('group');
                    // this.bindRelationClicks();
                }, 1);
            })
        },

        getStyleSettings(style) {
            return {
                'bezier': {
                    curviness: 100,
                },
                'straight': {
                    stub: 20,
                },
                'flowchart': {
                    alwaysRespectStubs: true,
                    midpoint: 0.6,
                    cornerRadius: 3,
                    stub: 10,
                },
                'statemachine': {
                    margin: -5,
                    curviness: 10,
                    proximityLimit: 100,
                },
            }[style]
        },
    },
};
