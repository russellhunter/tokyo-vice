<script>
    import { slide } from 'svelte/transition';

    let preFlightCollapsed = false;
    let packDayCollapsed = false;
    let departureDayCollapsed = false;
</script>

<div class="dashboard">
    <!-- Pre-Trip Tasks -->
    <div class="card">
        <h2 class="collapsible-header" on:click={() => preFlightCollapsed = !preFlightCollapsed}>
            <span>📋 Pre-Flight Checklist</span>
            <span class="toggle-icon" class:collapsed={preFlightCollapsed}>▼</span>
        </h2>
        {#if !preFlightCollapsed}
        <div class="collapsible-content" transition:slide>
            <ul class="task-list">
                <li class="task-item priority-high">Book first week hotel (24th-29th Sept)</li>
                <li class="task-item priority-high">Book final weekend hotels (4th-6th Oct)</li>
                <li class="task-item priority-high">Confirm Nikitias Airport Travel</li>
                 <li class="task-item priority-high">Register Visit Japan Web</li>
                <li class="task-item priority-medium">Book Sumo tickets (27th Sept)</li>
                <li class="task-item priority-medium">Book TeamLab Borderless</li>
            </ul>
        </div>
        {/if}
    </div>

    <!-- Pack Day -->
    <div class="card">
        <h2 class="collapsible-header" on:click={() => packDayCollapsed = !packDayCollapsed}>
            <span>📦 Mon 22nd Sept - Pack Day</span>
            <span class="toggle-icon" class:collapsed={packDayCollapsed}>▼</span>
        </h2>
        {#if !packDayCollapsed}
        <div class="collapsible-content" transition:slide>
            <div class="tips-section">
                <h3>Afternoon Tasks:</h3>
                <ul>
                    <li>13:10 - Online check-in</li>
                    <li>14:00 - Confirm taxi with Nikitias</li>
                    <li>16:00 - Download offline content</li>
                    <li>17:00 - Charge all devices</li>
                    <li>Print all documents (flights, hotels, etc.)</li>
                </ul>
            </div>
        </div>
        {/if}
    </div>

    <!-- Departure Day -->
    <div class="card">
        <h2 class="collapsible-header" on:click={() => departureDayCollapsed = !departureDayCollapsed}>
            <span>✈️ Tue 23rd Sept - Departure</span>
            <span class="toggle-icon" class:collapsed={departureDayCollapsed}>▼</span>
        </h2>
        {#if !departureDayCollapsed}
        <div class="collapsible-content" transition:slide>
            <div class="tips-section" style="background: rgba(255, 107, 157, 0.1);">
                <h3>🚕 Nikitias Taxi Pickup:</h3>
                <ul>
                    <li><strong>07:30</strong> - Pickup time</li>
                </ul>
            </div>
        </div>
        {/if}
    </div>
</div>

<style>
    .card {
        background: rgba(25, 25, 40, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 25px;
        margin-bottom: 20px;
    }
    .collapsible-header {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
    }
    .collapsible-header:not(:last-child) {
        margin-bottom: 15px;
    }
    .toggle-icon {
        font-size: 1.2em;
        transition: transform 0.3s ease;
        color: #48dbfb;
    }
    .toggle-icon.collapsed {
        transform: rotate(-90deg);
    }
    h2 {
        color: #ff6b9d;
        font-size: 1.4em;
        margin: 0;
    }
    .task-list {
        list-style: none;
        color: #e0e0e0;
        padding: 0;
    }
    .task-item {
        padding: 12px;
        margin: 10px 0;
        background: rgba(30, 30, 50, 0.6);
        border-radius: 12px;
    }
    .priority-high {
        border-left: 3px solid #ff6b9d;
    }
    .priority-medium {
        border-left: 3px solid #feca57;
    }
    .tips-section {
        background: rgba(30, 30, 50, 0.6);
        padding: 15px;
        border-radius: 12px;
        margin: 10px 0;
        color: #e0e0e0;
    }
    .tips-section h3 {
        color: #48dbfb;
        margin-bottom: 10px;
    }
    ul {
        padding-left: 20px;
    }
</style>
