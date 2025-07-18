//this is prevent link
window.open = function () {
  console.log("🚫 Blocked window.open");
  return null;
};
document.addEventListener(
  "click",
  function (e) {
    const link = e.target.closest("a");
    if (link && (link.target === "_blank" || e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      console.log("🚫 Blocked new tab for:", link.href);
    }
  },
  true
);
//This is main script
(async () => {
    const maxAttempts = 100;
    let attempt = 0;

    while (attempt < maxAttempts) {
        const buttons = Array.from(document.querySelectorAll('[action="ClaimReward"]'))
            .filter(button => button.offsetParent !== null); // Ensure button is visible

        if (buttons.length === 0) {
            console.log('No more ClaimReward buttons found.');
            break;
        }

        for (const button of buttons) {
            const titleElement = button.closest('.loyalty-quest')?.querySelector('.text-sm\\/4.md\\:text-base\\/5.break-word');
            const title = titleElement?.textContent.trim() || '';

            if (title === 'Stream 1 hour of content on RewardedTV' || title === 'Stream 3 hours of content on RewardedTV') {
                console.log('Skipping button with title:', title);
                continue;
            }

            const label = button.getAttribute('label') || 'No label'; 
            console.log('Scrolling to and clicking button with label:', label, 'and title:', title);
            
            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await new Promise(resolve => setTimeout(resolve, 500));

            button.click();
            const delay = Math.random() * 1000 + 2000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        attempt++;
        console.log(`Attempt ${attempt} of ${maxAttempts}`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (attempt >= maxAttempts) {
        console.log('Reached maximum attempts:', maxAttempts);
    }
    console.log('Script finished.');
})();
