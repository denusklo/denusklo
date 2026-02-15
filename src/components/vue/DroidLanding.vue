<template>
  <div
    class="droid-landing min-h-screen relative overflow-hidden"
    :class="themeClasses"
    @mousemove="handleMouseMove"
  >
    <!-- Background Effects -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Grid Pattern with parallax -->
      <div
        ref="gridBgRef"
        class="absolute inset-0 grid-bg opacity-20 will-change-transform"
        :style="getGridParallaxStyle()"
      ></div>

      <!-- Floating Particles -->
      <div
        v-for="(particle, index) in particles"
        :key="particle.id"
        class="particle absolute rounded-full"
        :style="getParticleStyle(particle, index)"
      ></div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section min-h-screen flex items-center justify-center relative z-10">
      <div class="container mx-auto px-6 text-center">
        <!-- Status Badge -->
        <div
          class="hero-animate status-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          :class="badgeClasses"
          style="--delay: 0.2s"
        >
          <span class="status-dot w-2 h-2 rounded-full animate-pulse"></span>
          <span class="text-sm font-mono tracking-wider">SYSTEM ONLINE // {{ currentTime }}</span>
        </div>

        <!-- Main Title -->
        <h1
          class="hero-animate hero-title text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight"
          :class="titleClasses"
          style="--delay: 0.4s"
        >
          <span class="block glitch-wrapper" data-text="DEN KONG">
            DEN KONG
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="hero-animate hero-subtitle text-xl md:text-2xl mb-8 font-mono"
          :class="subtitleClasses"
          style="--delay: 0.6s"
        >
          &lt; Fullstack Developer /&gt;
        </p>

        <!-- Tech Stack Pills -->
        <div class="tech-stack flex flex-wrap justify-center gap-3 mb-12">
          <span
            v-for="(tech, index) in techStack"
            :key="tech"
            class="hero-animate tech-pill px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 hover:scale-110 cursor-default"
            :class="pillClasses"
            :style="{ '--delay': (0.8 + index * 0.05) + 's' }"
          >
            {{ tech }}
          </span>
        </div>

        <!-- CTA Buttons -->
        <div
          class="hero-animate cta-buttons flex flex-col sm:flex-row gap-4 justify-center"
          style="--delay: 1.2s"
        >
          <a
            href="#projects"
            class="btn-primary px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            :class="btnPrimaryClasses"
          >
            <span>VIEW PROJECTS</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </a>
          <a
            href="#contact"
            class="btn-secondary px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            :class="btnSecondaryClasses"
          >
            <span>CONTACT ME</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 hero-animate"
        style="--delay: 1.5s; animation-name: fadeInUpCentered;"
      >
        <div class="flex flex-col items-center gap-2" :class="scrollIndicatorClasses">
          <span class="text-xs font-mono tracking-widest">SCROLL</span>
          <div class="scroll-arrow w-6 h-10 border-2 rounded-full flex justify-center pt-2" :class="scrollArrowBorder">
            <div class="scroll-dot w-1 h-3 rounded-full animate-bounce" :class="scrollDotBg"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section py-32 relative z-10">
      <div class="container mx-auto px-6">
        <div class="scroll-animate max-w-4xl mx-auto">
          <div class="section-header mb-16 text-center">
            <span class="section-number font-mono text-sm" :class="numberClasses">01</span>
            <h2 class="section-title text-5xl md:text-6xl font-black mt-4" :class="sectionTitleClasses">ABOUT</h2>
          </div>

          <div class="about-grid grid md:grid-cols-2 gap-12 items-center">
            <div class="about-visual scroll-animate" :class="visualCardClasses">
              <div class="aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 grid-pattern opacity-10"></div>
                <div
                  ref="droidAvatarRef"
                  class="droid-avatar text-8xl will-change-transform"
                  :style="getAvatarParallaxStyle()"
                >🤖</div>
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="h-2 bg-current rounded-full overflow-hidden">
                    <div class="h-full progress-bar animate-pulse"></div>
                  </div>
                  <p class="text-xs font-mono mt-2 opacity-70">STATUS: OPERATIONAL</p>
                </div>
              </div>
            </div>

            <div class="about-content">
              <p class="about-text text-lg leading-relaxed mb-6" :class="textClasses">
                I'm a Laravel fullstack developer from Malaysia, specializing in building
                <span class="highlight" :class="highlightClasses">robust backend systems</span> and
                <span class="highlight" :class="highlightClasses">interactive frontend experiences</span>.
              </p>
              <p class="about-text text-lg leading-relaxed mb-8" :class="textClasses">
                Currently expanding my expertise in Vue.js, Pinia, Astro, and React to create
                modern, performant web applications with exceptional user experiences.
              </p>
              <a
                href="/about"
                class="about-link inline-flex items-center gap-2 font-mono text-sm transition-all duration-300 hover:gap-4"
                :class="linkClasses"
              >
                <span>LEARN MORE</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills-section py-32 relative z-10">
      <div class="container mx-auto px-6">
        <div class="scroll-animate">
          <div class="section-header mb-16 text-center">
            <span class="section-number font-mono text-sm" :class="numberClasses">02</span>
            <h2 class="section-title text-5xl md:text-6xl font-black mt-4" :class="sectionTitleClasses">SKILLS</h2>
          </div>

          <div class="skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(skillCategory, index) in skillCategories"
              :key="skillCategory.name"
              class="scroll-animate skill-card p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              :class="skillCardClasses"
              :style="{ '--stagger-delay': index * 100 + 'ms' }"
              @mouseenter="activeSkill = skillCategory.name"
              @mouseleave="activeSkill = null"
            >
              <div class="skill-icon text-4xl mb-4">{{ skillCategory.icon }}</div>
              <h3 class="skill-name text-xl font-bold mb-3" :class="cardTitleClasses">{{ skillCategory.name }}</h3>
              <div class="skills-list flex flex-wrap gap-2">
                <span
                  v-for="skill in skillCategory.skills"
                  :key="skill"
                  class="skill-tag px-3 py-1 rounded-full text-sm font-mono"
                  :class="skillTagClasses"
                >
                  {{ skill }}
                </span>
              </div>
              <div class="skill-progress mt-4 h-1 bg-current rounded-full overflow-hidden opacity-20">
                <div
                  class="h-full transition-all duration-1000"
                  :class="skillProgressFillClasses"
                  :style="{ width: skillCategory.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section py-32 relative z-10">
      <div class="container mx-auto px-6">
        <div class="scroll-animate">
          <div class="section-header mb-16 text-center">
            <span class="section-number font-mono text-sm" :class="numberClasses">03</span>
            <h2 class="section-title text-5xl md:text-6xl font-black mt-4" :class="sectionTitleClasses">PROJECTS</h2>
          </div>

          <div class="projects-grid grid md:grid-cols-2 gap-8">
            <div
              v-for="(project, index) in projects"
              :key="project.title"
              class="scroll-animate project-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              :class="projectCardClasses"
              :style="{ '--stagger-delay': index * 150 + 'ms' }"
            >
              <div class="project-image aspect-video flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 project-pattern opacity-10"></div>
                <span class="project-icon text-6xl">{{ project.icon }}</span>
                <div class="absolute top-4 right-4">
                  <span class="status-badge px-3 py-1 rounded-full text-xs font-mono" :class="badgeClasses">
                    {{ project.status }}
                  </span>
                </div>
              </div>
              <div class="project-content p-6">
                <h3 class="project-title text-2xl font-bold mb-2" :class="cardTitleClasses">{{ project.title }}</h3>
                <p class="project-description mb-4" :class="textClasses">{{ project.description }}</p>
                <div class="project-tech flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="px-2 py-1 rounded text-xs font-mono"
                    :class="techTagClasses"
                  >
                    {{ tech }}
                  </span>
                </div>
                <div class="project-links flex gap-4">
                  <a
                    v-if="project.demo"
                    :href="project.demo"
                    class="project-link inline-flex items-center gap-1 text-sm font-mono transition-all duration-300 hover:gap-2"
                    :class="linkClasses"
                  >
                    <span>DEMO</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                  <a
                    v-if="project.github"
                    :href="project.github"
                    class="project-link inline-flex items-center gap-1 text-sm font-mono transition-all duration-300 hover:gap-2"
                    :class="linkClasses"
                  >
                    <span>CODE</span>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section id="blog" class="blog-section py-32 relative z-10">
      <div class="container mx-auto px-6">
        <div class="scroll-animate">
          <div class="section-header mb-16 text-center">
            <span class="section-number font-mono text-sm" :class="numberClasses">04</span>
            <h2 class="section-title text-5xl md:text-6xl font-black mt-4" :class="sectionTitleClasses">BLOG</h2>
          </div>

          <div class="blog-grid grid md:grid-cols-3 gap-6">
            <div
              v-for="(post, index) in blogPosts"
              :key="post.title"
              class="scroll-animate blog-card p-6 rounded-xl transition-all duration-300 hover:scale-105"
              :class="blogCardClasses"
              :style="{ '--stagger-delay': index * 100 + 'ms' }"
            >
              <div class="blog-date text-xs font-mono mb-3 opacity-60">{{ post.date }}</div>
              <h3 class="blog-title text-xl font-bold mb-2" :class="cardTitleClasses">{{ post.title }}</h3>
              <p class="blog-excerpt text-sm mb-4" :class="textClasses">{{ post.excerpt }}</p>
              <div class="blog-tags flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-1 rounded-full text-xs font-mono"
                  :class="tagClasses"
                >
                  #{{ tag }}
                </span>
              </div>
              <a
                :href="post.link"
                class="blog-link inline-flex items-center gap-1 text-sm font-mono transition-all duration-300 hover:gap-2"
                :class="linkClasses"
              >
                <span>READ</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section py-32 relative z-10">
      <div class="container mx-auto px-6">
        <div class="scroll-animate max-w-2xl mx-auto text-center">
          <div class="section-header mb-16">
            <span class="section-number font-mono text-sm" :class="numberClasses">05</span>
            <h2 class="section-title text-5xl md:text-6xl font-black mt-4" :class="sectionTitleClasses">CONTACT</h2>
          </div>

          <p class="contact-text text-lg mb-12" :class="textClasses">
            Ready to collaborate? Let's build something amazing together.
          </p>

          <div class="contact-links flex flex-wrap justify-center gap-6 mb-12">
            <a
              v-for="(link, index) in contactLinks"
              :key="link.name"
              :href="link.url"
              :aria-label="link.name"
              class="scroll-animate contact-link w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              :class="contactLinkClasses"
              :style="{ '--stagger-delay': index * 100 + 'ms' }"
            >
              <span class="text-2xl">{{ link.icon }}</span>
            </a>
          </div>

          <a
            href="mailto:denusklo@gmail.com"
            class="email-btn inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
            :class="btnPrimaryClasses"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>denusklo@gmail.com</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer py-8 relative z-10 border-t" :class="footerClasses">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="footer-text text-sm font-mono" :class="textClasses">
            © 2024 DEN KONG // ALL SYSTEMS OPERATIONAL
          </p>
          <div class="footer-links flex gap-6">
            <a href="#" class="footer-link text-sm font-mono transition-opacity hover:opacity-100" :class="textClasses">
              GITHUB
            </a>
            <a href="#" class="footer-link text-sm font-mono transition-opacity hover:opacity-100" :class="textClasses">
              LINKEDIN
            </a>
            <a href="#" class="footer-link text-sm font-mono transition-opacity hover:opacity-100" :class="textClasses">
              TWITTER
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  greetings: {
    type: Array,
    default: () => []
  }
})

