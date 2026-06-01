// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });

  // Dark Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-icon');

    // Sync toggle icon on load based on active theme
    const activeTheme = htmlEl.getAttribute('data-bs-theme');
    if (activeTheme === 'dark' && icon) {
      icon.classList.replace('fa-moon', 'fa-sun');
      icon.classList.replace('text-muted', 'text-warning');
    }

    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-bs-theme');
      if (currentTheme === 'dark') {
        htmlEl.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (icon) {
          icon.classList.replace('fa-sun', 'fa-moon');
          icon.classList.replace('text-warning', 'text-muted');
        }
      } else {
        htmlEl.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (icon) {
          icon.classList.replace('fa-moon', 'fa-sun');
          icon.classList.replace('text-muted', 'text-warning');
        }
      }
    });
  }
})();
