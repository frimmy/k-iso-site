fetch('content.json')
  .then((response) => response.json())
  .then((content) => {
    document.title = content.title;

    document.querySelectorAll('[data-content]').forEach((el) => {
      const value = content[el.dataset.content];
      if (value === undefined) return;

      if (Array.isArray(value)) {
        el.replaceChildren(...value.map(({ label, url }) => {
          const link = document.createElement('a');
          link.href = url;
          link.textContent = label;
          return link;
        }));
      } else {
        el.textContent = value;
      }
    });
  })
  .catch(() => {});