// Theme Selection - Change this to switch between themes: 'cyber-glitch', 'android-material', 'holographic'
const selectedTheme = ref('holographic')

// Parallax State (for particles - mouse movement)
const parallax = ref({ x: 0, y: 0 })

// Scroll Parallax State
const scrollParallax = ref({
  scrollY: 0,
  velocity: 0,
  lastScrollY: 0,
  lastTimestamp: 0
})

// Parallax Settings
const parallaxSettings = {
  gridIntensity: 0.15,      // Grid moves at 15% of scroll speed
  particleIntensity: 0.3,    // Particles move at 30% of scroll speed
  avatarIntensity: 0.25,     // Avatar moves at 25% of scroll speed
  cardIntensity: 0.05,       // Cards move at 5% of scroll speed (subtle)
  scrollSmoothness: 0.08,    // Smooth out scroll velocity changes
  maxVelocity: 15,           // Maximum scroll velocity for dynamic intensity
  isMobile: false,           // Will be set based on device detection
  mobileReduction: 0.4       // Reduce parallax to 40% on mobile
}

// Particles
const particles = ref([])
const particlePositions = ref([])

// Animation frame IDs for cleanup
let animationFrameId = null
let scrollAnimationId = null

// Refs for parallax elements
const gridBgRef = ref(null)
const droidAvatarRef = ref(null)

