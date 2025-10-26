// Roast collections by category
const roasts = {
  general: [
    "I'd agree with you, but then we'd both be wrong.",
    "You're not stupid; you just have bad luck thinking.",
    "I'd explain it to you, but I left my crayons at home.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "If I wanted to hear from someone with your IQ, I'd watch a documentary on rocks.",
    "You bring everyone so much joy... when you leave the room.",
    "I'm not saying you're dumb, but you'd probably get lost in your own house.",
    "You're proof that evolution can go in reverse.",
    "I'd challenge you to a battle of wits, but I see you came unarmed.",
    "You're like a software update. Whenever I see you, I think 'not now'.",
  ],
  personality: [
    "Your personality is like a participation trophy – everyone gets one, but nobody really wants it.",
    "You have the perfect face for radio and the perfect voice for mime.",
    "You're living proof that two wrongs don't make a right.",
    "If you were any more laid back, you'd be horizontal.",
    "You have an overwhelming capacity to be underwhelming.",
    "Your ego is the only thing about you that's in shape.",
    "You're like a broken clock – right twice a day, wrong the rest of the time.",
    "Your confidence is inspiring, considering you have so little to be confident about.",
    "You're the human equivalent of a participation award.",
    "Your social skills are like a dial-up connection – outdated and painfully slow.",
  ],
  habits: [
    "Your eating habits make a raccoon look sophisticated.",
    "You procrastinate so much, you probably won't finish reading this roast.",
    "Your sleep schedule is more chaotic than a toddler's art project.",
    "You've made being late into an art form – too bad nobody appreciates it.",
    "Your organizational skills could make Marie Kondo cry.",
    "You check your phone so much, you're basically married to it.",
    "Your snooze button has filed a restraining order against you.",
    "You could lose your keys in an empty room.",
    "Your attention span makes a goldfish look focused.",
    "You say 'just one more episode' like it's your personal catchphrase.",
  ],
  style: [
    "Your fashion sense is so unique – like a thrift store had a clearance sale.",
    "Did you get dressed in the dark, or is that just your style?",
    "Your outfit looks like you lost a bet.",
    "You dress like you're about to fight your future self.",
    "Your style is so retro, archaeologists want to study it.",
    "That haircut is bold – emphasis on 'bold' not 'good'.",
    "Your fashion choices are... certainly choices.",
    "You look like you were dressed by a committee that couldn't agree on anything.",
    "Your sense of style is inspirational – it inspires people to dress better.",
    "Is that outfit ironic, or did you genuinely think it worked?",
  ],
};

// State
let selectedCategory = "random";
let lastRoast = "";

// Load saved roast count from localStorage or start at 0
let roastCount = parseInt(localStorage.getItem('roastCount')) || 0;

// Elements
const friendNameInput = document.getElementById("friendName");
const roastBtn = document.getElementById("roastBtn");
const roastText = document.getElementById("roastText");
const roastCounter = document.getElementById("roastCounter");

// Initialize counter display
roastCounter.textContent = roastCount;
const roastCountDisplay = document.getElementById("roastCount");
const shareBtn = document.getElementById("shareBtn");
const categoryButtons = document.querySelectorAll(".category-btn");

// Event Listeners
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
  });
});

roastBtn.addEventListener("click", generateRoast);

shareBtn.addEventListener("click", shareRoast);

friendNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    generateRoast();
  }
});

// Functions
function generateRoast() {
  const friendName = friendNameInput.value.trim() || "Friend";

  let roast;
  if (selectedCategory === "random") {
    roast = getRandomRoastFromAll();
  } else {
    roast = getRandomRoastFromCategory(selectedCategory);
  }

  // Ensure we don't repeat the same roast twice in a row
  while (roast === lastRoast && getRoastPoolSize() > 1) {
    if (selectedCategory === "random") {
      roast = getRandomRoastFromAll();
    } else {
      roast = getRandomRoastFromCategory(selectedCategory);
    }
  }

  lastRoast = roast;

  // Personalize the roast
  const personalizedRoast = `Hey ${friendName}! ${roast}`;

  // Display with animation
  roastText.style.opacity = "0";
  setTimeout(() => {
    roastText.textContent = personalizedRoast;
    roastText.style.opacity = "1";
    roastText.style.transition = "opacity 0.5s";
  }, 200);

  // Update count and save to localStorage
  roastCount++;
  localStorage.setItem('roastCount', roastCount);
  roastCounter.textContent = roastCount;

  // Show share button
  shareBtn.style.display = "block";
}

function getRandomRoastFromCategory(category) {
  const categoryRoasts = roasts[category];
  return categoryRoasts[
    Math.floor(Math.random() * categoryRoasts.length)
  ];
}

function getRandomRoastFromAll() {
  const allRoasts = Object.values(roasts).flat();
  return allRoasts[Math.floor(Math.random() * allRoasts.length)];
}

function getRoastPoolSize() {
  if (selectedCategory === "random") {
    return Object.values(roasts).flat().length;
  }
  return roasts[selectedCategory].length;
}

function shareRoast() {
  const text = roastText.textContent;

  if (navigator.share) {
    navigator
      .share({
        title: "Friend Roast Generator",
        text: text,
      })
      .catch((err) => console.log("Error sharing:", err));
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      const originalText = shareBtn.textContent;
      shareBtn.textContent = "Copied! ✓";
      setTimeout(() => {
        shareBtn.textContent = originalText;
      }, 2000);
    });
  }
}

// Initialize with random category selected
document
  .querySelector('.category-btn[data-category="random"]')
  .classList.add("active");
