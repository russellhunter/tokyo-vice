<svelte:head>
    <title>Tokyo 1% Trip Project HQ - v4.0 SvelteKit</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<script>
    import Section from '../lib/Section.svelte';
    import PreTrip from '../lib/PreTrip.svelte';
</script>

<div class="container">
    <div class="header" style="padding-top: 20px;">
        <h1>🌸 Tokyo 1% Project HQ <span class="sakura-icon">🗾</span></h1>
        <div class="tagline">"You didn't just go to Tokyo. You felt it in your bones."</div>
    </div>

    <Section title="Pre-Trip Preparation" icon="✈️" startCollapsed={false}>
        <PreTrip />
    </Section>
</div>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: 'Inter', -apple-system, sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 50%, #16213e 100%);
        min-height: 100vh;
        padding: 20px;
        position: relative;
        color: #f0f0f0;
    }

    :global(body::before) {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%);
        pointer-events: none;
        z-index: 1;
    }

    .container {
        max-width: 1400px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
    }

    .header {
        text-align: center;
        color: #f0f0f0;
        margin-bottom: 30px;
    }

    .header h1 {
        font-size: 3.5em;
        margin-bottom: 10px;
        background: linear-gradient(90deg, #ff6b9d, #feca57, #48dbfb, #ff9ff3);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 3s linear infinite;
        font-weight: 700;
        letter-spacing: -1px;
    }

    @keyframes shine {
        to { background-position: 200% center; }
    }

    .header .tagline {
        font-size: 1.1em;
        opacity: 0.8;
        font-style: italic;
        color: #b8b8d0;
        letter-spacing: 1px;
    }

    .sakura-icon {
        display: inline-block;
        animation: sakuraFloat 4s ease-in-out infinite;
    }

    @keyframes sakuraFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(5deg); }
        75% { transform: translateY(5px) rotate(-5deg); }
    }
</style>
