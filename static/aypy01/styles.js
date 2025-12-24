document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     DRAG SCROLL
     =============================== */
  const slider = document.getElementById('drag-container');
  if (slider) {
    let isDown = false, startY, scrollTop;

    slider.addEventListener('mousedown', e => {
      isDown = true;
      startY = e.pageY - slider.offsetTop;
      scrollTop = slider.scrollTop;
    });

    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);

    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const y = e.pageY - slider.offsetTop;
      slider.scrollTop = scrollTop - (y - startY) * 2;
    });
  }

  /* ===============================
     NAV SCROLL
     =============================== */
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(anchor.getAttribute('href')?.substring(1));
      if (target && slider) {
        slider.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ===============================
     QUOTES
     =============================== */
  const quotes = [
    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    "Your right is to action alone, never to its fruits.\nLet not the fruits of action be your motive,\nnor let your attachment be to inaction.",
    "汝の権利はただ行為にのみあり、果実には決してあらず。\n行為の果実の原因となるなかれ、また不行為に執着することなかれ。"
  ];

  const qEl = document.getElementById("rotating-quote");
  if (qEl) {
    let qIndex = 0;
    const chars = "X#%&$@?!0123456789";

    function juggleText(targetText) {
  const chars = "X#%&$@?!0123456789";

  // Decide segmentation strategy
  const hasSpaces = (targetText.match(/\s/g) || []).length > 5;
  let segments;

  if (hasSpaces) {
    // Word-level juggling (keeps meaning intact)
    segments = targetText.split(/(\s+)/);
  } else {
    // Fallback: 2-char chunks for compact scripts
    segments = [];
    for (let i = 0; i < targetText.length; i += 2) {
      segments.push(targetText.substring(i, i + 2));
    }
  }

  let step = 0;
  const total = segments.length;

  const interval = setInterval(() => {
    qEl.innerText = segments
      .map((seg, i) => {
        if (i <= step) return seg;
        return Array(seg.length)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('');
      })
      .join('');

    step++;
    if (step > total) {
      qEl.innerText = targetText;
      clearInterval(interval);
    }
  }, 60);
}


    function cycleQuotes() {
      juggleText(quotes[qIndex]);
      qIndex = (qIndex + 1) % quotes.length;
    }

    setTimeout(cycleQuotes, 1000);
    setInterval(cycleQuotes, 15000);
  }

  /* ===============================
     CLOCK
     =============================== */
  const clock = document.getElementById('clock');
  if (clock) {
    setInterval(() => {
      clock.innerText = new Date().toLocaleTimeString();
    }, 1000);
  }
});


function transmitMail() {
  const name = document.getElementById('sender-name').value.trim();
  const email = document.getElementById('sender-email').value.trim();
  const message = document.getElementById('sender-message').value.trim();

  // Minimal validation
  if (!email || !message) {
    alert("BRUHHHHH!!!\nFill the form field(s)");
    return;
  }

  const subject = encodeURIComponent("ENQUIRY FOR AYPY");

  const body = encodeURIComponent(
`Name: ${name || "N/A"}
Email: ${email}

Message:
${message}`
  );

  window.location.href =
    `mailto:yadav.aditya595@gmail.com?subject=${subject}&body=${body}`;
}




/**
 * -----------------------------------------------------
 * BLUEPRINT 3D VISUALIZATION ENGINE
 * -----------------------------------------------------
 * This script handles the generation of 3D wireframe models 
 * using Three.js to represent specific projects visually.
 */

