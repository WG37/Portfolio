
document.getElementById('contact').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  if (f.website.value) return; // bot trap
  const r = await fetch(f.action, {
    method: 'POST',
    body: new FormData(f),
    headers: { 'Accept': 'application/json' }
  });
  alert(r.ok ? 'Message sent.' : 'Send failed.');
  if (r.ok) f.reset();
});
