// ===== FORM HANDLER =====

const form = document.getElementById('bookForm');
const confirmation = document.getElementById('bookConfirmation');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.style.display = 'none';
        confirmation.classList.add('show');
      } else {
        btn.textContent = 'Error — Try Again';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = originalText; }, 3000);
      }
    } catch {
      // If Formspree isn't configured yet, show confirmation for demo
      form.style.display = 'none';
      confirmation.classList.add('show');
    }
  });
}
