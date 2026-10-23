(function () {
  var canvas = document.getElementById('phone3d');
  var stage = document.getElementById('stage');
  var fallback = document.getElementById('stage-fallback');
  var buttons = document.querySelectorAll('.showcase-btn');
  if (!canvas || !stage) return;

  function showFallback(msg) {
    if (fallback) { fallback.hidden = false; if (msg) fallback.textContent = msg; }
    if (canvas) canvas.hidden = true;
  }

  function load(cb) {
    if (window.THREE) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'three.min.js';
    s.onload = cb;
    s.onerror = function () { showFallback('The 3D library did not load. Check that three.min.js sits next to index.html.'); };
    document.head.appendChild(s);
  }

  function boot() {
    try {
      if (!window.THREE) { showFallback('The 3D library did not load.'); return; }
      var T = window.THREE;
      var TAU = Math.PI * 2;
      var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

      var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputEncoding = T.sRGBEncoding;
      renderer.setClearColor(0x000000, 0);

      var scene = new T.Scene();
      var camera = new T.PerspectiveCamera(32, 1, 0.1, 50);
      camera.position.set(0, 0, 6.3);

      scene.add(new T.AmbientLight(0xffffff, 0.65));
      var key = new T.DirectionalLight(0xffffff, 0.95); key.position.set(3, 4, 5); scene.add(key);
      var rim = new T.DirectionalLight(0x2d68ff, 0.9); rim.position.set(-4, 2, -3); scene.add(rim);
      var fill = new T.PointLight(0x2d68ff, 0.5, 12); fill.position.set(0, -2, 4); scene.add(fill);

      var W = 1.2, H = 2.5, D = 0.14;
      function roundedRect(w, h, r) {
        var s = new T.Shape(), x = -w / 2, y = -h / 2;
        s.moveTo(x + r, y);
        s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
        s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
        s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
        return s;
      }

      var phone = new T.Group();

      // body: rounded slab with beveled edges
      var bodyGeo = new T.ExtrudeGeometry(roundedRect(W - 0.06, H - 0.06, 0.2), {
        depth: D, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 5, curveSegments: 28
      });
      bodyGeo.translate(0, 0, -D / 2);
      var bodyMat = new T.MeshStandardMaterial({ color: 0x0f1724, metalness: 0.65, roughness: 0.32 });
      phone.add(new T.Mesh(bodyGeo, bodyMat));

      // black bezel and the screen
      var bezel = new T.Mesh(new T.ShapeGeometry(roundedRect(W - 0.1, H - 0.1, 0.17), 24), new T.MeshBasicMaterial({ color: 0x04070b }));
      bezel.position.z = 0.1015;
      phone.add(bezel);

      var SW = 600, SH = 1350;
      var sc = document.createElement('canvas'); sc.width = SW; sc.height = SH;
      var g = sc.getContext('2d');
      var tex = new T.CanvasTexture(sc);
      tex.encoding = T.sRGBEncoding;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      var screen = new T.Mesh(new T.PlaneGeometry(W - 0.16, H - 0.16), new T.MeshBasicMaterial({ map: tex, transparent: true }));
      screen.position.z = 0.1025;
      phone.add(screen);

      // side buttons
      var btnMat = new T.MeshStandardMaterial({ color: 0x1d2a3a, metalness: 0.7, roughness: 0.4 });
      [[W / 2 + 0.004, 0.5, 0.4], [-W / 2 - 0.004, 0.62, 0.26], [-W / 2 - 0.004, 0.22, 0.26]].forEach(function (b) {
        var m = new T.Mesh(new T.BoxGeometry(0.04, b[2], 0.06), btnMat);
        m.position.set(b[0], b[1], 0);
        phone.add(m);
      });

      // back: camera plate, lenses and small AE mark
      var plateGeo = new T.ExtrudeGeometry(roundedRect(0.56, 0.56, 0.13), { depth: 0.03, bevelEnabled: false, curveSegments: 20 });
      plateGeo.translate(0, 0, -0.13);
      var plate = new T.Mesh(plateGeo, new T.MeshStandardMaterial({ color: 0x182538, metalness: 0.5, roughness: 0.4 }));
      plate.position.set(0.28, 0.86, 0);
      phone.add(plate);
      var ringMat = new T.MeshStandardMaterial({ color: 0x070c12, metalness: 0.9, roughness: 0.2 });
      var glassMat = new T.MeshStandardMaterial({ color: 0x123249, emissive: 0x081e2e, metalness: 0.4, roughness: 0.1 });
      [[0.14, 0.14], [0.14, -0.14], [-0.14, 0.14]].forEach(function (p) {
        var ring = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.035, 32), ringMat);
        ring.rotation.x = Math.PI / 2; ring.position.set(0.28 + p[0], 0.86 + p[1], -0.14); phone.add(ring);
        var glass = new T.Mesh(new T.CylinderGeometry(0.065, 0.065, 0.04, 32), glassMat);
        glass.rotation.x = Math.PI / 2; glass.position.set(0.28 + p[0], 0.86 + p[1], -0.142); phone.add(glass);
      });

      var bc = document.createElement('canvas'); bc.width = 256; bc.height = 256;
      var bg2 = bc.getContext('2d');
      var backTex = new T.CanvasTexture(bc);
      backTex.encoding = T.sRGBEncoding;
      var backMark = new T.Mesh(new T.PlaneGeometry(0.5, 0.5), new T.MeshBasicMaterial({ map: backTex, transparent: true }));
      backMark.rotation.y = Math.PI;
      backMark.position.set(0, -0.35, -0.103);
      phone.add(backMark);
      function drawBack() {
        bg2.clearRect(0, 0, 256, 256);
        bg2.fillStyle = '#2d68ff';
        bg2.font = '700 110px "JetBrains Mono", monospace';
        bg2.textAlign = 'center'; bg2.textBaseline = 'middle';
        bg2.fillText('AE', 128, 128);
        backTex.needsUpdate = true;
      }

      scene.add(phone);

      var DATA = {
        matchin: { kind: 'AI Career Platform', name: 'MatchIn', tag: 'Smart skill matching and AI roadmaps.', stack: ['Flutter', 'Clean Arch', 'BLoC', 'Dio'], role: 'Flutter Developer' },
        engipedia: { kind: 'Digital Learning Hub', name: 'Engipedia', tag: 'Centralized engineering course repository.', stack: ['Flutter', 'Dart', 'MVVM'], role: 'Lead Mobile Developer' }
      };
      var current = 'matchin';
      var phoneImgs = {};
      var imgMatchIn = new Image();
      imgMatchIn.src = 'screens/matchin/home.jpg';
      imgMatchIn.onload = function () {
        phoneImgs.matchin = imgMatchIn;
        if (current === 'matchin') { drawScreen('matchin'); }
      };

      function rr(x, y, w, h, r) {
        g.beginPath(); g.moveTo(x + r, y);
        g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
        g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
      }
      function wrap(text, x, y, maxW, lh) {
        var words = text.split(' '), line = '';
        for (var i = 0; i < words.length; i++) {
          var test = line ? line + ' ' + words[i] : words[i];
          if (g.measureText(test).width > maxW && line) { g.fillText(line, x, y); line = words[i]; y += lh; }
          else line = test;
        }
        g.fillText(line, x, y);
      }
      function drawScreen(k) {
        var im = phoneImgs[k];
        if (im) {
          g.clearRect(0, 0, SW, SH);
          g.save(); rr(0, 0, SW, SH, 64); g.clip();
          var r = Math.max(SW / im.width, SH / im.height), iw = im.width * r, ih = im.height * r;
          g.drawImage(im, (SW - iw) / 2, (SH - ih) / 2, iw, ih);
          g.restore();
          tex.needsUpdate = true;
          return;
        }
        var d = DATA[k];
        g.clearRect(0, 0, SW, SH);
        g.save(); rr(0, 0, SW, SH, 64); g.clip();
        var bgG = g.createLinearGradient(0, 0, 0, SH);
        bgG.addColorStop(0, '#000000'); bgG.addColorStop(1, '#090b14');
        g.fillStyle = bgG; g.fillRect(0, 0, SW, SH);
        var glow = g.createRadialGradient(SW * 0.72, SH * 0.28, 10, SW * 0.72, SH * 0.28, 430);
        glow.addColorStop(0, 'rgba(45,104,255,0.38)'); glow.addColorStop(1, 'rgba(45,104,255,0)');
        g.fillStyle = glow; g.fillRect(0, 0, SW, SH);

        g.textAlign = 'left'; g.textBaseline = 'alphabetic';
        g.fillStyle = '#e7eef6'; g.font = '500 26px "JetBrains Mono", monospace'; g.fillText('9:41', 54, 70);
        g.fillStyle = '#000'; rr(SW / 2 - 62, 34, 124, 40, 20); g.fill();

        g.fillStyle = '#3b82f6'; g.font = '600 24px "JetBrains Mono", monospace';
        g.fillText(d.kind.toUpperCase(), 54, 330);

        var size = 100;
        g.fillStyle = '#ffffff';
        do { g.font = '700 ' + size + 'px "Plus Jakarta Sans", sans-serif'; size -= 4; }
        while (g.measureText(d.name).width > SW - 108 && size > 40);
        g.fillText(d.name, 50, 450);

        g.fillStyle = '#94a3b8'; g.font = '400 34px "Plus Jakarta Sans", sans-serif';
        wrap(d.tag, 54, 525, SW - 108, 50);

        // stack chips
        var cx = 54, cy = 760;
        g.font = '500 24px "JetBrains Mono", monospace';
        d.stack.forEach(function (s) {
          var w = g.measureText(s).width + 36;
          if (cx + w > SW - 54) { cx = 54; cy += 68; }
          g.strokeStyle = 'rgba(45,104,255,0.45)'; g.lineWidth = 2; rr(cx, cy, w, 50, 14); g.stroke();
          g.fillStyle = '#93c5fd'; g.fillText(s, cx + 18, cy + 34);
          cx += w + 14;
        });

        g.fillStyle = '#64748b'; g.font = '600 22px "JetBrains Mono", monospace'; g.fillText('ROLE', 54, 1040);
        g.fillStyle = '#ffffff'; g.font = '600 34px "Plus Jakarta Sans", sans-serif'; g.fillText(d.role, 54, 1090);

        g.fillStyle = '#2563eb'; rr(54, 1150, SW - 108, 92, 26); g.fill();
        g.fillStyle = '#ffffff'; g.font = '700 32px "Plus Jakarta Sans", sans-serif'; g.textAlign = 'center';
        g.fillText('Explore Project ↗', SW / 2, 1208);
        g.fillStyle = 'rgba(255,255,255,0.7)'; rr(SW / 2 - 80, SH - 32, 160, 6, 3); g.fill();
        g.restore();
        tex.needsUpdate = true;
      }
      drawScreen(current); drawBack();

      // Interaction
      var userY = 0, vel = 0, dragging = false, lastX = 0, startX = 0, startY = 0, idleSince = performance.now();
      var spin = 0, spinStart = 0, swapped = true, pendingKey = current;
      canvas.addEventListener('pointerdown', function (e) {
        dragging = true; lastX = e.clientX; startX = e.clientX; startY = e.clientY; vel = 0;
        try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
        stage.classList.add('grabbing');
      });
      canvas.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - lastX; lastX = e.clientX;
        userY += dx * 0.012; vel = dx * 0.012; idleSince = performance.now();
      });
      function endDrag(e) {
        if (dragging && e && typeof e.clientX === 'number') {
          var dist = Math.hypot(e.clientX - startX, e.clientY - startY);
          if (dist < 8) {
            canvas.dispatchEvent(new CustomEvent('open-case-study', { detail: { project: current }, bubbles: true }));
          }
        }
        dragging = false; stage.classList.remove('grabbing'); idleSince = performance.now();
      }
      canvas.addEventListener('pointerup', endDrag);
      canvas.addEventListener('pointercancel', endDrag);
      canvas.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { userY -= 0.35; idleSince = performance.now(); e.preventDefault(); }
        if (e.key === 'ArrowRight') { userY += 0.35; idleSince = performance.now(); e.preventDefault(); }
      });

      function switchTo(k) {
        if (k === current || !DATA[k]) return;
        current = k;
        buttons.forEach(function (b) {
          var isThis = b.getAttribute('data-proj') === k;
          b.setAttribute('aria-pressed', isThis ? 'true' : 'false');
          if (isThis) b.classList.add('active'); else b.classList.remove('active');
        });
        if (reduce) { drawScreen(k); return; }
        pendingKey = k; swapped = false; spinStart = performance.now();
      }
      buttons.forEach(function (b) {
        b.addEventListener('click', function () { switchTo(b.getAttribute('data-proj')); });
      });

      function resize() {
        var w = stage.clientWidth, h = stage.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = 6.3 * Math.max(1, 0.7 / camera.aspect);
        camera.updateProjectionMatrix();
      }
      if (window.ResizeObserver) new ResizeObserver(resize).observe(stage);
      else window.addEventListener('resize', resize);
      resize();

      var running = false, raf = 0;
      function frame(now) {
        raf = requestAnimationFrame(frame);
        var t = now / 1000;
        if (!dragging) {
          userY += vel; vel *= 0.92; if (Math.abs(vel) < 0.0005) vel = 0;
          if (now - idleSince > 1800) {
            var target = Math.round(userY / TAU) * TAU;
            userY += (target - userY) * 0.04;
          }
        }
        if (spinStart) {
          var p = (now - spinStart) / 900;
          if (p >= 1) { spin = 0; spinStart = 0; if (!swapped) { drawScreen(pendingKey); swapped = true; } }
          else {
            var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            spin = e * TAU;
            if (!swapped && p > 0.5) { drawScreen(pendingKey); swapped = true; }
          }
        }
        var sway = reduce ? 0 : Math.sin(t * 0.7) * 0.26;
        phone.rotation.y = userY + spin + sway;
        phone.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.05;
        renderer.render(scene, camera);
      }
      function start() { if (!running) { running = true; raf = requestAnimationFrame(frame); } }
      function stop() { running = false; cancelAnimationFrame(raf); }
      if (window.IntersectionObserver) {
        new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }, { threshold: 0.05 }).observe(stage);
      } else { start(); }
    } catch (err) {
      showFallback('The 3D phone could not start in this browser: ' + (err && err.message ? err.message : 'unknown error'));
      if (window.console) console.error(err);
    }
  }

  if (canvas && stage) {
    if (window.IntersectionObserver) {
      var lazy = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { lazy.disconnect(); load(boot); }
      }, { rootMargin: '600px' });
      lazy.observe(stage);
    } else { load(boot); }
  }
})();