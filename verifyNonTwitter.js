// 1. Block window.open
window.open = function () {
  console.log("🚫 Blocked window.open");
  return null;
};

// 2. Prevent new tab behavior (Ctrl+click, target="_blank")
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
async function clickDiscordAndTelegramClaims() {
  let attempts = 0;
  const maxAttempts = 1000; // Limit to prevent infinite loops

  while (attempts < maxAttempts) {
    // Find all elements containing "Discord" or "Telegram" in the span
    const questElements = Array.from(document.querySelectorAll('span.uppercase'))
      .filter(span => ['Discord', 'Telegram'].includes(span.textContent.trim()))
      .map(span => span.closest('.loyalty-quest'));

    // If no quest elements are found, exit the loop
    if (questElements.length === 0) {
      console.log('No Discord or Telegram quests found.');
      break;
    }

    let clickedAny = false;

    // Loop through each quest element and click the Claim button
    for (const element of questElements) {
      const questType = element.querySelector('span.uppercase').textContent.trim();
      const claimButton = element.querySelector(`a[label="Go to ${questType}"][action="ClaimReward"]`);
      if (claimButton) {
        console.log(`Attempt ${attempts + 1}: Clicking Claim button for ${questType} quest`);
        claimButton.click();
        clickedAny = true;
        
        // Random delay between 2000 and 3000 ms
        const delay = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // If no buttons were clicked in this loop, exit
    if (!clickedAny) {
      console.log('No more Claim buttons found for Discord or Telegram quests.');
      break;
    }

    // Increment attempt counter
    attempts++;
    
    // Wait briefly before rechecking to allow page updates
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  if (attempts >= maxAttempts) {
    console.log(`Reached maximum attempts (${maxAttempts}). Some Claim buttons may still persist.`);
  } else {
    console.log('Finished clicking all Discord and Telegram Claim buttons.');
  }
}

// Run the function
clickDiscordAndTelegramClaims();
