// 1. Block new tabs/windows
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

// 2. Quest titles
const questTitles = [
"Follow Clusters on X",
"Follow JukeBlox on X",
"Follow Wide Worlds on X",
"Follow SummitX on X",
"Follow Pixudi on X",
"Follow Pictographs on X",
"Follow Bleetz on X",
"Follow RewardedTV on X",
"Follow Cristal on X",
"Follow StoryChain on X",
"Follow Token Tails on X",
"Follow Panenka FC on X",
"Follow ScorePlay on X",
"Follow EntertainM on X",
"Follow WW Pets on X",
"Follow WW Chronicle on X",
"Post a Winner on X",
"Follow Kraft on X"

];

let currentIndex = 0;

// 3. Quest click loop
function clickNextQuest() {
  if (currentIndex >= questTitles.length) {
    console.log("🎉 All quests completed!");
    return;
  }

  const currentTitle = questTitles[currentIndex];
  const quests = document.querySelectorAll(".loyalty-quest");
  let matched = false;

  for (const quest of quests) {
    const title = quest.querySelector("div.text-sm\\/4, div.md\\:text-base\\/5");
    if (title && title.textContent.trim() === currentTitle) {
      matched = true;
      const button = quest.querySelector("a");
      if (!button) {
        console.log(`✅ Completed: ${currentTitle}`);
        currentIndex++;
        return;
      }

      const label = button.textContent.trim();
      if (label === "Go to X" || label === "Claim") {
        button.click();
        console.log(`🔁 Clicked "${label}" for "${currentTitle}"`);
      } else {
        console.log(`⏸ Waiting: "${label}" for "${currentTitle}"`);
      }
      return;
    }
  }

  if (!matched) {
    console.log(`✅ "${currentTitle}" not found — skipping`);
    currentIndex++;
  }
}

// 4. Start loop
setInterval(clickNextQuest, 3000);
