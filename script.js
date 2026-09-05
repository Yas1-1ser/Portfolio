(function () {
  var DATA = window.PORTFOLIO_DATA;
  var ICONS = window.PORTFOLIO_ICONS || {};

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined && html !== null) node.innerHTML = html;
    return node;
  }

  function iconSpan(name, extraClass) {
    var span = el('span', 'icon ' + (extraClass || ''));
    span.innerHTML = ICONS[name] || '';
    return span;
  }

  function mount(id, node) {
    var target = document.getElementById(id);
    if (!target) return;
    target.appendChild(node);
  }

  function setHtml(id, html) {
    var target = document.getElementById(id);
    if (!target) return;
    target.innerHTML = html;
  }

  function renderBrand() {
    if (!DATA) return;
    setHtml('brand-mount',
      DATA.profile.firstName + '<span>' + DATA.profile.lastName + '</span>');
  }

  function renderNav() {
    var nav = document.getElementById('main-nav');
    if (!nav || !DATA) return;
    DATA.nav.forEach(function (item) {
      var a = el('a', item.cta ? 'nav-cta' : '', item.label);
      a.setAttribute('href', item.href);
      nav.appendChild(a);
    });
  }

  function renderHero() {
    if (!DATA) return;
    var p = DATA.profile;
    var wrap = el('div');

    var greeting = el('p', 'hero-greeting', p.greeting);
    var eyebrow = el('p', 'eyebrow', p.role);
    var h1 = el('h1', 'hero-name',
      '<span class="name-line1">' + p.firstName +
      '<span class="hero-underline">' + (ICONS['underline-swash'] || '') + '</span>' +
      '</span><br />' + p.lastName);
    var desc = el('p', 'hero-desc', p.heroDescriptionHtml);

    var actions = el('div', 'hero-actions');

    var viewBtn = el('a', 'btn btn-primary', 'View case studies');
    viewBtn.setAttribute('href', '#projects');
    viewBtn.setAttribute('id', 'hero-view-btn');

    actions.appendChild(viewBtn);

    var status = el('div', 'status-line');
    status.appendChild(el('span', 'dot'));
    status.appendChild(document.createTextNode(
      p.statusText + '\u00A0\u00B7\u00A0' + p.statusMeta));

    wrap.appendChild(greeting);
    wrap.appendChild(eyebrow);
    wrap.appendChild(h1);
    wrap.appendChild(desc);
    wrap.appendChild(actions);
    wrap.appendChild(status);

    mount('hero-copy-mount', wrap);
    setHtml('photo-caption-mount', p.photoCaption);
  }

  function renderSkills() {
    var grid = document.getElementById('skills-grid');
    if (!grid || !DATA) return;

    DATA.skillCategories.forEach(function (cat, i) {
      var card = el('article', 'card reveal' + (cat.span2 ? ' span-2' : ''));
      card.style.transitionDelay = (i * 0.06) + 's';

      var head = el('div', 'card-head');
      head.appendChild(iconSpan(cat.icon, 'card-icon'));
      var titleWrap = el('div');
      titleWrap.appendChild(el('h3', '', cat.title));
      titleWrap.appendChild(el('p', 'card-kicker', cat.kicker));
      head.appendChild(titleWrap);

      var list = el('ul', 'tag-list');
      cat.items.forEach(function (item) {
        list.appendChild(el('li', '', item));
      });

      card.appendChild(head);
      card.appendChild(list);
      grid.appendChild(card);
    });
  }

  function renderTools() {
    var grid = document.getElementById('tools-grid');
    if (!grid || !DATA) return;

    DATA.tools.forEach(function (tool, i) {
      var tile = el('div', 'tool-tile reveal');
      tile.style.transitionDelay = (i * 0.05) + 's';
      tile.appendChild(iconSpan(tool.icon, 'tool-icon'));
      var text = el('div', 'tool-text');
      text.appendChild(el('p', 'tool-name', tool.name));
      text.appendChild(el('p', 'tool-desc', tool.desc));
      tile.appendChild(text);
      grid.appendChild(tile);
    });
  }

  function renderLangIcons() {
    var grid = document.getElementById('lang-icons-grid');
    if (!grid || !DATA || !DATA.langIcons) return;

    DATA.langIcons.forEach(function (lang, i) {
      var tile = el('div', 'lang-tile reveal');
      tile.style.transitionDelay = (i * 0.04) + 's';

      var iconWrap = el('span', 'lang-icon');
      iconWrap.style.color = lang.color || 'var(--accent)';
      iconWrap.innerHTML = ICONS[lang.icon] || '';

      var nameEl = el('p', 'lang-name', lang.name);
      tile.appendChild(iconWrap);
      tile.appendChild(nameEl);
      grid.appendChild(tile);
    });
  }

  function renderProjects() {
    var list = document.getElementById('project-list');
    if (!list || !DATA) return;

    DATA.projects.forEach(function (proj) {
      var card = el('article', 'card project-card reveal');
      if (proj.accent) card.style.setProperty('--project-accent', proj.accent);

      var band = el('div', 'project-band');
      band.appendChild(el('span', 'project-index', proj.index || ''));
      var cornerBtn = el('a', 'project-corner-link');
      cornerBtn.setAttribute('href', proj.detailsHref);
      cornerBtn.setAttribute('target', '_blank');
      cornerBtn.setAttribute('rel', 'noopener noreferrer');
      cornerBtn.setAttribute('aria-label', 'Open project on GitHub');
      cornerBtn.appendChild(iconSpan('arrow-corner'));
      band.appendChild(cornerBtn);
      card.appendChild(band);

      var headRow = el('div', 'project-head');
      headRow.appendChild(el('h3', '', proj.title));
      headRow.appendChild(el('span', 'tag-badge', proj.badge));
      card.appendChild(headRow);

      card.appendChild(el('p', '', proj.descriptionHtml));

      var specGrid = el('div', 'spec-grid');
      proj.specs.forEach(function (spec) {
        var specEl = el('div', 'spec');
        specEl.appendChild(el('span', '', spec.label));
        specEl.appendChild(document.createTextNode(spec.value.replace(/&amp;/g, '&')));
        specGrid.appendChild(specEl);
      });
      card.appendChild(specGrid);

      var tagList = el('ul', 'tag-list');
      proj.tags.forEach(function (tag) {
        tagList.appendChild(el('li', '', tag));
      });
      card.appendChild(tagList);

      var links = el('div', 'project-links');
      var details = el('a', 'btn btn-outline btn-sm', 'View on GitHub');
      details.setAttribute('href', proj.detailsHref);
      details.setAttribute('target', '_blank');
      details.setAttribute('rel', 'noopener noreferrer');
      var source = el('a', 'link-muted', 'Source code \u2192');
      source.setAttribute('href', proj.sourceHref);
      source.setAttribute('target', '_blank');
      source.setAttribute('rel', 'noopener noreferrer');
      links.appendChild(details);
      links.appendChild(source);
      card.appendChild(links);

      list.appendChild(card);
    });
  }

  function renderCertifications() {
    var grid = document.getElementById('cert-grid');
    if (!grid || !DATA || !DATA.certifications) return;

    var ciscoIconSlot = document.getElementById('cisco-icon-slot');
    if (ciscoIconSlot) ciscoIconSlot.innerHTML = ICONS['cisco'] || '';

    var typeIcon = {
      badge: ICONS['cert-badge'] || ICONS['check'] || '',
      certificate: ICONS['cert-certificate'] || ICONS['cap'] || '',
      achievement: ICONS['cert-achievement'] || ICONS['trait-target'] || ''
    };
    var typeColor = {
      badge: '#c9a464',
      certificate: '#5ecf8a',
      achievement: '#5b8def'
    };
    var typeLabel = {
      badge: 'Badge',
      certificate: 'Certificate',
      achievement: 'Achievement'
    };

    DATA.certifications.forEach(function (cert, i) {
      var card = el('div', 'card cert-card reveal');
      card.style.transitionDelay = (i * 0.06) + 's';
      card.style.setProperty('--cert-color', typeColor[cert.type] || 'var(--accent)');

      var top = el('div', 'cert-top');
      var pill = el('span', 'cert-type-pill');
      pill.textContent = typeLabel[cert.type] || cert.type;
      pill.style.background = 'rgba(' + hexToRgb(typeColor[cert.type] || '#c9a464') + ',0.12)';
      pill.style.color = typeColor[cert.type] || 'var(--accent)';
      pill.style.borderColor = 'rgba(' + hexToRgb(typeColor[cert.type] || '#c9a464') + ',0.35)';

      var kindPill = el('span', 'cert-kind-pill', cert.kind);
      top.appendChild(pill);
      top.appendChild(kindPill);
      card.appendChild(top);

      var iconWrap = el('div', 'cert-icon-wrap');
      iconWrap.style.color = typeColor[cert.type] || 'var(--accent)';
      iconWrap.style.borderColor = 'rgba(' + hexToRgb(typeColor[cert.type] || '#c9a464') + ',0.3)';
      iconWrap.innerHTML = typeIcon[cert.type];
      card.appendChild(iconWrap);

      var titleEl = el('h3', 'cert-title', cert.title);
      card.appendChild(titleEl);

      var meta = el('div', 'cert-meta');
      meta.appendChild(iconSpan('cisco', 'cert-issuer-icon'));
      meta.appendChild(el('span', 'cert-issuer', cert.issuer));
      card.appendChild(meta);

      card.appendChild(el('p', 'cert-desc', cert.desc));

      var footer = el('div', 'cert-footer');
      var dateSpan = el('span', 'cert-date', '\uD83D\uDCC5 Issued: ' + cert.date);
      footer.appendChild(dateSpan);

      var verifyLinks = el('div', 'cert-verify-links');
      if (cert.profileHref) {
        var verifyBtn = el('a', 'cert-verify-btn');
        verifyBtn.setAttribute('href', cert.profileHref);
        verifyBtn.setAttribute('target', '_blank');
        verifyBtn.setAttribute('rel', 'noopener noreferrer');
        verifyBtn.setAttribute('title', 'View on Cisco Networking Academy');
        verifyBtn.innerHTML = 'Verify \u2197';
        verifyLinks.appendChild(verifyBtn);
      }
      if (cert.credlyHref) {
        var credlyBtn = el('a', 'cert-credly-btn');
        credlyBtn.setAttribute('href', cert.credlyHref);
        credlyBtn.setAttribute('target', '_blank');
        credlyBtn.setAttribute('rel', 'noopener noreferrer');
        credlyBtn.setAttribute('title', 'View badge on Credly');
        credlyBtn.innerHTML = 'Credly \u2197';
        verifyLinks.appendChild(credlyBtn);
      }
      footer.appendChild(verifyLinks);
      card.appendChild(footer);

      grid.appendChild(card);
    });
  }

  function hexToRgb(hex) {
    var r = parseInt(hex.slice(1,3),16);
    var g = parseInt(hex.slice(3,5),16);
    var b = parseInt(hex.slice(5,7),16);
    return r + ',' + g + ',' + b;
  }

  function renderSecurity() {
    var container = document.getElementById('security-checklist');
    if (!container || !DATA) return;

    DATA.security.checklist.forEach(function (item) {
      var row = el('div', 'check-row');
      row.appendChild(iconSpan('check', 'check-icon'));
      row.appendChild(el('span', '', item));
      container.appendChild(row);
    });

    setHtml('security-note-mount', '<p>' + DATA.security.noteHtml + '</p>');
  }

  function renderPhilosophy() {
    if (!DATA) return;
    var container = document.getElementById('philosophy-paragraphs');
    if (container) {
      DATA.philosophy.paragraphs.forEach(function (text) {
        container.appendChild(el('p', '', text));
      });
    }

    var edu = DATA.philosophy.education;
    var eduRow = document.getElementById('education-mount');
    if (eduRow) {
      eduRow.appendChild(iconSpan('cap', 'card-icon'));
      var eduText = el('div');
      eduText.appendChild(el('p', 'edu-title', edu.title));
      eduText.appendChild(el('p', 'edu-sub', edu.sub));
      eduRow.appendChild(eduText);
    }

    var traitList = document.getElementById('trait-list');
    if (traitList) {
      DATA.philosophy.traits.forEach(function (trait, i) {
        var card = el('div', 'card trait reveal');
        card.style.transitionDelay = (i * 0.06) + 's';
        card.appendChild(iconSpan(trait.icon, 'card-icon'));
        var text = el('div');
        text.appendChild(el('h4', '', trait.title));
        text.appendChild(el('p', '', trait.desc));
        card.appendChild(text);
        traitList.appendChild(card);
      });
    }
  }

  function renderContact() {
    if (!DATA) return;
    var c = DATA.contact;
    var s = DATA.social;

    setHtml('contact-eyebrow-mount', c.eyebrow);
    setHtml('contact-title-mount', c.titleHtml);
    setHtml('contact-sub-mount', c.sub);

    var actions = document.getElementById('contact-actions');
    if (actions) {
      var mailBtn = el('a', 'btn btn-primary btn-lg');
      mailBtn.setAttribute('href', 'mailto:' + s.email);
      mailBtn.setAttribute('id', 'contact-email-btn');
      mailBtn.appendChild(iconSpan('mail'));
      mailBtn.appendChild(document.createTextNode('Hire me — send an email'));
      actions.appendChild(mailBtn);

      var ghBtn = el('a', 'btn btn-outline btn-lg');
      ghBtn.setAttribute('href', s.github.url);
      ghBtn.setAttribute('target', '_blank');
      ghBtn.setAttribute('rel', 'noopener noreferrer');
      ghBtn.setAttribute('id', 'contact-github-btn');
      ghBtn.appendChild(iconSpan('github'));
      ghBtn.appendChild(document.createTextNode('GitHub'));
      actions.appendChild(ghBtn);

      var liBtn = el('a', 'btn btn-outline btn-lg');
      liBtn.setAttribute('href', s.linkedin.url);
      liBtn.setAttribute('target', '_blank');
      liBtn.setAttribute('rel', 'noopener noreferrer');
      liBtn.setAttribute('id', 'contact-linkedin-btn');
      liBtn.appendChild(iconSpan('linkedin'));
      liBtn.appendChild(document.createTextNode('LinkedIn'));
      actions.appendChild(liBtn);
    }

    var emailLine = el('p', 'contact-email-line');
    emailLine.textContent = s.email;
    var actionsParent = actions && actions.parentNode;
    if (actionsParent) actionsParent.insertBefore(emailLine, actions.nextSibling);

    renderFooterBar(s);
    setHtml('footer-copyright-mount', DATA.footer.text);
  }

  function renderFooterBar(s) {
    var bar = document.getElementById('footer-bar');
    if (!bar || !DATA) return;

    var left = el('div', 'footer-info');
    var emailRow = el('div', 'footer-info-row');
    emailRow.appendChild(iconSpan('mail'));
    emailRow.appendChild(document.createTextNode(s.email));
    left.appendChild(emailRow);

    if (DATA.profile.location) {
      var locRow = el('div', 'footer-info-row');
      locRow.appendChild(iconSpan('pin'));
      locRow.appendChild(document.createTextNode(DATA.profile.location));
      left.appendChild(locRow);
    }

    var social = el('div', 'footer-social');

    var linkedinLink = el('a', 'social-circle social-linkedin');
    linkedinLink.setAttribute('href', s.linkedin.url);
    linkedinLink.setAttribute('target', '_blank');
    linkedinLink.setAttribute('rel', 'noopener noreferrer');
    linkedinLink.setAttribute('aria-label', 'LinkedIn — ' + s.linkedin.label);
    linkedinLink.setAttribute('title', 'LinkedIn: ' + s.linkedin.label);
    linkedinLink.appendChild(iconSpan('linkedin'));

    var githubLink = el('a', 'social-circle social-github');
    githubLink.setAttribute('href', s.github.url);
    githubLink.setAttribute('target', '_blank');
    githubLink.setAttribute('rel', 'noopener noreferrer');
    githubLink.setAttribute('aria-label', 'GitHub — ' + s.github.label);
    githubLink.setAttribute('title', 'GitHub: ' + s.github.label);
    githubLink.appendChild(iconSpan('github'));

    var discordLink = el('a', 'social-circle social-discord');
    discordLink.setAttribute('href', s.discord.url);
    discordLink.setAttribute('target', '_blank');
    discordLink.setAttribute('rel', 'noopener noreferrer');
    discordLink.setAttribute('aria-label', 'Discord — ' + s.discord.label);
    discordLink.setAttribute('title', 'Discord: ' + s.discord.label);
    discordLink.appendChild(iconSpan('discord'));

    social.appendChild(linkedinLink);
    social.appendChild(githubLink);
    social.appendChild(discordLink);

    bar.appendChild(left);
    bar.appendChild(social);
  }

  function mobileNav() {
    var btn = document.getElementById('menu-btn');
    var nav = document.getElementById('main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function activeNav() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main .section[id]'));
    var links = Array.prototype.slice.call(document.querySelectorAll('.main-nav a[href^="#"]'));
    if (!sections.length || !links.length) return;

    function update() {
      var current = sections[0].id;
      sections.forEach(function (sec) {
        if (sec.getBoundingClientRect().top <= 110) current = sec.id;
      });
      links.forEach(function (link) {
        link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function scrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!DATA) {
      console.error('PORTFOLIO_DATA not found — make sure data.js loads before script.js');
      return;
    }
    renderBrand();
    renderNav();
    renderHero();
    renderSkills();
    renderTools();
    renderLangIcons();
    renderProjects();
    renderSecurity();
    renderCertifications();
    renderPhilosophy();
    renderContact();

    mobileNav();
    activeNav();
    scrollReveal();
  });
})();
