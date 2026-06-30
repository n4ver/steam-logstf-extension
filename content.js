// A central registry for your services
const services = [
    {
        name: "Logs.tf",
        urlBase: "https://logs.tf/profile/",
        // Ensure this logic only triggers on Steam Community
        isActive: () => window.location.hostname === "steamcommunity.com"
    },
    {
        name: "Demos.tf",
        urlBase: "https://demos.tf/profiles/",
        isActive: () => window.location.hostname === "steamcommunity.com"
    },
    {
        name: "Matcha.tf",
        urlBase: "https://matcha.tf/players/",
        isActive: () => window.location.hostname === "steamcommunity.com"
    }
];

function getSteamId() {
    const profileHeader = document.querySelector('.profile_header');
    if (!profileHeader) return null;
    const profileElement = profileHeader.querySelector('[data-miniprofile]');
    if (profileElement) {
        const accountId = parseInt(profileElement.getAttribute('data-miniprofile').replace('u', ''));
        return (BigInt(accountId) + 76561197960265728n).toString();
    }
    return null;
}

function injectLinks() {
    const steamId = getSteamId();
    if (!steamId) return;

    // Target the button bar directly
    const actionArea = document.querySelector('.profile_header_actions');
    if (!actionArea || document.getElementById('my-link-container')) return;

    // 1. Create a container for all your links
    const container = document.createElement('div');
    container.id = 'my-link-container';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.marginTop = '10px';

    // 2. Add your links
    services.forEach(service => {
        const link = document.createElement('a');
        link.href = `${service.urlBase}${steamId}`;
        link.textContent = `View ${service.name}`;
        link.target = '_blank';
        link.className = 'btn_green_white_innerfade btn_medium'; 
        container.appendChild(link);
    });

    // 3. Add to the action area
    actionArea.appendChild(container);
}

const observer = new MutationObserver(injectLinks);
observer.observe(document.body, { childList: true, subtree: true });
injectLinks();