(() => {
  const spot = document.getElementById('cursor-spot');
  if (spot) {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lx = mx;
    let ly = my;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });
    const tick = () => {
      lx += (mx - lx) * 0.072;
      ly += (my - ly) * 0.072;
      spot.style.left = `${lx}px`;
      spot.style.top = `${ly}px`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const mailLink = document.getElementById('mail-link');
  const mailRipple = document.getElementById('mail-ripple');
  if (mailLink && mailRipple) {
    mailLink.addEventListener('mouseenter', (e) => {
      const rect = mailLink.getBoundingClientRect();
      mailRipple.style.left = `${e.clientX - rect.left - 15}px`;
      mailRipple.style.top = `${e.clientY - rect.top - 15}px`;
      mailLink.classList.add('is-active');
    });
    mailLink.addEventListener('mouseleave', () => {
      mailLink.classList.remove('is-active');
    });
  }

  const epkLink = document.getElementById('epk-link');
  const epkRipple = document.getElementById('epk-ripple');
  if (epkLink && epkRipple) {
    epkLink.addEventListener('mouseenter', (e) => {
      const rect = epkLink.getBoundingClientRect();
      epkRipple.style.left = `${e.clientX - rect.left - 15}px`;
      epkRipple.style.top = `${e.clientY - rect.top - 15}px`;
      epkLink.classList.add('is-active');
    });
    epkLink.addEventListener('mouseleave', () => {
      epkLink.classList.remove('is-active');
    });
  }

  const burgerBtn = document.getElementById('burger-btn');
  const page = document.querySelector('.page');
  if (burgerBtn && page) {
    burgerBtn.addEventListener('click', () => {
      const open = page.classList.toggle('menu-open');
      burgerBtn.setAttribute('aria-expanded', String(open));
    });
  }

  const widget = document.getElementById('audio-widget');
  const embedEl = document.getElementById('spotify-embed');
  let spotifyController = null;

  const setMuted = (muted) => {
    widget.classList.toggle('is-muted', muted);
    widget.setAttribute('aria-pressed', String(muted));
  };

  if (widget && embedEl) {
    setMuted(true);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      IFrameAPI.createController(embedEl, {
        uri: 'spotify:track:4pTVEX0EYkCzu8NZKvxoen',
      }, (EmbedController) => {
        spotifyController = EmbedController;
        EmbedController.addListener('playback_update', (e) => {
          setMuted(e.data.isPaused);
        });
        EmbedController.play();
      });
    };

    widget.addEventListener('click', () => {
      if (!spotifyController) return;
      spotifyController.togglePlay();
    });

    // Browsers block audio with sound until the visitor interacts with the
    // page, so start the track on their first click/tap/keypress anywhere.
    const startOnFirstInteraction = (e) => {
      if (widget.contains(e.target) || !spotifyController) return;
      spotifyController.play();
    };
    document.addEventListener('pointerdown', startOnFirstInteraction, { once: true, passive: true });
    document.addEventListener('keydown', startOnFirstInteraction, { once: true, passive: true });
  }
})();