// Active Skill
const activeSkill = ref(null)

// Time
const currentTime = ref('')

// Tech Stack
const techStack = ['Laravel', 'Vue.js', 'Astro', 'Tailwind', 'Pinia', 'React', 'PHP', 'MySQL']

// Skill Categories
const skillCategories = [
  { name: 'Backend', icon: '⚙️', skills: ['Laravel', 'PHP', 'MySQL', 'REST APIs'], level: 90 },
  { name: 'Frontend', icon: '🎨', skills: ['Vue.js', 'React', 'Tailwind', 'Astro'], level: 85 },
  { name: 'Tools', icon: '🔧', skills: ['Git', 'Docker', 'Webpack', 'Vite'], level: 80 },
  { name: 'State', icon: '📦', skills: ['Pinia', 'Vuex', 'Redux', 'Context'], level: 75 },
  { name: 'Testing', icon: '🧪', skills: ['PHPUnit', 'Vitest', 'Jest', 'Cypress'], level: 70 },
  { name: 'DevOps', icon: '🚀', skills: ['CI/CD', 'Docker', 'Nginx', 'AWS'], level: 65 }
]

// Projects
const projects = [
  {
    title: 'Portfolio v3',
    description: 'Modern portfolio built with Astro, Vue 3, and Tailwind CSS featuring interactive components.',
    icon: '🌐',
    status: 'LIVE',
    tech: ['Astro', 'Vue', 'Tailwind'],
    demo: 'https://denusklo.com',
    github: 'https://github.com/denusklo/portfolio'
  },
  {
    title: 'Task Manager',
    description: 'Full-stack task management application with real-time updates and team collaboration.',
    icon: '✅',
    status: 'BETA',
    tech: ['Laravel', 'Vue', 'MySQL'],
    demo: null,
    github: '#'
  },
  {
    title: 'Weather Dashboard',
    description: 'Weather application with location-based forecasts and interactive maps.',
    icon: '🌤️',
    status: 'LIVE',
    tech: ['React', 'API', 'Chart.js'],
    demo: '#',
    github: '#'
  },
  {
    title: 'E-commerce Platform',
    description: 'Feature-rich online store with cart, checkout, and payment integration.',
    icon: '🛒',
    status: 'DEV',
    tech: ['Laravel', 'Stripe', 'Redis'],
    demo: null,
    github: '#'
  }
]

