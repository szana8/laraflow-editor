<template>
	<div class="laraflow-editor">
		<nav-bar />
        <div class="h-screen flex">
            <side-bar/>
            <loading />
            <schema />
        </div>
	</div>
</template>

<script>
    import NavigationBar from './NavigationBar.vue';
    import Loading from './Loading.vue';
    import Sidebar from './Sidebar.vue'
    import Schema from './Schema.vue';

    export default {
        name: 'laraflow-editor',

        components: {
        	'nav-bar': NavigationBar,
        	'loading': Loading,
            'side-bar': Sidebar,
            'schema': Schema
        },
        mounted() {
            //EventBus.$emit('loading', true);
        },

        methods: {

        }
    }
</script>

