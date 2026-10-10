/**
 * Tree ID — renders the site from TREEID_DATA (data.js) and TREEID_CONTENT (content.js).
 * English by default; 中文 is kept for the current tab only (sessionStorage).
 */
(function () {
  'use strict';
  const D = window.TREEID_DATA, C = window.TREEID_CONTENT;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const bi = (en, zh) => (zh ? `<span class="en">${esc(en)}</span><span class="zh">${esc(zh)}</span>` : esc(en));
  const zhOf = s => C.zh[s] || '';
  const PARTS = C.parts;
  const partLabel = id => PARTS.find(p => p.id === id);
  const treeById = Object.fromEntries(D.common.map(t => [t.id, t]));
  const SP = D.scioly.species;
  const spByN = Object.fromEntries(SP.map(s => [s.n, s]));

  // ---------------------------------------------------------------- language
  const LANG_KEY = 'treeid_lang';
  let lang = 'en';
  try { lang = sessionStorage.getItem(LANG_KEY) || 'en'; } catch (e) { /* storage unavailable */ }
  function applyLang(l) {
    lang = l;
    document.documentElement.dataset.lang = l;
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    document.title = l === 'zh' ? '树木识别 — 常见树木图鉴与 Science Olympiad 树种' : 'Tree ID — A Photo Guide to Identifying Trees';
    $('#lang-toggle .lbl').textContent = l === 'zh' ? 'EN' : 'ZH';
    $('#lang-toggle').title = l === 'zh' ? 'Switch to English' : 'Switch to Chinese';
    document.querySelectorAll('[data-ph-en]').forEach(el => { el.placeholder = el.dataset[l === 'zh' ? 'phZh' : 'phEn']; });
  }

  // ---------------------------------------------------------------- lightbox
  const sets = new Map();
  let setSeq = 0;
  const makeSet = items => { const id = 's' + (++setSeq); sets.set(id, items); return id; };
  const lb = { el: null, items: [], i: 0 };
  function imgButton(setId, i, img, alt) {
    return `<button type="button" data-set="${setId}" data-i="${i}" aria-label="${esc(alt)}"><img src="${img.src}" width="${img.w}" height="${img.h}" loading="lazy" decoding="async" alt="${esc(alt)}"></button>`;
  }
  function showLb() {
    const it = lb.items[lb.i];
    const img = lb.el.querySelector('img');
    // Many source photos are small: enlarge up to 3× while fitting the screen.
    const k = Math.min(3, (window.innerWidth * 0.9) / it.w, (window.innerHeight * 0.72) / it.h);
    img.style.width = Math.round(it.w * k) + 'px';
    img.style.height = Math.round(it.h * k) + 'px';
    img.src = it.src;
    img.alt = it.alt || '';
    lb.el.querySelector('.cap').innerHTML = `${it.title || ''}${it.credit ? `<small>${esc(it.credit)}</small>` : ''}<small>${lb.i + 1} / ${lb.items.length}</small>`;
  }
  function openLb(items, i) { lb.items = items; lb.i = i; showLb(); lb.el.classList.add('open'); }
  function stepLb(d) { lb.i = (lb.i + d + lb.items.length) % lb.items.length; showLb(); }

  // ---------------------------------------------------------------- hero
  function renderHero() {
    const picks = [['jacaranda', 'whole'], ['ginkgo', 'leaf'], ['magnolia', 'flower'], ['sweetgum', 'fruit'], ['birch', 'bark'],
      ['redwood', 'whole'], ['maple', 'leaf'], ['pine', 'fruit']];
    const items = picks.map(([id, part]) => {
      const t = treeById[id], img = t.photos[part][0], p = partLabel(part);
      return { ...img, title: `${bi(t.en, t.zh)} · ${bi(p.en, p.zh)}`, alt: `${t.en} — ${p.en}`, t, p };
    });
    const set = makeSet(items);
    $('#mosaic').innerHTML = items.map((it, i) =>
      `<button type="button" data-set="${set}" data-i="${i}" aria-label="${esc(it.alt)}"><img src="${it.src}" alt="${esc(it.alt)}" loading="eager"><span class="cap">${bi(it.t.en, it.t.zh)}</span></button>`).join('');
    const atlasPhotos = D.common.reduce((a, t) => a + PARTS.reduce((b, p) => b + t.photos[p.id].length, 0), 0);
    const spPhotos = SP.reduce((a, s) => a + s.photos.length + (s.gallery || []).length, 0) + D.scioly.national.reduce((a, s) => a + s.photos.length, 0);
    const stats = [
      [D.common.length, 'common trees', '种常见树'],
      [atlasPhotos, 'atlas photos', '张图鉴照片'],
      [SP.length, 'Science Olympiad species', '个 Science Olympiad 树种'],
      [D.scioly.national.length, 'national-list species', '个全国赛树种'],
    ];
    $('#stats').innerHTML = stats.map(([n, en, zh]) => `<div class="stat"><b>${n}</b><span>${bi(en, zh)}</span></div>`).join('');
    const comparePhotos = D.scioly.comparisons.reduce((a, c) => a + c.images.length, 0);
    $('#photo-total').textContent = atlasPhotos + spPhotos + comparePhotos + D.figures.length;
  }

  // ---------------------------------------------------------------- atlas
  const atlas = { part: 'all', q: '' };
  const norm = s => String(s || '').toLowerCase();
  function treeMatches(t, q) {
    if (!q) return true;
    return [t.en, t.zh, t.note && t.note.en, t.note && t.note.zh].some(v => norm(v).includes(q));
  }
  function renderAtlas() {
    const q = norm(atlas.q.trim());
    const trees = D.common.filter(t => treeMatches(t, q));
    $('#atlas-count').innerHTML = bi(`${trees.length} of ${D.common.length} trees`, `显示 ${trees.length} / ${D.common.length} 种树`);
    document.querySelectorAll('#atlas-parts button').forEach(b => b.classList.toggle('on', b.dataset.part === atlas.part));
    const out = $('#atlas');
    if (!trees.length) { out.innerHTML = `<p class="count">${bi('No tree matches your search.', '没有找到匹配的树。')}</p>`; return; }
    if (atlas.part === 'all') {
      let html = `<div class="atlas-head"><div>${bi('Tree', '树种')}</div>${PARTS.map(p => `<div>${bi(p.en, p.zh)}</div>`).join('')}</div>`;
      for (const t of trees) {
        const items = [];
        PARTS.forEach(p => t.photos[p.id].forEach(img => items.push({ ...img, part: p })));
        const set = makeSet(items.map(it => ({ ...it, title: `${bi(t.en, t.zh)} · ${bi(it.part.en, it.part.zh)}`, alt: `${t.en} — ${it.part.en}` })));
        const cells = PARTS.map(p => {
          const list = t.photos[p.id];
          if (!list.length) return `<div class="cell empty">${bi('—', '—')}</div>`;
          const idx = items.findIndex(it => it.part.id === p.id);
          return `<div class="cell${p.id === 'cartoon' ? ' contain' : ''}">${imgButton(set, idx, list[0], `${t.en} — ${p.en}`)}<span class="part-tag">${bi(p.en, p.zh)}</span>${list.length > 1 ? `<span class="more">+${list.length - 1}</span>` : ''}</div>`;
        }).join('');
        html += `<div class="atlas-row" id="tree-${t.id}"><div class="tree-name"><span class="n-en">${esc(t.en)}</span><span class="n-zh zh">${esc(t.zh)}</span>${t.note ? `<span class="note">${bi(t.note.en, t.note.zh)}</span>` : ''}${crossLinks(t.id)}</div>${cells}</div>`;
      }
      out.innerHTML = html;
    } else {
      const p = partLabel(atlas.part);
      const withPart = trees.filter(t => t.photos[p.id].length);
      const set = makeSet(withPart.map(t => ({ ...t.photos[p.id][0], title: `${bi(t.en, t.zh)} · ${bi(p.en, p.zh)}`, alt: `${t.en} — ${p.en}` })));
      out.innerHTML = `<div class="atlas-grid">${withPart.map((t, i) =>
        `<div class="part-card"><div class="cell${p.id === 'cartoon' ? ' contain' : ''}">${imgButton(set, i, t.photos[p.id][0], `${t.en} — ${p.en}`)}</div><div class="lbl">${esc(t.en)} <span class="zh zh-name">${esc(t.zh)}</span></div></div>`).join('')}</div>`;
    }
  }
  function crossLinks(treeId) {
    const links = [];
    const visit = g => {
      if (g.atlas === treeId) links.push(`<a class="mini-link" href="#conifers">${bi('Conifer family tree', '针叶树分类')}</a>`);
    };
    C.conifers.families.forEach(f => { visit(f); (f.genera || []).forEach(visit); });
    if (C.madcap.some(m => m.atlas === treeId)) links.push(`<a class="mini-link" href="#tips">MADCap Horse</a>`);
    return links.length ? `<span class="links">${[...new Set(links)].join('')}</span>` : '';
  }
  function renderAz() {
    const letters = [...new Set(D.common.map(t => t.en[0].toUpperCase()))].sort();
    $('#az').innerHTML = letters.map(L => `<a href="#" data-letter="${L}">${L}</a>`).join('');
  }
  function goToTree(id) {
    atlas.part = 'all'; atlas.q = ''; $('#atlas-search').value = '';
    renderAtlas();
    const el = document.getElementById('tree-' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------------------------------------------------------------- Science Olympiad species
  const forest = { filters: {}, q: '' };
  const keyGroupsOf = n => {
    const out = [];
    D.scioly.keys.forEach(k => k.groups.forEach(g => { if (g.items.some(it => it.n === n)) out.push(g.title); }));
    return [...new Set(out)];
  };
  function renderKeys() {
    $('#keys').innerHTML = D.scioly.keys.map((k, ki) => `<div class="key-box"><h4>${bi(k.title, zhOf(k.title))}</h4><div class="key-chips">${k.groups.map((g, gi) =>
      `<button type="button" class="key-chip" data-k="${ki}" data-g="${gi}">${bi(g.title, zhOf(g.title))} <span>${g.items.length}</span></button>`).join('')}</div></div>`).join('');
  }
  function spMatches(s, q) {
    if (!q) return true;
    return [s.name, s.sci, s.zh, s.other, s.appearance].some(v => norm(v).includes(q));
  }
  function fieldsHtml(s) {
    let h = '';
    if (s.appearance) h += `<div class="field"><b>${bi('Appearance', '外观')}:</b> ${esc(s.appearance)}</div>`;
    if (s.location) h += `<div class="field"><b>${bi('Location', '分布')}:</b> ${esc(s.location)}</div>`;
    if (s.uses) h += `<div class="field"><b>${bi('Uses', '用途')}:</b> ${esc(s.uses)}</div>`;
    if (s.usesList) h += `<div class="field"><b>${bi('Uses', '用途')}:</b><ul>${s.usesList.map(u => `<li>${esc(u)}</li>`).join('')}</ul></div>`;
    if (s.note) h += `<div class="field"><b>${bi('Note', '备注')}:</b> ${s.noteLink ? esc(s.note).replace(esc(s.noteLink.text), `<a href="${esc(s.noteLink.url)}" target="_blank" rel="noopener noreferrer">${esc(s.noteLink.text)}</a>`) : esc(s.note)}</div>`;
    return h;
  }
  const YT = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg>';
  function spCard(s, opts = {}) {
    const imgs = [...s.photos, ...(s.gallery || [])];
    const set = makeSet(imgs.map(im => ({ ...im, title: `${esc(s.name)} <i>(${esc(s.sci)})</i>${s.zh ? ` <span class="zh">${esc(s.zh)}</span>` : ''}`, alt: s.name })));
    const tags = opts.tags ? keyGroupsOf(s.n).map(t => `<span class="tag">${bi(t, zhOf(t))}</span>`).join('') : '';
    return `<article class="sp-card" ${s.n ? `id="sp-${s.n}"` : ''}>
      <div class="sp-head">${s.n ? `<div class="sp-num">${s.n}</div>` : ''}<div class="sp-title"><h3>${esc(s.name)}<span class="zh zh-name">${esc(s.zh)}</span></h3><div class="sci">${esc(s.sci)}</div>${s.other ? `<div class="other">${bi('Also called', '别名')}: ${esc(s.other)}</div>` : ''}</div></div>
      ${imgs.length ? `<div class="strip">${imgs.map((im, i) => imgButton(set, i, im, s.name)).join('')}</div>` : ''}
      <div class="sp-body">${fieldsHtml(s)}${tags ? `<div class="tags">${tags}</div>` : ''}${s.video ? `<a class="video" href="${esc(s.video.url)}" target="_blank" rel="noopener noreferrer">${YT}${esc(s.video.title)}</a>` : ''}</div>
    </article>`;
  }
  function compareCard(c) {
    const set = makeSet(c.images.map(im => ({ ...im, title: bi(c.title, zhOf(c.title)), alt: c.title })));
    return `<div class="compare"><h4>${bi('Look-alikes', '易混树种')} · ${bi(c.title, zhOf(c.title))}</h4><div class="figs">${c.images.map((im, i) => imgButton(set, i, im, c.title)).join('')}</div>${c.link ? `<p style="margin:10px 0 0"><a href="${esc(c.link.url)}" target="_blank" rel="noopener noreferrer">${esc(c.link.text)}</a></p>` : ''}</div>`;
  }
  function renderForest() {
    const q = norm(forest.q.trim());
    const active = Object.entries(forest.filters);
    const visible = SP.filter(s => spMatches(s, q) && active.every(([k, g]) => D.scioly.keys[k].groups[g].items.some(it => it.n === s.n)));
    const filtering = q || active.length;
    let html = '';
    for (const s of visible) {
      html += spCard(s, { tags: true });
      if (!filtering) D.scioly.comparisons.filter(c => c.after === s.n).forEach(c => { html += compareCard(c); });
    }
    $('#species').innerHTML = html || `<p class="count">${bi('No species matches these filters.', '没有符合筛选条件的树种。')}</p>`;
    document.querySelectorAll('.key-chip').forEach(b => b.classList.toggle('on', forest.filters[b.dataset.k] === +b.dataset.g));
    $('#forest-count').innerHTML = bi(`${visible.length} of ${SP.length} species`, `显示 ${visible.length} / ${SP.length} 个树种`);
    $('#forest-clear').classList.toggle('hidden', !filtering);
  }
  function renderNational() {
    $('#national').innerHTML = D.scioly.national.map(s => spCard(s)).join('');
  }

  // ---------------------------------------------------------------- conifers, figures, tips, links
  function thumbFor(id, part = 'whole') {
    const t = treeById[id];
    return t && t.photos[part][0] ? t.photos[part][0].src : null;
  }
  function renderConifers() {
    const P = C.conifers;
    $('#tax-path').innerHTML = P.path.map((n, i) => `${i ? '<span class="tax-arrow">→</span>' : ''}<span class="tax-node"><i>${esc(n.en)}</i> <span class="zh">${esc(n.zh)}</span></span>`).join('');
    const links = g => [
      g.atlas ? `<a class="mini-link" href="#tree-${g.atlas}" data-tree="${g.atlas}">${bi('Photos', '照片')}</a>` : '',
      g.sp ? `<a class="mini-link" href="#sp-${g.sp}" data-sp="${g.sp}">SciOly #${g.sp}</a>` : '',
    ].join(' ');
    const spList = list => list ? `<ul>${list.map(s => `<li>${esc(s.en)}${s.zh ? ` <span class="zh">${esc(s.zh)}</span>` : ''} ${s.sp ? `<a class="mini-link" href="#sp-${s.sp}" data-sp="${s.sp}">#${s.sp}</a>` : ''}</li>`).join('')}</ul>` : '';
    const genus = g => `<div class="genus"><div class="g-name"><i>${esc(g.en)}</i> <span class="zh">${esc(g.zh)}</span> ${links(g)}</div>${(g.groups || []).map(gr => `<div class="sub">${bi(gr.en, gr.zh + '：' + gr.en)}</div>${spList(gr.species)}`).join('')}${spList(g.species)}</div>`;
    $('#families').innerHTML = P.families.map(f => {
      const thumbId = f.atlas || (f.genera || []).map(g => g.atlas).find(Boolean);
      const src = thumbId && thumbFor(thumbId);
      return `<div class="family"><h4>${src ? `<img src="${src}" alt="" loading="lazy">` : ''}<span><i>${esc(f.en)}</i> <span class="zh">${esc(f.zh)}</span></span></h4>${(f.genera || []).map(genus).join('')}${f.genera ? '' : `<div class="genus">${links(f)}${spList(f.species)}</div>`}</div>`;
    }).join('');
  }
  function renderFigures() {
    const set = makeSet(D.figures.map(f => ({ ...f, title: bi(f.en, f.zh), alt: f.en })));
    $('#figures').innerHTML = D.figures.map((f, i) => `<div class="fig">${imgButton(set, i, f, f.en)}<div class="lbl">${bi(f.en, f.zh)}</div></div>`).join('');
  }
  function renderTips() {
    $('#madcap').innerHTML = C.madcap.map(m => {
      const src = m.atlas && thumbFor(m.atlas, 'leaf');
      const inner = `<div class="letter">${esc(m.letter)}</div>${src ? `<img src="${src}" alt="" loading="lazy">` : ''}<div class="t">${bi(m.en, m.zh)}</div>`;
      return m.atlas ? `<a class="mc" href="#tree-${m.atlas}" data-tree="${m.atlas}" style="text-decoration:none;color:inherit">${inner}</a>` : `<div class="mc">${inner}</div>`;
    }).join('');
  }
  function renderLinks() {
    const card = (k, title, url, d) => `<a class="link-card" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span class="k">${k}</span><strong>${esc(title)}</strong><span class="d">${d}</span></a>`;
    $('#maps').innerHTML = C.maps.map(m => card(bi(m.city, m.cityZh), m.title, m.url, bi(m.en, m.zh))).join('');
    $('#tools').innerHTML = C.tools.map(t => card(bi('Tool', '工具'), t.name, t.url, bi(t.en, t.zh))).join('');
    $('#webpages').innerHTML = C.webpages.map(w => card(bi('Webpage', '网页'), w.name, w.url, bi(w.en, w.zh))).join('');
  }

  // ---------------------------------------------------------------- events
  function bind() {
    $('#lang-toggle').addEventListener('click', () => {
      applyLang(lang === 'zh' ? 'en' : 'zh');
      try { sessionStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
    });
    $('#atlas-search').addEventListener('input', e => { atlas.q = e.target.value; renderAtlas(); });
    $('#atlas-parts').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; atlas.part = b.dataset.part; renderAtlas(); });
    $('#az').addEventListener('click', e => {
      const a = e.target.closest('a[data-letter]'); if (!a) return; e.preventDefault();
      if (atlas.part !== 'all' || atlas.q) { atlas.part = 'all'; atlas.q = ''; $('#atlas-search').value = ''; renderAtlas(); }
      const t = D.common.find(x => x.en[0].toUpperCase() === a.dataset.letter);
      const el = t && document.getElementById('tree-' + t.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('#forest-search').addEventListener('input', e => { forest.q = e.target.value; renderForest(); });
    $('#keys').addEventListener('click', e => {
      const b = e.target.closest('.key-chip'); if (!b) return;
      const k = b.dataset.k, g = +b.dataset.g;
      if (forest.filters[k] === g) delete forest.filters[k]; else forest.filters[k] = g;
      renderForest();
    });
    $('#forest-clear').addEventListener('click', () => { forest.filters = {}; forest.q = ''; $('#forest-search').value = ''; renderForest(); });
    document.addEventListener('click', e => {
      const img = e.target.closest('[data-set]');
      if (img) { openLb(sets.get(img.dataset.set), +img.dataset.i); return; }
      const tr = e.target.closest('a[data-tree]');
      if (tr) { e.preventDefault(); goToTree(tr.dataset.tree); return; }
      const sp = e.target.closest('a[data-sp]');
      if (sp) {
        e.preventDefault();
        if (Object.keys(forest.filters).length || forest.q) { forest.filters = {}; forest.q = ''; $('#forest-search').value = ''; renderForest(); }
        const el = document.getElementById('sp-' + sp.dataset.sp);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    lb.el = $('#lightbox');
    lb.el.addEventListener('click', e => {
      if (e.target.closest('.prev')) stepLb(-1);
      else if (e.target.closest('.next')) stepLb(1);
      else if (e.target.closest('.x') || e.target === lb.el) lb.el.classList.remove('open');
    });
    document.addEventListener('keydown', e => {
      if (!lb.el.classList.contains('open')) return;
      if (e.key === 'Escape') lb.el.classList.remove('open');
      if (e.key === 'ArrowLeft') stepLb(-1);
      if (e.key === 'ArrowRight') stepLb(1);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#atlas-parts').innerHTML = [{ id: 'all', en: 'All parts', zh: '全部' }, ...PARTS].map(p => `<button type="button" data-part="${p.id}">${bi(p.en, p.zh)}</button>`).join('');
    renderHero(); renderAz(); renderAtlas();
    renderKeys(); renderForest(); renderNational();
    renderConifers(); renderFigures(); renderTips(); renderLinks();
    bind();
    applyLang(lang);
  });
})();
