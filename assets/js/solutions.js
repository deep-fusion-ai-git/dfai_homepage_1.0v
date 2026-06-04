/**
 * Solutions Page Interactive Interactions
 */
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll offset adjustment for header size
  const scrollOffset = 90; // header height buffer

  const handleAnchorClick = (e) => {
    const targetId = e.currentTarget.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();
    
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  // Bind click event to solutions navigation cards and menu anchors
  const solutionNavCards = document.querySelectorAll(".solution-card-nav, .nav-link");
  solutionNavCards.forEach(card => {
    card.addEventListener("click", handleAnchorClick);
  });
});
