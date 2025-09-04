// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Contact form --------- */
  const form = document.getElementById('contactForm');
  const responsePara = document.getElementById('response');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      responsePara.textContent = 'Please fill out all fields.';
      responsePara.style.color = 'crimson';
      return;
    }

    // Simulate submission (replace with real AJAX/Fetch call)
    console.table({ name, email, message });

    responsePara.textContent = `Thank you, ${name}. Your message has been received.`;
    responsePara.style.color = 'green';
    form.reset();
  });
  


});

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    links.classList.toggle("show");
  });
