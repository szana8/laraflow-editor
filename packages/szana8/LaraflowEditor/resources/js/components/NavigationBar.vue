<template>
    <nav
        id="header"
        class="fixed w-full z-20 top-0 bg-white border-b border-gray-400"
    >
        <div
            class="w-full flex flex-wrap justify-between mt-0 py-4"
        >
            <div class="pl-4 flex items-center">
                <img class="logo mr-2" src="vendor/LaraflowEditor/images/icons/icon.png">

                <a class="text-gray-900 no-underline text-lg font-thin">
                    <span class="font-bold">Laraflow</span> Editor
                </a>

                <div class="flex-1 w-full mx-auto max-w-sm content-center">
                    <div class="relative pull-right pl-4 pr-4">
                        <input
                            type="search"
                            placeholder="Search..."
                            class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"
                        >

                        <div class="absolute search-icon" style="top: 0.375rem; left: 1.75rem;">
                            <svg class="fill-current pointer-events-none text-gray-800 w-4 h-4"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path
                                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <buttons/> -->
        </div>
    </nav>
</template>



<style>
    .logo {
        margin-top: -5px;
        width: 40px;
        opacity: .8;
    }

    #header {
        max-height: 70px;
        min-width: 920px;
        z-index: 1000;
    }

    .icon {
        color: #9F7AEA
    }

    .migration-warning {
        cursor: help !important;
    }

    #model-count {
        color: #9F7AEA;
    }

    #migration-count {
        color: #9F7AEA;
    }

    #idle-migrations-count {
        color: #ea3d4c;
    }

    #redundant-migrations-count {
        color: #ea3d4c;
    }
</style>
