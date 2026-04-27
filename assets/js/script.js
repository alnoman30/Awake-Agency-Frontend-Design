gsap.registerPlugin(ScrollTrigger, Flip);

// =====================
// Navbar Elements
// =====================
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");

const menuBgSvg = document.querySelector(".menu-bg-svg");
const navInner = document.getElementById("nav-inner");

// =====================
// Safety check (prevents crashes)
// =====================
if (!menuToggle || !mobileMenu || !line1 || !line2 || !line3 || !menuBgSvg || !navInner) {
    console.warn("Navbar elements missing in DOM.");
} else {

    let scrolled = false;

    // =====================
    // GSAP Timeline
    // =====================
    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(mobileMenu, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out"
    })

    .to(menuBgSvg, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.2")

    .fromTo(".mobile-menu a",
        {
            y: 20,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.4,
            ease: "power2.out"
        },
        "-=0.3"
    );

    // =====================
    // Hamburger Animations
    // =====================
    function openIcon() {
        gsap.to(line1, {
            y: 6,
            rotation: 45,
            transformOrigin: "50% 50%",
            duration: 0.3
        });

        gsap.to(line2, {
            opacity: 0,
            duration: 0.2
        });

        gsap.to(line3, {
            y: -6,
            rotation: -45,
            transformOrigin: "50% 50%",
            duration: 0.3
        });
    }

    function closeIcon() {
        gsap.to([line1, line3], {
            y: 0,
            rotation: 0,
            duration: 0.3
        });

        gsap.to(line2, {
            opacity: 1,
            duration: 0.2
        });
    }

    // =====================
    // Toggle Menu (FIXED STATE HANDLING)
    // =====================
    menuToggle.addEventListener("click", () => {
        if (tl.reversed()) {
            tl.play();
            openIcon();
        } else {
            tl.reverse();
            closeIcon();
        }
    });

    // =====================
    // Sticky Navbar (optimized)
    // =====================
    function handleScroll() {
        if (window.scrollY > 30 && !scrolled) {
            scrolled = true;

            gsap.to(navInner, {
                backgroundColor: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                duration: 0.2,
                ease: "power2.out"
            });

        } else if (window.scrollY <= 30 && scrolled) {
            scrolled = false;

            gsap.to(navInner, {
                backgroundColor: "rgba(255,255,255,0)",
                backdropFilter: "blur(0px)",
                boxShadow: "0 0px 0px rgba(0,0,0,0)",
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }

    window.addEventListener("scroll", () => {
        requestAnimationFrame(handleScroll);
    }, { passive: true });
}

// ──======================================= Smooth scroll (Lenis)======================================== ──
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.3,
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}


// Button Animation

const buttons = document.querySelectorAll(".cta");

buttons.forEach((btn) => {
  let state;

  btn.addEventListener("mouseenter", () => {
    state = Flip.getState(btn.querySelectorAll(".cta-text, .cta-arrow"));

    btn.style.flexDirection = "row-reverse";

    Flip.from(state, {
      duration: 0.5,
      ease: "power3.inOut"
    });
  });

  btn.addEventListener("mouseleave", () => {
    state = Flip.getState(btn.querySelectorAll(".cta-text, .cta-arrow"));

    btn.style.flexDirection = "row";

    Flip.from(state, {
      duration: 0.5,
      ease: "power3.inOut"
    });
  });
});