// Blog Posts
const blogPosts = [
  {
    title: 'Getting Started with Astro',
    excerpt: 'Learn how to build fast, content-focused websites with Astro.',
    date: '2024.01.15',
    tags: ['astro', 'tutorial'],
    link: '/blog/getting-started-with-astro'
  },
  {
    title: 'Vue 3 Composition API Guide',
    excerpt: 'Master the Composition API and build better Vue applications.',
    date: '2024.01.10',
    tags: ['vue', 'javascript'],
    link: '/blog/vue3-composition-api'
  },
  {
    title: 'Laravel Best Practices',
    excerpt: 'Essential tips and patterns for building scalable Laravel applications.',
    date: '2024.01.05',
    tags: ['laravel', 'php'],
    link: '/blog/laravel-best-practices'
  }
]

// Contact Links
const contactLinks = [
  { name: 'GitHub', url: 'https://github.com/denusklo', icon: '📦' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/denusklo', icon: '💼' },
  { name: 'Twitter', url: 'https://twitter.com/denusklo', icon: '🐦' },
  { name: 'Email', url: 'mailto:denusklo@gmail.com', icon: '✉️' }
]

// Methods
const handleMouseMove = (e) => {
  parallax.value = {
    x: (e.clientX - window.innerWidth / 2) / 50,
    y: (e.clientY - window.innerHeight / 2) / 50
  }
}

// Detect if device is mobile (touch device)
const detectMobile = () => {
  parallaxSettings.isMobile = window.innerWidth < 768 || 'ontouchstart' in window
}

// Handle scroll event with throttling and velocity calculation
const handleScroll = () => {
  const currentScrollY = window.scrollY
  const currentTime = Date.now()
  const deltaTime = currentTime - scrollParallax.value.lastTimestamp

  // Calculate scroll velocity (pixels per millisecond, scaled up)
  if (deltaTime > 0) {
    const deltaScroll = Math.abs(currentScrollY - scrollParallax.value.lastScrollY)
    scrollParallax.value.velocity = Math.min(
      deltaScroll / deltaTime * 10,
      parallaxSettings.maxVelocity
    )
  }

  scrollParallax.value.scrollY = currentScrollY
  scrollParallax.value.lastScrollY = currentScrollY
  scrollParallax.value.lastTimestamp = currentTime

  // Smooth out velocity over time (decay)
  if (scrollAnimationId) {
    cancelAnimationFrame(scrollAnimationId)
  }

  const decayVelocity = () => {
    scrollParallax.value.velocity *= (1 - parallaxSettings.scrollSmoothness)

    // Stop decay when velocity is very low
    if (scrollParallax.value.velocity > 0.1) {
      scrollAnimationId = requestAnimationFrame(decayVelocity)
    }
  }

  scrollAnimationId = requestAnimationFrame(decayVelocity)
}

// Calculate parallax intensity multiplier based on scroll velocity
const getIntensityMultiplier = () => {
  const baseIntensity = parallaxSettings.isMobile
    ? parallaxSettings.mobileReduction
    : 1

  // Add velocity bonus (faster scroll = slightly more parallax)
  const velocityBonus = Math.min(scrollParallax.value.velocity / parallaxSettings.maxVelocity, 1) * 0.3

  return baseIntensity + velocityBonus
}

// Get grid background parallax style (moves slower than scroll for depth)
const getGridParallaxStyle = () => {
  const intensity = getIntensityMultiplier()
  const offset = scrollParallax.value.scrollY * parallaxSettings.gridIntensity * intensity

  return {
    transform: `translate3d(0, ${offset}px, 0)`
  }
}

// Get avatar parallax style (moves at different speed than scroll)
const getAvatarParallaxStyle = () => {
  const intensity = getIntensityMultiplier()
  const offset = scrollParallax.value.scrollY * parallaxSettings.avatarIntensity * intensity

  // Also add subtle mouse parallax
  const mouseOffset = parallax.value.y * 2

  return {
    transform: `translate3d(0, ${offset + mouseOffset}px, 0)`
  }
}

// Get section element parallax style for cards
const getCardParallaxStyle = (index) => {
  const intensity = getIntensityMultiplier()
  const offset = scrollParallax.value.scrollY * parallaxSettings.cardIntensity * intensity

  // Stagger the offset slightly based on index for depth layering
  const staggerOffset = index * 0.5

  return {
    transform: `translate3d(0, ${offset + staggerOffset}px, 0)`
  }
}

const getParticleStyle = (particle, index) => {
  const pos = particlePositions.value[index] || { x: particle.x, y: particle.y }
  const intensity = getIntensityMultiplier()

  // Mouse parallax
  const mouseOffsetX = parallax.value.x * particle.speed
  const mouseOffsetY = parallax.value.y * particle.speed

  // Scroll parallax - particles move at different rates based on their speed
  const scrollOffsetY = scrollParallax.value.scrollY * parallaxSettings.particleIntensity * particle.speed * intensity * 0.1

  return {
    left: pos.x + '%',
    top: pos.y + '%',
    width: particle.size + 'px',
    height: particle.size + 'px',
    background: particle.color,
    transform: `translate3d(${mouseOffsetX}px, ${mouseOffsetY + scrollOffsetY}px, 0)`,
    transition: 'transform 0.3s ease-out',
    willChange: 'transform'
  }
}

const animateParticles = () => {
  const time = Date.now() * 0.0005

  particlePositions.value = particles.value.map((particle, i) => {
    const offsetX = Math.sin(time + i * 0.5) * particle.speed * 2
    const offsetY = Math.cos(time + i * 0.3) * particle.speed * 2
    return {
      x: Math.max(0, Math.min(100, particle.x + offsetX)),
      y: Math.max(0, Math.min(100, particle.y + offsetY))
    }
  })

  animationFrameId = requestAnimationFrame(animateParticles)
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour12: false })
}

