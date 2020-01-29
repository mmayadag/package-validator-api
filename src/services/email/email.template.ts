type DataType = "npm" | "composer";

/*
const createStructure = (data: any, type: DataType) => {
  const tables = [];

  Object.keys(data).forEach(key => {
    const part = data[key];
    let head = [];
    const body = [];
    const keys = part && Object.keys(part);
    const section = part[keys[0]];
    if (keys && section) {
      head = ['name', ...Object.keys(section)];
      keys.forEach(k => {
        const v = part[k];
        const tr = [k];

        // filter results
        if (type == 'npm') {
          console.log({
            wanted: v.wanted,
            latest: v.latest,
            status: v.wanted != v.latest
          });
          if (v.wanted != v.latest) {
            Object.keys(v).forEach(i => tr.push(v[i]));
            body.push(tr);
          }
        } else {
          Object.keys(v).forEach(i => tr.push(v[i]));
          body.push(tr);
        }
      });
    }
    console.log({ name: key, head, body });

    if (body.length > 0) {
      tables.push({ name: key, head, body });
    }
  });
  return tables;
};
*/
const createHtml = structure => structure
  .map(section => {
    const caption = `<caption>${section.name}</caption>`;
    const thead = `<thead><tr>${section.head
      .map(h => `<th>${h}</th>`)
      .join('')}</tr></thead>`;
    const tbody = `<tbody>${section.body
      .map(tr => `<tr>${tr.map(h => `<th>${h}</th>`).join('')}</tr>`)
      .join('')}</tbody>`;
    return `<table>${caption}${thead}${tbody}</table>`;
  })
  .join('\n');

const createText = structure => structure
  .map(section => {
    const caption = section.name;
    const thead = section.head.join(',');
    const tbody = section.body.map(tr => `${tr.join(',')}`).join('\n');
    return `${caption}\n${thead}\n${tbody}`;
  })
  .join('\n');
/*
const createMailTable = (obj, type) => {
  const structure = createStructure(obj, type);
  console.log({ obj });
  console.log({ structure, body: structure.body });
  return { html: createHtml(structure), text: createText(structure) };
};
*/
const createListStructure = (data: any, type: DataType) => {
  const tables = [];

  Object.keys(data).forEach(key => {
    const head = ['name', 'version'];
    const body = [];
    const part = data[key];
    const keys = part && Object.keys(part);
    keys.forEach(name => {
      const version = part[name];
      body.push([name, version]);
    });
    tables.push({ name: key, head, body });
  });

  return tables;
};
const createMail = (obj, type) => {
  const structure = createListStructure(obj, type);
  return { html: createHtml(structure), text: createText(structure) };
};
export { createMail };