function createBlueprintScene(containerId, color, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. SETUP: Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Calculate Aspect Ratio
    const aspect = container.clientWidth / container.clientHeight;
    const d = 10; // View scale
    
    // Orthographic Camera for "Engineering Blueprint" look (no perspective distortion)
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20); // Isometric angle
    camera.lookAt(scene.position);

    // WebGL Renderer with transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Common Material: Wireframe style
    const wireMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });

    const solidMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.1 // Faint fill
    });

    // Main Group to hold all mesh parts
    const group = new THREE.Group();
    scene.add(group);

    // 2. GEOMETRY GENERATION
    
    /**
     * TYPE: NERV (Neural Network)
     * Logic: Generates scattered nodes (Points) and connects them with lines
     * to simulate a brain's neural pathway.
     */
    if (type === 'NERV') {
        const nodeCount = 35;
        const connectionDistance = 4.5;
        const nodes = [];
        const nodeGeo = new THREE.SphereGeometry(0.15, 8, 8);

        // Create Nodes randomly within a sphere volume
        for(let i=0; i<nodeCount; i++) {
            const mesh = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: color }));
            
            // Spherical distribution
            const phi = Math.acos( -1 + ( 2 * i ) / nodeCount );
            const theta = Math.sqrt( nodeCount * Math.PI ) * phi;
            const r = 5.5;

            mesh.position.setFromSphericalCoords(r, phi, theta);
            
            // Add some randomness
            mesh.position.x += (Math.random() - 0.5) * 1;
            mesh.position.y += (Math.random() - 0.5) * 1;
            mesh.position.z += (Math.random() - 0.5) * 1;

            group.add(mesh);
            nodes.push(mesh.position);
        }

        // Create Connections (Synapses)
        const lineMaterial = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.3 });
        const lineGeo = new THREE.BufferGeometry();
        const linePositions = [];

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = nodes[i].distanceTo(nodes[j]);
                if (dist < connectionDistance) {
                    linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
                    linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
                }
            }
        }
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const connections = new THREE.LineSegments(lineGeo, lineMaterial);
        group.add(connections);
        
        // Add a central faint core
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 0), solidMaterial);
        group.add(core);
    } 
    
    /**
     * TYPE: HEART (Medical Prediction)
     * Logic: Draws a 2D Heart shape using Bezier curves and extrudes it 
     * to create a 3D model.
     */
    else if (type === 'HEART') {
        const x = 0, y = 0;
        const heartShape = new THREE.Shape();
        
        // Draw heart path (Standard SVG-style path definition)
        heartShape.moveTo( x + 2.5, y + 2.5 );
        heartShape.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
        heartShape.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5 );
        heartShape.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
        heartShape.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
        heartShape.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
        heartShape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );

        const extrudeSettings = { 
            depth: 1.5, 
            bevelEnabled: true, 
            bevelSegments: 2, 
            steps: 2, 
            bevelSize: 0.2, 
            bevelThickness: 0.2 
        };
        
        const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
        
        // Center the geometry so rotation happens around the middle
        geometry.center(); 
        
        const heart = new THREE.Mesh( geometry, wireMaterial );
        
        // Correct orientation: Flips the heart to stand upright and face camera correctly
        heart.rotation.z = Math.PI; // Flip vertically (points down)
        heart.rotation.x = Math.PI; // Flip horizontally to correct the mirroring
        // Actually, just Z rotation of PI flips it upside down relative to drawing. 
        // The drawing is point-up. We want point-down? 
        // Bezier above draws it with point at top (y=9.5) and lobes at bottom (y=0). 
        // Wait, (0,0) is usually bottom in simple draw.
        // Let's just rotate it so it looks like a standard heart (Lobes up, Point down).
        // The geometry.center() puts (0,0,0) in the middle of the bounding box.
        
        // Resetting rotations to find "Up"
        heart.rotation.set(0, 0, Math.PI); // Rotate 180 deg around Z to flip lobes up/point down
        
        group.add( heart );

        // Add an EKG Pulse Ring
        const pulseGeo = new THREE.TorusGeometry(6, 0.05, 16, 100);
        const pulse = new THREE.Mesh(pulseGeo, wireMaterial);
        pulse.rotation.x = Math.PI / 2; // Flat ring
        group.add(pulse);
    }

    // 3. ANIMATION LOOP
    function animate() {
        requestAnimationFrame(animate);
        
        // Constant slow rotation
        group.rotation.y += 0.005;
        
        // Floating effect
        const time = Date.now() * 0.001;
        group.position.y = Math.sin(time) * 0.5;

        // Heart Beat Effect
        if (type === 'HEART') {
            // Quick expansion, slow contraction
            const beat = Math.sin(time * 5); 
            const scale = 1 + (beat > 0.5 ? 0.05 : 0); 
            group.scale.set(scale, scale, scale);
        }
        
        // NERV Drift Effect
        if (type === 'NERV') {
            group.rotation.z += 0.002;
        }

        renderer.render(scene, camera);
    }

    animate();

    // 4. RESPONSIVENESS
    // Update camera view when window resizes
    window.addEventListener('resize', () => {
        if(!container) return;
        const newAspect = container.clientWidth / container.clientHeight;
        camera.left = -d * newAspect;
        camera.right = d * newAspect;
        camera.top = d;
        camera.bottom = -d;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- INITIALIZE SCENES ON LOAD ---
window.addEventListener('load', () => {
    // NERV: Orange Neural Net
    createBlueprintScene('canvas-nerv', 0xff5500, 'NERV');
    
    // HEART: Red Heart
    createBlueprintScene('canvas-heart', 0xff0000, 'HEART');
});



