<script>
    import { slide } from 'svelte/transition';

    export let title = 'Section Title';
    export let icon = '❓';
    export let startCollapsed = true;

    let collapsed = startCollapsed;

    function toggle() {
        collapsed = !collapsed;
    }
</script>

<div class="section-container">
    <div class="section-header" on:click={toggle}>
        <div class="header-left">
            <span class="section-icon">{icon}</span>
            <h2>{title}</h2>
        </div>
        <span class="toggle-icon" class:collapsed>▼</span>
    </div>

    {#if !collapsed}
        <div class="collapsible-content" transition:slide={{ duration: 300 }}>
            <slot></slot>
        </div>
    {/if}
</div>

<style>
    .section-container {
        margin-bottom: 40px;
    }

    .section-header {
        background: linear-gradient(90deg, rgba(255, 107, 157, 0.2), rgba(72, 219, 251, 0.2));
        padding: 15px 25px;
        border-radius: 15px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        user-select: none;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .section-icon {
        font-size: 2em;
    }

    h2 {
        color: #f0f0f0;
        font-size: 1.8em;
        font-weight: 600;
        margin: 0;
    }

    .toggle-icon {
        font-size: 1.2em;
        transition: transform 0.3s ease;
        color: #48dbfb;
    }

    .toggle-icon.collapsed {
        transform: rotate(-90deg);
    }

    .collapsible-content {
        padding: 0 10px;
    }
</style>
