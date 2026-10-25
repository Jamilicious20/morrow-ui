const root = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const themeLabel = document.querySelector('#themeLabel');
const toastRegion = document.querySelector('#toastRegion');
const profileForm = document.querySelector('#profileForm');
const formFeedback = document.querySelector('#formFeedback');
const detailDialog = document.querySelector('#detailDialog');
let toastTimer;

function showToast(message) {
  toastRegion.textContent = message;
  toastRegion.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastRegion.classList.remove('is-visible');
  }, 2800);
}

themeToggle.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(!isDark));
  themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
  showToast(`${isDark ? 'Light' : 'Dark'} theme selected.`);
});

document.querySelectorAll('[data-toast]').forEach(button => {
  button.addEventListener('click', () => showToast(button.dataset.toast));
});

document.querySelector('#toastTrigger').addEventListener('click', () => {
  showToast('Your little update has arrived.');
});

document.querySelector('#dismissAlert').addEventListener('click', () => {
  document.querySelector('#inlineAlert').hidden = true;
  showToast('Message dismissed.');
});

document.querySelector('#sampleAdd').addEventListener('click', event => {
  event.currentTarget.innerHTML = 'Added with care <span aria-hidden="true">✓</span>';
  event.currentTarget.disabled = true;
  showToast('The Everyday Vase is in your bag.');
});

profileForm.addEventListener('submit', event => {
  event.preventDefault();
  formFeedback.classList.remove('is-error');
  const name = profileForm.elements.fullName.value.trim();
  const email = profileForm.elements.email.value.trim();
  const emailInput = profileForm.elements.email;

  if (!name) {
    formFeedback.textContent = 'Add your name so we know who to write back to.';
    formFeedback.classList.add('is-error');
    profileForm.elements.fullName.focus();
    return;
  }
  if (!email || !emailInput.validity.valid) {
    formFeedback.textContent = 'Add a valid email address and we’ll be in touch.';
    formFeedback.classList.add('is-error');
    emailInput.focus();
    return;
  }

  formFeedback.textContent = `Thanks, ${name}. Your note is ready to go.`;
  showToast('Thanks for stopping by.');
  profileForm.reset();
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
const tabPanels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(tab, moveFocus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle('is-selected', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  tabPanels.forEach(panel => {
    panel.hidden = panel.id !== tab.getAttribute('aria-controls');
  });
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
});

document.querySelector('#openDialog').addEventListener('click', () => {
  detailDialog.showModal();
});

document.querySelector('#closeDialog').addEventListener('click', () => {
  detailDialog.close();
});

detailDialog.addEventListener('click', event => {
  if (event.target === detailDialog) detailDialog.close();
});

document.querySelectorAll('.side-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.side-link').forEach(item => item.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});
