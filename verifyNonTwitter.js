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

// 3. List of button texts to click
const buttonTexts = [
"Go to Bleetz", 
"Go to Discord", 
"Go to Telegram",
"Go to Clusters",
"Go to SummitX",
"Go to Belgrano",
"Go to Cristal",
"Go to Camp Stories",
"Go to Origin"

];
let currentButtonIndex = 0;

// 4. Loop to click buttons one by one
setInterval(() => {
  if (currentButtonIndex >= buttonTexts.length) {
    console.log("🎉 All buttons processed");
    return;
  }

  const targetText = buttonTexts[currentButtonIndex];
  const btn = Array.from(document.querySelectorAll("a")).find(
    (a) => a.textContent.trim() === targetText
  );

  if (btn) {
    btn.click();
    console.log(`🔁 Clicked: "${targetText}"`);
  } else {
    console.log(`✅ "${targetText}" not found — moving to next`);
    currentButtonIndex++;
  }
}, 3000);
