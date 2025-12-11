// form.js - display results on form-action, simple validation handler
document.addEventListener('DOMContentLoaded', () => {
    // If on form-action.html, read search params
    const resultEl = document.getElementById('result');
    if (resultEl) {
        const params = new URLSearchParams(location.search);
        const name = params.get('name') || '—';
        const email = params.get('email') || '—';
        const topic = params.get('topic') || '—';
        const message = params.get('message') || '—';
        resultEl.innerHTML = `
      <dl>
        <dt>Name</dt><dd>${escapeHtml(name)}</dd>
        <dt>Email</dt><dd>${escapeHtml(email)}</dd>
        <dt>Topic</dt><dd>${escapeHtml(topic)}</dd>
        <dt>Message</dt><dd>${escapeHtml(message)}</dd>
      </dl>
    `;
    }

    // Simple HTML escaping
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;"
        }[c]));
    }
});