const initParticles = () => {
  const colors = {
    'holographic': '#a855f7',
    'cyber-glitch': '#22d3ee',
    'android-material': '#f97316'
  }

  particles.value = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 2 + 0.5,
    color: colors[selectedTheme.value] || '#a855f7'
  }))
}

// Theme Classes
const themeClasses = computed(() => {
  const themes = {
    'cyber-glitch': 'theme-cyber-glitch bg-black text-white',
    'android-material': 'theme-android-material bg-zinc-900 text-white',
    'holographic': 'theme-holographic bg-slate-950 text-white'
  }
  return themes[selectedTheme.value] || themes['holographic']
})

// Badge Classes
const badgeClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    'android-material': 'bg-orange-500/10 text-orange-400 border border-orange-500/30',
    'holographic': 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
  }
  return classes[selectedTheme.value]
})

// Title Classes
const titleClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-white',
    'android-material': 'text-white',
    'holographic': 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
  }
  return classes[selectedTheme.value]
})

// Subtitle Classes
const subtitleClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-cyan-400',
    'android-material': 'text-orange-400',
    'holographic': 'text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Pill Classes
const pillClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20',
    'android-material': 'bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20',
    'holographic': 'bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20'
  }
  return classes[selectedTheme.value]
})

// Button Primary Classes
const btnPrimaryClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]',
    'android-material': 'bg-orange-500 text-black hover:bg-orange-400 hover:shadow-lg',
    'holographic': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
  }
  return classes[selectedTheme.value]
})

