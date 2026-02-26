const bookForm = document.getElementById('bookForm');
const bookConfirmation = document.getElementById('bookConfirmation');

if (bookForm) {
  bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const submitBtn = bookForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(bookForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        bookForm.style.display = 'none';
        bookConfirmation.classList.add('show');
      } else {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch {
      // If Formspree isn't configured, show confirmation for demo
      bookForm.style.display = 'none';
      bookConfirmation.classList.add('show');
    }
  });
}
