fetch('content.json')
  .then((response) => response.json())
  .then((content) => {
    document.title = content.title;

    document.querySelectorAll('[data-content]').forEach((el) => {
      const value = content[el.dataset.content];
      if (value === undefined) return;

      if (Array.isArray(value)) {
        el.replaceChildren(...value.map((item) => {
          if (typeof item === 'string') {
            const paragraph = document.createElement('p');
            paragraph.textContent = item;
            return paragraph;
          }

          const link = document.createElement('a');
          link.href = item.url;
          link.textContent = item.label;
          return link;
        }));
      } else {
        el.textContent = value;
      }
    });

    document.dispatchEvent(new Event('content:ready'));
  });
