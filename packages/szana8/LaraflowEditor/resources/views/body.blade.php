<body class="bg-gray-200">
	<script>
		window.LaraflowEditor = {
			activeTab: parseInt(localStorage.getItem('schematics-active-tab') || 1),
		}
	</script>

	<div id="app">
        <laraflow-editor />
    </div>

    <script type="module" src="{{ asset('vendor/LaraflowEditor/app.js') }}"></script>
</body>
