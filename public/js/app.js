document.addEventListener('DOMContentLoaded', () => {
  const snakeForm = document.getElementById('snakeForm');
  const nameInput = document.getElementById('snakeName');
  const colorInput = document.getElementById('snakeColor');
  const namePreview = document.getElementById('snakeNamePreview');
  const colorPreview = document.getElementById('snakeColorPreview');

  // Live preview as the user types
  snakeForm.addEventListener('input', () => {
    namePreview.textContent = nameInput.value || 'Sneky';
    colorPreview.style.backgroundColor = colorInput.value || '#10B981';
  });

  // Submit settings to backend
  snakeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const color = colorInput.value;

    try {
      const res = await fetch('/api/snake/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });

      if (res.ok) {
        alert('Settings saved! ✅');
      } else {
        alert('⚠️ Error saving settings.');
      }
    } catch (err) {
      console.error(err);
      alert('🚫 Could not connect to backend.');
    }
  });
});
