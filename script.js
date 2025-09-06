// Countdown Timer for Padel For Ukraine Tournament
// Tournament Date: October 24, 2025

function updateCountdown() {
  const tournamentDate = new Date('2025-10-24T09:00:00').getTime()
  const now = new Date().getTime()
  const distance = tournamentDate - now

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  // Update DOM elements
  document.getElementById('days').textContent = days.toString().padStart(2, '0')
  document.getElementById('hours').textContent = hours
    .toString()
    .padStart(2, '0')
  document.getElementById('minutes').textContent = minutes
    .toString()
    .padStart(2, '0')
  document.getElementById('seconds').textContent = seconds
    .toString()
    .padStart(2, '0')

  // If tournament has started
  if (distance < 0) {
    document.getElementById('days').textContent = '00'
    document.getElementById('hours').textContent = '00'
    document.getElementById('minutes').textContent = '00'
    document.getElementById('seconds').textContent = '00'
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000)

// Initial call to avoid delay
updateCountdown()

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
    })
  })

  // Enhanced CTA button effects
  const ctaButtons = document.querySelectorAll('.cta-button')
  ctaButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Add a temporary click effect
      this.style.transform = 'scale(0.95)'
      setTimeout(() => {
        this.style.transform = 'scale(1)'
      }, 150)
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar')
  let lastScrollTop = 0
  let ticking = false

  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)'
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)'
      navbar.style.boxShadow = 'none'
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)'
    } else {
      navbar.style.transform = 'translateY(0)'
    }

    lastScrollTop = scrollTop
    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar)
      ticking = true
    }
  })

  // Add navbar transition
  navbar.style.transition = 'all 0.3s ease'

  // Add click handler for email text to copy
  const contactEmail = document.getElementById('contact-email')
  if (contactEmail) {
    contactEmail.addEventListener('click', function () {
      copyToClipboard('contact-email')
    })
  }
})

// Copy to clipboard functionality
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId)
  const text = element.textContent

  // Use the modern clipboard API if available
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showCopyFeedback(elementId)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
        fallbackCopyTextToClipboard(text, elementId)
      })
  } else {
    // Fallback for older browsers or non-secure contexts
    fallbackCopyTextToClipboard(text, elementId)
  }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, elementId) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    if (successful) {
      showCopyFeedback(elementId)
    } else {
      console.error('Fallback: Copy command was unsuccessful')
    }
  } catch (err) {
    console.error('Fallback: Unable to copy', err)
  }

  document.body.removeChild(textArea)
}

// Show visual feedback when text is copied
function showCopyFeedback(elementId) {
  const button = document.querySelector(
    `button[onclick="copyToClipboard('${elementId}')"]`
  )
  const originalContent = button.innerHTML

  // Change button content to show checkmark
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
  `
  button.style.background = '#28a745'

  // Reset after 2 seconds
  setTimeout(() => {
    button.innerHTML = originalContent
    button.style.background = '#0000cc'
  }, 2000)
}
