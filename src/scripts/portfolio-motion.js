(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ellipse = (x, y, width, height) => {
    const cy = y + height / 2;
    return `M ${x} ${cy} A ${width / 2} ${height / 2} 0 1 0 ${x + width} ${cy} A ${width / 2} ${height / 2} 0 1 0 ${x} ${cy} Z`;
  };

  // Even-odd fill cancels overlapping lenses in the band and inside each waterfall column.
  const bandRows = [9, 16, 28, 49, 86, 150, 200, 200];
  let bandY = 0;
  const bandShapes = [];
  for (const height of bandRows) {
    for (let column = 0; column < 6; column++) bandShapes.push(ellipse(column * 182, bandY, 220, height));
    bandY += height - Math.round(height * .3);
  }
  document.getElementById('band-path').setAttribute('d', bandShapes.join(' '));

  const heights = [9, 16, 28, 49, 86, 150, 86, 49, 28, 16];
  const columns = [
    { speed: 1, rest: -361 }, { speed: 2, rest: -856 },
    { speed: 1, rest: -585 }, { speed: 3, rest: -1137 },
    { speed: 2, rest: -1022 }, { speed: 1, rest: -534 }
  ];
  columns.forEach(({ speed, rest }, i) => {
    const column = document.createElement('div');
    column.className = 'waterfall-column';
    column.style.left = `${i * 182}px`;
    const cycleCount = speed + 2;
    let path = '';
    for (let cycle = 0; cycle < cycleCount; cycle++) {
      let y = cycle * 361;
      for (const height of heights) {
        path += ellipse(0, y, 220, height) + ' ';
        y += height - Math.round(.3 * height);
      }
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 220 ${cycleCount * 361}`);
    svg.setAttribute('height', String(cycleCount * 361));
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shape.setAttribute('d', path);
    shape.setAttribute('fill-rule', 'evenodd');
    svg.appendChild(shape);
    column.appendChild(svg);
    document.querySelector(i % 2 === 0 ? '.set-a' : '.set-b').appendChild(column);
    column.style.transform = `translateY(${rest}px)`;
    if (!reduced.matches) {
      const motion = column.animate([
        { transform: `translateY(${rest}px)` },
        { transform: `translateY(${rest + speed * 361}px)` }
      ], { duration: 8000, iterations: Infinity, easing: 'linear' });
      motion.pause();
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) motion.play();
        else motion.pause();
      }, { rootMargin: '300px' }).observe(document.getElementById('waterfall'));
    }
  });

  const hero = document.getElementById('hero');
  const track = document.getElementById('hero-track');
  const video = hero.querySelector('video');
  const nav = document.getElementById('nav');
  // Wheel smoothing and the video scrub are for mouse and trackpad. Touch keeps native momentum
  // scrolling and scrubs a frame sequence instead, because mobile browsers seek video poorly.
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced.matches) {
    video.pause();
    // No wheel interception, scroll-linked translation, or scrub in reduced motion.
    new IntersectionObserver(entries => nav.classList.toggle('is-visible', !entries[0].isIntersecting))
      .observe(hero);
    return;
  }

  video.pause();
  const scrub = finePointer ? videoScrub(video) : frameScrub(hero, video);
  const band = document.getElementById('band');
  const ground = document.getElementById('band-ground');
  const rule = document.getElementById('band-rule');
  let targetScroll = scrollY;
  let smoothScrolling = false;
  let settingScroll = false;
  let raf = 0;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
  // Medians from the actual top and bottom 50px of the original clip at 0, 2, 4, 6 and 7s.
  const greens = [
    [0, 28, 40, 29], [2, 36, 48, 37], [4, 33, 46, 35],
    [6, 32, 44, 34], [7, 32, 44, 34], [8, 32, 44, 34]
  ];
  const colourForTime = time => {
    const index = greens.findIndex((point, i) => i < greens.length - 1 && time <= greens[i + 1][0]);
    const i = Math.max(0, index);
    const a = greens[i], b = greens[i + 1];
    const factor = clamp((time - a[0]) / (b[0] - a[0]), 0, 1);
    return a.slice(1).map((channel, j) => Math.round(channel + (b[j + 1] - channel) * factor)).join(',');
  };

  const tick = () => {
    raf = 0;
    if (smoothScrolling) {
      const remaining = targetScroll - scrollY;
      // Snap once a step would be under half a pixel: scroll positions round, so the lerp would stall a few px short.
      if (Math.abs(remaining * .13) < .5) {
        settingScroll = true;
        scrollTo({ top: targetScroll, behavior: 'instant' });
        settingScroll = false;
        smoothScrolling = false;
      } else {
        settingScroll = true;
        scrollTo({ top: scrollY + remaining * .13, behavior: 'instant' });
        settingScroll = false;
      }
    }

    // Pin distance from the hero's own height, which stays put when a mobile address bar resizes the viewport.
    const pinDistance = Math.max(1, track.offsetHeight - hero.offsetHeight);
    const progress = clamp(scrollY / pinDistance, 0, 1);
    const desiredTime = progress * scrub.duration();
    // Fade the whole hero out over the last part of the scrub: fully opaque until FADE_START, transparent at the end.
    const FADE_START = .45;
    const f = clamp((progress - FADE_START) / (1 - FADE_START), 0, 1);
    hero.style.opacity = String(1 - f * f * (3 - 2 * f));
    const pending = scrub.seek(desiredTime);
    hero.style.setProperty('--edge-rgb', colourForTime(scrub.time()));
    // During the release, content lags behind its viewport by 12%; the oversized video covers the edge.
    const release = clamp(scrollY - pinDistance, 0, innerHeight);
    scrub.el.style.transform = `translateY(${release * .12}px)`;
    // Nav arrives as the hero finishes fading (content is already sliding over it).
    nav.classList.toggle('is-visible', progress >= .95);
    const rect = band.getBoundingClientRect();
    if (rect.bottom >= 0 && rect.top <= innerHeight) {
      ground.style.transform = `translateY(${-rect.top * .7}px)`;
      rule.style.transform = `translateY(${rect.top * .15}px)`;
    }
    if (smoothScrolling || pending) schedule();
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const scrollToTarget = top => {
    targetScroll = clamp(top, 0, maxScroll());
    smoothScrolling = true;
    schedule();
  };
  if (finePointer) addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) return;
    event.preventDefault();
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (!smoothScrolling) targetScroll = scrollY;
    scrollToTarget(targetScroll + delta);
  }, { passive: false });
  addEventListener('scroll', () => {
    if (!settingScroll && !smoothScrolling) targetScroll = scrollY;
    schedule();
  }, { passive: true });
  addEventListener('resize', () => { targetScroll = clamp(targetScroll, 0, maxScroll()); schedule(); });
  scrub.onready = schedule;
  // Touch devices follow same-page anchors with native smooth scrolling (see portfolio-responsive.css).
  if (finePointer) document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    const destination = document.getElementById(hash.slice(1));
    if (!destination) return;
    event.preventDefault();
    history.pushState(null, '', hash);
    scrollToTarget(destination.getBoundingClientRect().top + scrollY - 82);
  });
  tick();

  // Only the first HERO_SECONDS of the clip are scrubbed.
  function videoScrub(video) {
    const HERO_SECONDS = 5;
    const source = video.querySelector('source');
    source.src = source.dataset.src;
    video.load();
    const scrub = {
      el: video,
      onready: () => {},
      duration: () => Math.max(0, Math.min(video.duration || 8, HERO_SECONDS) - .04),
      time: () => video.currentTime,
      seek(desiredTime) {
        if (video.readyState >= 1 && !video.seeking && Math.abs(desiredTime - video.currentTime) > .025) {
          // Exactly one seek per frame; wait for the decoder before scheduling another.
          video.currentTime = clamp(video.currentTime + (desiredTime - video.currentTime) * .24, 0, scrub.duration());
        }
        return Math.abs(desiredTime - video.currentTime) > .03;
      },
    };
    video.addEventListener('loadedmetadata', () => { video.pause(); scrub.onready(); });
    video.addEventListener('seeked', () => scrub.onready());
    return scrub;
  }

  // The same first 5s as 120 WebP frames (24fps) drawn to a canvas. Frames load after the page does,
  // coarse to fine, and the nearest loaded frame stands in until the exact one arrives. The hero's
  // poster background shows until the first frame lands.
  function frameScrub(hero, video) {
    const FRAMES = 120, FPS = 24;
    video.remove();
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-frames';
    canvas.setAttribute('aria-hidden', 'true');
    hero.prepend(canvas);
    const context = canvas.getContext('2d');
    const images = [];
    const loaded = new Array(FRAMES).fill(false);
    let wanted = 0, shown = -1;
    const nearest = index => {
      for (let d = 0; d < FRAMES; d++) {
        if (loaded[index - d]) return index - d;
        if (loaded[index + d]) return index + d;
      }
      return -1;
    };
    const draw = () => {
      const index = nearest(wanted);
      if (index === -1 || index === shown) return;
      const image = images[index];
      // Cover-fit, centred: the same crop object-fit gives the desktop video.
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
      context.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      shown = index;
    };
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      shown = -1;
      draw();
    };
    new ResizeObserver(size).observe(canvas);
    const load = async () => {
      const order = [];
      for (const step of [24, 8, 4, 2, 1]) for (let i = 0; i < FRAMES; i += step) if (!order.includes(i)) order.push(i);
      const next = () => {
        const index = order.shift();
        if (index === undefined) return Promise.resolve();
        const image = new Image();
        images[index] = image;
        image.decoding = 'async';
        image.src = `/portfolio/hero-frames/${String(index).padStart(3, '0')}.webp`;
        return image.decode().then(() => { loaded[index] = true; draw(); }, () => {}).then(next);
      };
      await Promise.all(Array.from({ length: 6 }, next));
    };
    if (document.readyState === 'complete') setTimeout(load);
    else addEventListener('load', () => setTimeout(load), { once: true });
    return {
      el: canvas,
      onready: () => {},
      duration: () => 5 - .04,
      time: () => Math.max(0, shown) / FPS,
      seek(desiredTime) {
        wanted = Math.min(FRAMES - 1, Math.round(desiredTime * FPS));
        draw();
        return false;
      },
    };
  }
})();
