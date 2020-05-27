require("../../node_modules/@fortawesome/fontawesome-free/js/all.min");

import jQuery from "jquery";
import Vue from "vue";
import jsPlumb from "jsplumb";
import Helpers from "./lib/Helpers";
import Elements from "./lib/Elements";
import Shortcuts from "./lib/Shortcuts";
import LaraflowEditor from "./components/LaraflowEditor.vue";

window.$ = jQuery;
window.jsPlumb = jsPlumb.jsPlumb;
window.EventBus = new Vue({});

Vue.mixin(Helpers);
Vue.mixin(Elements);
Vue.mixin(Shortcuts);

const App = new Vue({
    el: "#app",

    components: {
        "laraflow-editor": LaraflowEditor
    }
});

export default App;
