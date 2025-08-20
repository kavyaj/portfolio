import { useEffect, useState } from 'react'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Initialize smooth scrolling and other effects
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute('href') || '')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/KJ_logo.svg" alt="KJ Logo" className="h-8 w-8" />
              <span className="ml-2 font-dm-sans font-semibold text-lg">Kavya Jahagirdar</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="link-primary">About</a>
              <a href="#projects" className="link-primary">Projects</a>
              <a href="#experience" className="link-primary">Experience</a>
              <a href="#contact" className="link-primary">Contact</a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              data-testid="button-mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <a href="#about" className="link-primary py-2">About</a>
                <a href="#projects" className="link-primary py-2">Projects</a>
                <a href="#experience" className="link-primary py-2">Experience</a>
                <a href="#contact" className="link-primary py-2">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="display-heading-large mb-6">
                Building is my craft, storytelling is my passion
              </h1>
              <p className="tagline mb-8 max-w-2xl">
                I'm Kavya Jahagirdar, a product designer and developer who creates meaningful digital experiences 
                that bridge the gap between beautiful design and functional technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#about" 
                  className="bg-primary-pink text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  data-testid="button-about-me"
                >
                  About me
                </a>
                <a 
                  href="#projects" 
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors"
                  data-testid="button-view-projects"
                >
                  View Projects
                </a>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <img 
                src="/Kavya-Photo.webp" 
                alt="Kavya Jahagirdar" 
                className="w-full h-auto rounded-2xl shadow-lg"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="display-heading-medium mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="content-heading-large mb-4">My Approach</h3>
              <p className="body-text mb-6">
                I believe in creating digital experiences that not only look beautiful but also solve real problems. 
                My background in both design and development allows me to bridge the gap between creativity and functionality.
              </p>
              <p className="body-text">
                With experience in product design, frontend development, and user research, I bring a holistic 
                approach to every project I work on.
              </p>
            </div>
            <div>
              <h3 className="content-heading-large mb-4">Work Allocation</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="body-text">Product Design</span>
                    <span className="body-text-small">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-pink h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="body-text">Development</span>
                    <span className="body-text-small">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-pink h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="body-text">Strategy & Research</span>
                    <span className="body-text-small">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-pink h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="display-heading-medium mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Logo Design', description: 'Brand identity and visual design systems' },
              { title: 'Career Story', description: 'Interactive career journey platform' },
              { title: 'The Brave Rocketeers', description: 'Educational platform for space exploration' },
              { title: 'Resumey.Pro', description: 'Professional resume building tool' }
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                data-testid={`card-project-${index}`}
              >
                <h3 className="content-heading-large mb-2">{project.title}</h3>
                <p className="body-text-small">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="display-heading-medium mb-12 text-center">Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                role: 'Senior Product Designer',
                company: 'Tech Startup',
                period: '2022 - Present',
                description: 'Leading design for B2B SaaS platform with focus on user experience and conversion optimization.'
              },
              {
                role: 'Frontend Developer',
                company: 'Digital Agency',
                period: '2020 - 2022',
                description: 'Developed responsive web applications using React, TypeScript, and modern frontend technologies.'
              },
              {
                role: 'UX Designer',
                company: 'E-commerce Company',
                period: '2019 - 2020',
                description: 'Designed user-centered solutions for e-commerce platform, improving conversion rates by 25%.'
              },
              {
                role: 'Junior Designer',
                company: 'Design Studio',
                period: '2018 - 2019',
                description: 'Created visual designs for various clients across different industries and platforms.'
              }
            ].map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm" data-testid={`card-experience-${index}`}>
                <h3 className="content-heading-large mb-1">{job.role}</h3>
                <p className="primary-pink font-medium mb-2">{job.company}</p>
                <p className="body-text-small mb-3">{job.period}</p>
                <p className="body-text">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="display-heading-medium mb-8">Let's Connect</h2>
          <p className="tagline mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. 
            Feel free to reach out if you'd like to work together.
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://linkedin.com/in/kavyajahagirdar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-pink hover:text-white transition-colors"
              data-testid="link-linkedin"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/kavyajahagirdar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-pink hover:text-white transition-colors"
              data-testid="link-twitter"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <img src="/Primary - Kavya Logo.webp" alt="Kavya Logo" className="h-12 opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          <p className="body-text-small text-gray-400">
            © 2024 Kavya Jahagirdar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}