<template>
  <div class="contact-page">
    <div class="contact-container" data-aos="fade-up">
      <div class="contact-info">
        <h1 class="title">
          Let's build <span class="gradient-text">the future.</span>
        </h1>
        <p class="desc">
          Have a project in mind or just want to say hi? My inbox is always
          open.
        </p>

        <div class="info-items">
          <div class="info-item">
            <span class="label">Email</span>
            <a href="mailto:hanzputra06@gmail.com" class="value"
              >hanzputra06@gmail.com</a
            >
          </div>
          <div class="info-item">
            <span class="label">Social</span>
            <div class="socials">
              <a href="https://www.instagram.com/hanzzpm/" class="social-link"
                >Instagram</a
              >
              <a href="https://wa.me/62895605888564" class="social-link"
                >WhatsApp</a
              >
            </div>
          </div>
        </div>
      </div>

      <div class="contact-form-wrapper">
        <form
          v-if="!submitted"
          @submit.prevent="handleSubmit"
          class="contact-form"
        >
          <div class="form-group magnetic-input">
            <label>Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
          <div class="form-group magnetic-input">
            <label>Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div class="form-group magnetic-input">
            <label>Message</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="How can I help you?"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="submit-btn"
            :disabled="isSending"
            @mousemove="onBtnHover"
          >
            <span class="btn-content">{{
              isSending ? "Sending..." : "Send Message"
            }}</span>
            <div class="btn-glow"></div>
          </button>
        </form>

        <div v-else class="success-message glass-card" data-aos="zoom-in">
          <div class="success-icon">✓</div>
          <h3>Message Sent!</h3>
          <p>
            Thank you! Your message has been sent successfully. I'll get back to
            you at hanzputra06@gmail.com shortly.
          </p>
          <button @click="submitted = false" class="back-btn">
            Send Another
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitted = ref(false);

const isSending = ref(false);

const handleSubmit = async () => {
  isSending.value = true;

  try {
    const response = await fetch("https://formspree.io/f/xlgwrooo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (response.ok) {
      submitted.value = true;
      form.value = { name: "", email: "", message: "" };
    } else {
      const data = await response.json();
      alert(
        data.errors?.[0]?.message ||
          "Oops! There was a problem submitting your form",
      );
    }
  } catch (error) {
    alert("Oops! There was a problem submitting your form");
  } finally {
    isSending.value = false;
  }
};

const onBtnHover = (e) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(btn, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out",
  });

  const glow = btn.querySelector(".btn-glow");
  gsap.to(glow, {
    x: x * 2,
    y: y * 2,
    opacity: 1,
    duration: 0.3,
  });
};

onMounted(() => {
  // Magnetic inputs logic
  const inputs = document.querySelectorAll(".magnetic-input");
  inputs.forEach((input) => {
    input.addEventListener("mousemove", (e) => {
      const rect = input.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(input, { x: x * 0.1, y: y * 0.1, duration: 0.4 });
    });
    input.addEventListener("mouseleave", () => {
      gsap.to(input, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
    });
  });

  // Reset button
  const btn = document.querySelector(".submit-btn");
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    gsap.to(btn.querySelector(".btn-glow"), { opacity: 0, duration: 0.3 });
  });
});
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  padding: 120px 5% 80px;
  background: #030303;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  max-width: 1200px;
  width: 100%;
}

.title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.desc {
  font-size: 1.1rem;
  opacity: 0.6;
  max-width: 400px;
  margin-bottom: 4rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  opacity: 0.4;
  margin-bottom: 0.5rem;
}

.value {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}

.value:hover {
  color: var(--accent-secondary);
  border-bottom-color: var(--accent-secondary);
}

.socials {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  color: white;
  text-decoration: none;
  opacity: 0.6;
  transition: 0.3s;
  font-size: 1.1rem;
}

.social-link:hover {
  opacity: 1;
  padding-left: 10px;
  color: var(--accent-color);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 3rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  opacity: 0.8;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-secondary);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
}

.submit-btn {
  position: relative;
  padding: 1.2rem;
  background: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  overflow: hidden;
  margin-top: 1rem;
}

.btn-content {
  position: relative;
  z-index: 2;
  color: black;
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle,
    var(--accent-secondary) 0%,
    transparent 70%
  );
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* Success Message Styles */
.success-message {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 30px;
  border: 1px solid var(--accent-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: var(--accent-secondary);
  color: black;
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
}

.success-message h3 {
  font-size: 2rem;
  color: white;
}

.success-message p {
  opacity: 0.7;
  max-width: 300px;
  line-height: 1.6;
}

.back-btn {
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: white;
}

@media (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .contact-form {
    padding: 2rem;
  }
}
</style>
