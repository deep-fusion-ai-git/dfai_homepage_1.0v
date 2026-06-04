/**
 * Contact Page Interactivity & Form Validation
 */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const inquiryTypeSelect = document.getElementById("inquiryType");
  const formAlert = document.getElementById("formAlert");
  const attachmentInput = document.getElementById("attachment");

  // 1. Sync Inquiry Categories clicks with dropdown & scroll
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const targetType = card.getAttribute("data-type");
      if (targetType) {
        inquiryTypeSelect.value = targetType;
      }
      
      const formElement = document.getElementById("form");
      if (formElement) {
        const offset = 90;
        const targetPos = formElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
      }
    });
  });

  // 2. File size checking (10MB limit)
  attachmentInput.addEventListener("change", () => {
    const file = attachmentInput.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      showAlert("파일 크기가 10MB를 초과합니다. 10MB 이하의 파일을 업로드해 주세요.", "warning");
      attachmentInput.value = ""; // clear file
    } else {
      hideAlert();
    }
  });

  // Helper show/hide alerts
  const showAlert = (message, type) => {
    formAlert.textContent = message;
    formAlert.className = `form-alert ${type}`;
    formAlert.style.display = "block";
  };

  const hideAlert = () => {
    formAlert.textContent = "";
    formAlert.style.display = "none";
  };

  // 3. Form Validation & Mailto Fallback
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inquiryType = inquiryTypeSelect.value;
    const name = document.getElementById("senderName").value.trim();
    const company = document.getElementById("company").value.trim();
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const consent = document.getElementById("privacyConsent").checked;

    // Validate empty fields
    if (!inquiryType || !name || !company || !jobTitle || !email || !message) {
      showAlert("필수 입력 값을 모두 입력해 주세요.", "warning");
      return;
    }

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showAlert("올바른 이메일 주소를 입력해 주세요.", "warning");
      return;
    }

    // Content length validation
    if (message.length < 20) {
      showAlert("문의 내용은 최소 20자 이상 작성해 주세요.", "warning");
      return;
    }

    // Checkbox consent
    if (!consent) {
      showAlert("개인정보 수집 및 이용에 동의해야 합니다.", "warning");
      return;
    }

    // Success - Open Mailto fallback
    showAlert("성공적으로 확인되었습니다. 메일 전송 창으로 이동합니다...", "success");

    const subject = encodeURIComponent(`[DFAI 문의] ${inquiryType.toUpperCase()} - ${company} ${name}`);
    const body = encodeURIComponent(
      `문의자 이름: ${name}\n` +
      `소속: ${company}\n` +
      `직책: ${jobTitle}\n` +
      `연락처: ${phone}\n` +
      `이메일: ${email}\n\n` +
      `문의 내용:\n${message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:contact@deep-fusion.com?subject=${subject}&body=${body}`;
    }, 1000);
  });

  // 4. FAQ Accordion Toggle
  const faqTriggers = document.querySelectorAll(".faq-trigger");
  faqTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parent = trigger.parentElement;
      const answer = parent.querySelector(".faq-answer");
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other items
      document.querySelectorAll(".faq-item").forEach(item => {
        if (item !== parent) {
          item.classList.remove("active");
          item.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
          item.querySelector(".faq-answer").setAttribute("hidden", "true");
        }
      });

      // Toggle current item
      if (isExpanded) {
        parent.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        answer.setAttribute("hidden", "true");
      } else {
        parent.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        answer.removeAttribute("hidden");
      }
    });
  });
});
