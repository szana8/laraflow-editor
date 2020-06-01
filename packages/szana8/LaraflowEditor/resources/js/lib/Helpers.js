export default {
    methods: {
        config(key) {
            let value = null;

            key.split(".").forEach(
                key => (value = value ? value[key] : Schematics.config[key])
            );

            return value;
        },

        uuid() {
            return "div_" + new Date().getTime().toString();
        },

        arrayDiff(a, b) {
            return [
                ...a.filter(x => b.indexOf(x) === -1),
                ...b.filter(x => a.indexOf(x) === -1)
            ];
        },

        arrayDiffByKey(key, ...arrays) {
            return [].concat(
                ...arrays.map((arr, i) => {
                    const others = arrays.slice(0);

                    others.splice(i, 1);

                    const unique = [...new Set([].concat(...others))];

                    return arr.filter(
                        x => !unique.some(y => x[key] === y[key])
                    );
                })
            );
        },

        initConn(connection) {
            console.log(
                connection.sourceId.substring(15) +
                    "-" +
                    connection.targetId.substring(15)
            );
            connection
                .getOverlay("label")
                .setLabel(
                    connection.sourceId.substring(15) +
                        "-" +
                        connection.targetId.substring(15)
                );
        }
    }
};