// Button Secondary Classes
const btnSecondaryClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-transparent text-cyan-400 border-2 border-cyan-500 hover:bg-cyan-500/10',
    'android-material': 'bg-transparent text-orange-400 border-2 border-orange-500 hover:bg-orange-500/10',
    'holographic': 'bg-transparent text-purple-400 border-2 border-purple-500 hover:bg-purple-500/10'
  }
  return classes[selectedTheme.value]
})

// Scroll Indicator Classes
const scrollIndicatorClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-cyan-400',
    'android-material': 'text-orange-400',
    'holographic': 'text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Scroll Arrow Border
const scrollArrowBorder = computed(() => {
  const classes = {
    'cyber-glitch': 'border-cyan-400',
    'android-material': 'border-orange-400',
    'holographic': 'border-purple-400'
  }
  return classes[selectedTheme.value]
})

// Scroll Dot Background
const scrollDotBg = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-400',
    'android-material': 'bg-orange-400',
    'holographic': 'bg-purple-400'
  }
  return classes[selectedTheme.value]
})

// Section Number Classes
const numberClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-cyan-400',
    'android-material': 'text-orange-400',
    'holographic': 'text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Section Title Classes
const sectionTitleClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-white',
    'android-material': 'text-white',
    'holographic': 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
  }
  return classes[selectedTheme.value]
})

// Visual Card Classes
const visualCardClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-zinc-900 border border-cyan-500/30',
    'android-material': 'bg-zinc-800 border border-orange-500/30',
    'holographic': 'bg-slate-900/50 backdrop-blur border border-purple-500/30'
  }
  return classes[selectedTheme.value]
})

// Text Classes
const textClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-zinc-300',
    'android-material': 'text-zinc-300',
    'holographic': 'text-slate-300'
  }
  return classes[selectedTheme.value]
})

// Highlight Classes
const highlightClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-cyan-400',
    'android-material': 'text-orange-400',
    'holographic': 'text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Link Classes
const linkClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-cyan-400',
    'android-material': 'text-orange-400',
    'holographic': 'text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Skill Card Classes
const skillCardClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-zinc-900/80 border border-cyan-500/20 hover:border-cyan-500/50',
    'android-material': 'bg-zinc-800/80 border border-orange-500/20 hover:border-orange-500/50 hover:shadow-lg',
    'holographic': 'bg-slate-900/50 backdrop-blur border border-purple-500/20 hover:border-purple-500/50'
  }
  return classes[selectedTheme.value]
})

// Card Title Classes
const cardTitleClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'text-white',
    'android-material': 'text-white',
    'holographic': 'text-white'
  }
  return classes[selectedTheme.value]
})

// Skill Tag Classes
const skillTagClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-500/10 text-cyan-400',
    'android-material': 'bg-orange-500/10 text-orange-400',
    'holographic': 'bg-purple-500/10 text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Skill Progress Fill Classes
const skillProgressFillClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-500',
    'android-material': 'bg-orange-500',
    'holographic': 'bg-purple-500'
  }
  return classes[selectedTheme.value]
})

// Project Card Classes
const projectCardClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-zinc-900 border border-cyan-500/20 hover:border-cyan-500/50',
    'android-material': 'bg-zinc-800 border border-orange-500/20 hover:border-orange-500/50 hover:shadow-xl',
    'holographic': 'bg-slate-900/50 backdrop-blur border border-purple-500/20 hover:border-purple-500/50'
  }
  return classes[selectedTheme.value]
})

// Tech Tag Classes
const techTagClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-500/10 text-cyan-400',
    'android-material': 'bg-orange-500/10 text-orange-400',
    'holographic': 'bg-purple-500/10 text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Blog Card Classes
const blogCardClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-zinc-900/60 border border-cyan-500/20 hover:border-cyan-500/50',
    'android-material': 'bg-zinc-800/60 border border-orange-500/20 hover:border-orange-500/50 hover:shadow-lg',
    'holographic': 'bg-slate-900/50 backdrop-blur border border-purple-500/20 hover:border-purple-500/50'
  }
  return classes[selectedTheme.value]
})

// Tag Classes
const tagClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-cyan-500/10 text-cyan-400',
    'android-material': 'bg-orange-500/10 text-orange-400',
    'holographic': 'bg-purple-500/10 text-purple-400'
  }
  return classes[selectedTheme.value]
})

// Contact Link Classes
const contactLinkClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'bg-zinc-900 border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/60',
    'android-material': 'bg-zinc-800 border border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/60 hover:shadow-lg',
    'holographic': 'bg-slate-900/50 backdrop-blur border border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/60'
  }
  return classes[selectedTheme.value]
})

// Footer Classes
const footerClasses = computed(() => {
  const classes = {
    'cyber-glitch': 'border-cyan-500/20',
    'android-material': 'border-orange-500/20',
    'holographic': 'border-purple-500/20'
  }
  return classes[selectedTheme.value]
})

// Initialize scroll animations on mount
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  initParticles()
  animateParticles()
  detectMobile()

  // Set up scroll parallax
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Set up Intersection Observer for scroll animations
  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          // Get the stagger delay from CSS custom property
          const staggerDelay = parseFloat(el.style.getPropertyValue('--stagger-delay')) || 0

          // Use requestAnimationFrame to ensure transition is applied
          requestAnimationFrame(() => {
            setTimeout(() => {
              el.classList.add('is-visible')
            }, staggerDelay)
          })

          observer.unobserve(el)
        }
      })
    }, observerOptions)

    // Observe all elements with scroll-animate class
    // Use setTimeout to ensure CSS has been fully applied and initial state is set
    setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el)
      })
    }, 50)
  }

  // Initialize scroll animations
  initScrollAnimations()

  // Handle resize to update mobile detection
  window.addEventListener('resize', detectMobile, { passive: true })
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (scrollAnimationId) {
    cancelAnimationFrame(scrollAnimationId)
  }
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', detectMobile)
})
</script>

<style>
/* Global styles for DroidLanding component - scoped not needed for client:load components */
.droid-landing {
  font-family: 'Work Sans', sans-serif;
}

