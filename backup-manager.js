<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Dream OS v2.1 - Sovereign Edition</title>
    <link rel="stylesheet" href="./css/dream-engine-2026.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-dynamic-prayer">
    <div id="app-shell"></div>

    <script>
        // SYSTEM UTILS & SECURITY
        window.DREAM_SYS = {
            haptic: (p = 50) => { if ('vibrate' in navigator) navigator.vibrate(p); },
            log: (t, m, d = '') => {
                const s = {info:'color:#06b6d4', success:'color:#10b981', warn:'color:#f59e0b', error:'color:#ef4444', ghost:'color:#8b5cf6'};
                console.log(`%c[DREAM ${t.toUpperCase()}] %c${m}`, s[t]||'', 'color:inherit;', d);
            }
        };

        window.DREAM_SECURITY = {
            getFingerprint: () => {
                try {
                    const canvas = document.createElement('canvas');
                    const gl = canvas.getContext('webgl');
                    const renderer = gl ? gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL) : "";
                    return btoa(`${screen.width}x${screen.height}|${renderer}|${navigator.hardwareConcurrency}`);
                } catch (e) {
                    return "unknown";
                }
            },
            isAuthorized: () => true // Untuk development
        };

        // GHOST BYPASS ACTIVATION
        (function() {
            let taps = 0;
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.shell-header')) return;
                taps++;
                window.DREAM_SYS.haptic(30);
                if (taps === 5) {
                    taps = 0;
                    const pwd = prompt('👻 Ghost Architect Access:');
                    if (pwd === 'dreamos2026') {
                        let att = 0;
                        const check = () => {
                            if (window.DREAM?.load && !window.DREAM.load.toString().includes('placeholder')) {
                                window.DREAM.load(window.DREAM.state?.user ? 'ghost' : 'login');
                            } else if (att < 50) { att++; setTimeout(check, 200); }
                        };
                        check();
                    } else {
                        alert('Access denied');
                    }
                }
                setTimeout(() => taps = 0, 3000);
            });
        })();
    </script>

    <!-- UTILITY SCRIPTS -->
    <script src="js/utils/prayer-time.js" defer></script>
    <script src="js/utils/battery-monitor.js" defer></script>
    <script src="js/utils/network-monitor.js" defer></script>
    <script src="js/utils/camera-scanner.js" defer></script>
    <script src="js/utils/device-fingerprint.js" defer></script>
    <script src="js/utils/geofencing.js" defer></script>
    <script src="js/utils/system-monitor.js" defer></script>
    <script src="js/utils/smart-printer.js" defer></script>
    <script src="js/utils/nfc-scanner.js" defer></script>
    <script src="js/utils/i18n.js" defer></script>

    <!-- ENTERPRISE SECURITY UTILITIES -->
    <script src="js/utils/system-watchdog.js" defer></script>
    <script src="js/utils/secure-vault.js" defer></script>
    <script src="js/utils/stealth-engine.js" defer></script>
    <script src="js/utils/backup-manager.js" defer></script>

    <!-- MAIN MODULES -->
    <script type="module" src="js/dream-core.js"></script>
    <script type="module" src="js/ai-orchestrator.js"></script>
    <script type="module" src="shell.js"></script>

    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(() => window.DREAM_SYS.log('success', 'Service Worker Active'))
                    .catch(err => window.DREAM_SYS.log('error', 'SW Failed', err));
            });
        }
    </script>
</body>
</html>
