(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tema claro/escuro ---------- */
  const themeBtn = document.getElementById("theme-toggle");
  const currentTheme = () =>
    root.dataset.theme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  if (!root.dataset.theme) root.dataset.theme = currentTheme();
  themeBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Nav: fundo ao rolar + menu mobile ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const setMenu = (open) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.hidden = !open;
  };
  menuBtn?.addEventListener("click", () => setMenu(menu.hidden));
  menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ---------- Link ativo conforme a seção visível ---------- */
  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
      io.observe(el);
    });
  }

  /* ---------- Brilho que segue o mouse nos cards ---------- */
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Terminal animado ---------- */
  const term = document.querySelector("#terminal code");
  const script = [
    { cmd: "terraform apply -auto-approve" },
    { out: '<span class="o">azurerm_kubernetes_cluster.aks: Modifications complete</span>' },
    { out: '<span class="g">Apply complete!</span> <span class="o">Resources: 3 added, 1 changed, 0 destroyed.</span>' },
    { cmd: "argocd app sync platform-api" },
    { out: '<span class="o">Sync Status:</span>   <span class="g">Synced</span>' },
    { out: '<span class="o">Health Status:</span> <span class="g">Healthy</span>' },
    { cmd: "kubectl get pods -n platform" },
    { out: '<span class="o">NAME                  READY  STATUS</span>' },
    { out: 'next-portal-7c9f-x2   1/1    <span class="g">Running</span>' },
    { out: 'platform-api-5d8b-k4  1/1    <span class="g">Running</span>' },
    { cmd: "next create repo --template node-api" },
    { out: '<span class="b">✔</span> Repositório criado no Azure DevOps' },
    { out: '<span class="b">✔</span> Projeto configurado via self-service' },
    { out: '<span class="y">⚡</span> ~95% menos tempo de entrega' },
  ];
  const prompt = '<span class="p">❯</span> ';

  const renderStatic = () => {
    term.innerHTML =
      script.map((l) => (l.cmd ? `${prompt}<span class="c">${l.cmd}</span>` : l.out)).join("\n") +
      `\n${prompt}<span class="cursor"></span>`;
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const typeTerminal = async () => {
    while (true) {
      let html = "";
      for (const line of script) {
        if (line.cmd) {
          html += (html ? "\n" : "") + prompt;
          for (let i = 1; i <= line.cmd.length; i++) {
            term.innerHTML = `${html}<span class="c">${line.cmd.slice(0, i)}</span><span class="cursor"></span>`;
            await sleep(28 + Math.random() * 40);
          }
          html += `<span class="c">${line.cmd}</span>`;
          await sleep(350);
        } else {
          html += "\n" + line.out;
          term.innerHTML = `${html}<span class="cursor"></span>`;
          await sleep(160);
        }
      }
      term.innerHTML = `${html}\n${prompt}<span class="cursor"></span>`;
      await sleep(4500);
    }
  };

  if (term) reduceMotion ? renderStatic() : typeTerminal();

  /* ---------- Copiar e-mail ---------- */
  const copyBtn = document.getElementById("copy-email");
  const toast = document.getElementById("toast");
  let toastTimer;
  copyBtn?.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      toast.textContent = "E-mail copiado para a área de transferência ✓";
    } catch (e) {
      window.location.href = `mailto:${email}`;
      return;
    }
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast.textContent = ""), 3000);
  });

  /* ---------- Ano no rodapé ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