/* Hero Animation (on page load) - always applied to avoid hydration mismatch */
.hero-animate {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: var(--delay);
  will-change: opacity, transform;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUpCentered {
  from {
    opacity: 0;
    transform: translate(-50%, 30px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* Scroll Animation (triggered by scroll) */
.scroll-animate {
  opacity: 0 !important;
  transform: translateY(30px) !important;
  transition: opacity 0.8s ease-out, transform 0.8s ease-out !important;
  will-change: opacity, transform;
}

.scroll-animate.is-visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Grid Background */
.grid-bg {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.theme-android-material .grid-bg {
  background-image:
    linear-gradient(rgba(249, 115, 22, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 115, 22, 0.05) 1px, transparent 1px);
}

/* Glitch Effect for Cyber Glitch Theme */
.theme-cyber-glitch .glitch-wrapper {
  position: relative;
  animation: glitch 3s infinite;
}

.theme-cyber-glitch .glitch-wrapper::before,
.theme-cyber-glitch .glitch-wrapper::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.theme-cyber-glitch .glitch-wrapper::before {
  left: 2px;
  text-shadow: -2px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.theme-cyber-glitch .glitch-wrapper::after {
  left: -2px;
  text-shadow: -2px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch {
  2%, 64% { transform: translate(2px, 0) skew(0deg); }
  4%, 60% { transform: translate(-2px, 0) skew(0deg); }
  62% { transform: translate(0, 0) skew(5deg); }
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 94px, 0); }
  5% { clip: rect(70px, 9999px, 11px, 0); }
  10% { clip: rect(26px, 9999px, 94px, 0); }
  15% { clip: rect(93px, 9999px, 17px, 0); }
  20% { clip: rect(54px, 9999px, 49px, 0); }
  25% { clip: rect(12px, 9999px, 63px, 0); }
  30% { clip: rect(87px, 9999px, 35px, 0); }
  35% { clip: rect(41px, 9999px, 78px, 0); }
  40% { clip: rect(6px, 9999px, 22px, 0); }
  45% { clip: rect(69px, 9999px, 51px, 0); }
  50% { clip: rect(18px, 9999px, 82px, 0); }
  55% { clip: rect(83px, 9999px, 29px, 0); }
  60% { clip: rect(37px, 9999px, 65px, 0); }
  65% { clip: rect(72px, 9999px, 14px, 0); }
  70% { clip: rect(9px, 9999px, 96px, 0); }
  75% { clip: rect(58px, 9999px, 43px, 0); }
  80% { clip: rect(24px, 9999px, 77px, 0); }
  85% { clip: rect(81px, 9999px, 38px, 0); }
  90% { clip: rect(15px, 9999px, 59px, 0); }
  95% { clip: rect(66px, 9999px, 27px, 0); }
  100% { clip: rect(45px, 9999px, 88px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 99px, 0); }
  5% { clip: rect(28px, 9999px, 42px, 0); }
  10% { clip: rect(79px, 9999px, 15px, 0); }
  15% { clip: rect(36px, 9999px, 73px, 0); }
  20% { clip: rect(54px, 9999px, 87px, 0); }
  25% { clip: rect(11px, 9999px, 31px, 0); }
  30% { clip: rect(68px, 9999px, 58px, 0); }
  35% { clip: rect(89px, 9999px, 24px, 0); }
  40% { clip: rect(43px, 9999px, 76px, 0); }
  45% { clip: rect(7px, 9999px, 52px, 0); }
  50% { clip: rect(72px, 9999px, 19px, 0); }
  55% { clip: rect(34px, 9999px, 85px, 0); }
  60% { clip: rect(91px, 9999px, 48px, 0); }
  65% { clip: rect(22px, 9999px, 66px, 0); }
  70% { clip: rect(57px, 9999px, 13px, 0); }
  75% { clip: rect(84px, 9999px, 39px, 0); }
  80% { clip: rect(16px, 9999px, 71px, 0); }
  85% { clip: rect(63px, 9999px, 94px, 0); }
  90% { clip: rect(29px, 9999px, 57px, 0); }
  95% { clip: rect(78px, 9999px, 26px, 0); }
  100% { clip: rect(51px, 9999px, 82px, 0); }
}

/* Progress Bar Animation */
.progress-bar {
  animation: progressFill 2s ease-out forwards;
}

.theme-cyber-glitch .progress-bar {
  background: linear-gradient(90deg, #22d3ee, #06b6d4);
}

.theme-android-material .progress-bar {
  background: linear-gradient(90deg, #f97316, #ea580c);
}

.theme-holographic .progress-bar {
  background: linear-gradient(90deg, #a855f7, #ec4899);
}

@keyframes progressFill {
  from { width: 0; }
}

/* Grid Pattern */
.grid-pattern {
  background-image:
    radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Project Pattern */
.project-pattern {
  background-image:
    linear-gradient(45deg, currentColor 25%, transparent 25%),
    linear-gradient(-45deg, currentColor 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, currentColor 75%),
    linear-gradient(-45deg, transparent 75%, currentColor 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

/* Hover Effects */
.theme-android-material .skill-card:hover,
.theme-android-material .project-card:hover {
  box-shadow: 0 10px 40px rgba(249, 115, 22, 0.2);
}

.theme-holographic .skill-card:hover,
.theme-holographic .project-card:hover {
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.2);
}

/* Status Dot Pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-dot {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.theme-cyber-glitch .status-dot {
  background: #22d3ee;
  box-shadow: 0 0 10px #22d3ee;
}

.theme-android-material .status-dot {
  background: #f97316;
  box-shadow: 0 0 10px #f97316;
}

.theme-holographic .status-dot {
  background: #a855f7;
  box-shadow: 0 0 10px #a855f7;
}

/* Footer Link Hover */
.footer-link {
  position: relative;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.footer-link:hover::after {
  width: 100%;
}

/* Droid Avatar */
.droid-avatar {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Smooth Transitions */
* {
  transition-property: color, background-color, border-color;
  transition-timing-function: ease-out;
  transition-duration: 200ms;
}

/* Disable transition on theme change */
.droid-landing[class*="theme-"] * {
  transition: inherit;
}

/* Parallax Performance Optimizations */
.will-change-transform {
  will-change: transform;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .will-change-transform {
    will-change: auto;
  }

  .grid-bg,
  .droid-avatar,
  .particle {
    transition: none !important;
  }
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .grid-bg {
    /* Reduce parallax calculations on mobile */
    transform: translate3d(0, 0, 0) !important;
  }
}
</style>
