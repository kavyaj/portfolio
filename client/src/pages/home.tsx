import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animateProgressBars = () => {
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const width = (bar as HTMLElement).dataset.width;
          (bar as HTMLElement).style.width = '0%';
          setTimeout(() => {
            (bar as HTMLElement).style.width = width + '%';
          }, 100);
        }
      });
    };

    const handleScroll = () => {
      if (!hasAnimated) {
        animateProgressBars();
        setHasAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo - form submission would be implemented here.');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-kavya-white text-kavya-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('home')} 
              className="nav-brand"
              data-testid="nav-logo"
            >
              KAVYA
            </button>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')} 
                className="nav-link"
                data-testid="nav-about"
              >
                ABOUT
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="nav-link"
                data-testid="nav-projects"
              >
                PROJECTS
              </button>
              <button 
                onClick={() => scrollToSection('experience')} 
                className="nav-link"
                data-testid="nav-experience"
              >
                EXPERIENCE
              </button>
              <button 
                onClick={() => scrollToSection('education')} 
                className="nav-link"
                data-testid="nav-education"
              >
                EDUCATION
              </button>
              <button 
                onClick={() => scrollToSection('writing')} 
                className="nav-link"
                data-testid="nav-writing"
              >
                WRITING
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="nav-link"
                data-testid="nav-contact"
              >
                CONTACT
              </button>
            </div>
            <button className="md:hidden" data-testid="nav-mobile-menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <p className="hero-tagline mb-8 tracking-wide" data-testid="hero-tagline">
            CRAFTINGDIGITALGOODSSINCE—Y:2019
          </p>
          
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src="https://pixabay.com/get/ga3d59cfa2160bfa914157cf165edad609135705b3f146df53645fe794e4d757741653d81151d0b115f19aff2bd6385850de444ec8aaa4dc60d8de21885871c37_1280.jpg" 
              alt="Kavya Jahagirdar" 
              className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-gray-100"
              data-testid="hero-image"
            />
          </div>
          
          <h1 data-testid="hero-name">
            KAVYA<br />
            JAHAGIRDAR
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed" data-testid="hero-description">
            I'm Kavya Jahagirdar — I live in Singapore and spend my time between building{' '}
            <a href="https://resumey.pro/" className="underline hover:no-underline" target="_blank" data-testid="link-resumey">
              Resumey.Pro
            </a>
            , raising a curious toddler, and writing things that matter. I'm drawn to simplicity, storytelling, and purposeful work.
          </p>
          
          <div className="flex flex-col items-center">
            <p className="text-sm mb-4 font-mono">SCROLL</p>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title" data-testid="about-title">ABOUT</h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p data-testid="about-intro">
              My enthusiasm lies in ideation and execution, constantly seeking new avenues to create value and express creativity.
            </p>
            
            <p data-testid="about-education">
              I hold a Bachelor of Engineering from{' '}
              <a href="https://www.ntu.edu.sg/" className="underline hover:no-underline" target="_blank" data-testid="link-ntu">
                Nanyang Technological University
              </a>
              , Singapore. I love building products and scaling them. My past experiences at early stage start-ups and now, co-founding one has helped me add value across different areas - marketing, product development and design.
            </p>
            
            <p>Here's how I typically spend my time at work:</p>
          </div>
          
          <div className="mt-12 space-y-8">
            <div data-testid="skill-marketing">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Marketing</h4>
                <span className="allocation-percentage">50%</span>
              </div>
              <p className="text-gray-600 mb-3">SEO, Social Media, Email Outreach</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="progress-bar bg-black h-2 rounded-full transition-all duration-700 ease-in-out" style={{width: '0%'}} data-width="50"></div>
              </div>
            </div>
            
            <div data-testid="skill-business">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">New Business Ideas</h4>
                <span className="allocation-percentage">30%</span>
              </div>
              <p className="text-gray-600 mb-3">Finding different and lucrative problems to solve</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="progress-bar bg-black h-2 rounded-full transition-all duration-700 ease-in-out" style={{width: '0%'}} data-width="30"></div>
              </div>
            </div>
            
            <div data-testid="skill-learning">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Learning & Writing</h4>
                <span className="allocation-percentage">20%</span>
              </div>
              <p className="text-gray-600 mb-3">Keeping up with the changes in the industry and upskilling</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="progress-bar bg-black h-2 rounded-full transition-all duration-700 ease-in-out" style={{width: '0%'}} data-width="20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title" data-testid="projects-title">PROJECTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="project-card bg-white rounded-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300" data-testid="project-logo-design">
              <img 
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Logo Design Project" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Logo Design</h3>
              </div>
            </Card>
            
            <Card className="project-card bg-white rounded-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300" data-testid="project-career-story">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Career Story Project" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Career Story</h3>
              </div>
            </Card>
            
            <Card className="project-card bg-white rounded-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300" data-testid="project-brave-rocketeers">
              <img 
                src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="The Brave Rocketeers Project" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">The Brave Rocketeers</h3>
              </div>
            </Card>
            
            <Card className="project-card bg-white rounded-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300" data-testid="project-resumey">
              <img 
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Resumey.Pro Project" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Resumey.Pro</h3>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title" data-testid="experience-title">EXPERIENCE</h2>
          
          <div className="space-y-12">
            <div className="border-l-2 border-gray-200 pl-6" data-testid="job-resumey">
              <h3 className="job-title">Co-founder, Marketing</h3>
              <p className="job-company mb-2">Resumey.Pro | Singapore</p>
              <p className="job-period mb-4">2021 — Present</p>
              <p>Working on everything related to marketing and revenue generation. Also ideating new avenues for business growth.</p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6" data-testid="job-enabling">
              <h3 className="text-xl font-bold mb-2">Marketing & Product Manager</h3>
              <p className="text-gray-600 mb-2">Enabling.Win | Singapore</p>
              <p className="text-sm text-gray-500 mb-4">2018 — 2021</p>
              <p>Collaborated with the tech team to design, develop, test and implement features for My.Win app. Ideated, organized and marketed 10 webinars for food industry specialists as a marketing channel for the app.</p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6" data-testid="job-jpmorgan">
              <h3 className="text-xl font-bold mb-2">Instrument Reference Data Analyst</h3>
              <p className="text-gray-600 mb-2">J.P. Morgan | Singapore</p>
              <p className="text-sm text-gray-500 mb-4">2016 — 2018</p>
              <p>Contributed to projects involving Fixed Income and Equities data for process improvement and strategic change implementation in collaboration with business stakeholders and technology teams.</p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6" data-testid="job-commerzbank">
              <h3 className="text-xl font-bold mb-2">Trader Assistant, EMTN Private Placement</h3>
              <p className="text-gray-600 mb-2">Commerzbank | Singapore</p>
              <p className="text-sm text-gray-500 mb-4">2014 — 2016</p>
              <p>Worked on advisory, pricing and execution of notes for short-term funding for banks and supranational financial institutions based in Asia.</p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6" data-testid="job-credit-suisse">
              <h3 className="text-xl font-bold mb-2">Summer Analyst (eFX- IT)</h3>
              <p className="text-gray-600 mb-2">Credit Suisse | Singapore</p>
              <p className="text-sm text-gray-500 mb-4">May 2013 — Jul 2013</p>
              <p>Gained exposure to technology within financial services, enhancing technical understanding of eFX applications.</p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6" data-testid="job-frost-sullivan">
              <h3 className="text-xl font-bold mb-2">Intern Analyst</h3>
              <p className="text-gray-600 mb-2">Frost & Sullivan | Singapore</p>
              <p className="text-sm text-gray-500 mb-4">Jul 2012 — Dec 2012</p>
              <p>Identified and validated market potentials of research findings in topics ranging from geology to economic liberalization.</p>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-projects">
              <h3 className="stat-number mb-2">380+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div data-testid="stat-clients">
              <h3 className="stat-number mb-2">420+</h3>
              <p className="text-gray-600">Satisfied Clients</p>
            </div>
            <div data-testid="stat-reviews">
              <h3 className="stat-number mb-2">2K+</h3>
              <p className="text-gray-600">Positive Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Scrolling Banner */}
      <section className="py-12 bg-black text-white overflow-hidden">
        <div className="scrolling-banner">
          <div className="scrolling-content animate-scroll flex whitespace-nowrap">
            <div className="pr-8 font-bold text-xl md:text-2xl">CURIOSITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">EMPATHY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">CREATIVITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">ANALYTICAL</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">CURIOSITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">EMPATHY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">CREATIVITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">ANALYTICAL</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">CURIOSITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">EMPATHY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">CREATIVITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">ANALYTICAL</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">CURIOSITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">EMPATHY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">CREATIVITY</div>
            <div className="pr-8 font-bold text-xl md:text-2xl">ANALYTICAL</div>
          </div>
        </div>
        <div className="text-center mt-8">
          <h3 className="text-lg font-semibold">At the heart of my work</h3>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" data-testid="education-title">EDUCATION</h2>
          
          <div className="space-y-8">
            <Card className="bg-white p-8 rounded-lg" data-testid="education-ntu">
              <h3 className="text-xl font-bold mb-2">Bachelor of Engineering</h3>
              <p className="text-gray-600 mb-2">Nanyang Technological University</p>
              <p className="text-sm text-gray-500 mb-4">2010 — 2014</p>
              <p>Majored in Electrical & Electronic Engineering with a minor in Entrepreneurship. Loved (almost) every bit of it!</p>
            </Card>
            
            <Card className="bg-white p-8 rounded-lg" data-testid="education-cfa">
              <h3 className="text-xl font-bold mb-2">Chartered Financial Analyst (CFA) Level 1</h3>
              <p className="text-gray-600 mb-2">CFA Institute</p>
              <p className="text-sm text-gray-500 mb-4">Dec 2015</p>
              <p>Passed Level 1 examination. Liked it (kind of) but not enough to keep going.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section id="writing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" data-testid="writing-title">WRITING</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow" data-testid="article-abstract">
              <h3 className="font-bold text-lg mb-2">Abstract concept in design</h3>
              <p className="text-sm text-gray-500 mb-2">May 28, 2025</p>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">DESIGN</span>
            </article>
            
            <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow" data-testid="article-illustration">
              <h3 className="font-bold text-lg mb-2">Our illustration process</h3>
              <p className="text-sm text-gray-500 mb-2">May 20, 2025</p>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">ART</span>
            </article>
            
            <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow" data-testid="article-animation">
              <h3 className="font-bold text-lg mb-2">Animation in web design</h3>
              <p className="text-sm text-gray-500 mb-2">Apr 14, 2025</p>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">DESIGN</span>
            </article>
            
            <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow" data-testid="article-color">
              <h3 className="font-bold text-lg mb-2">Color theory in design</h3>
              <p className="text-sm text-gray-500 mb-2">Mar 12, 2025</p>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">DESIGN</span>
            </article>
            
            <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow" data-testid="article-sandwiches">
              <h3 className="font-bold text-lg mb-2">Sandwiches and lemon juice</h3>
              <p className="text-sm text-gray-500 mb-2">Feb 20, 2025</p>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">FOOD</span>
            </article>
          </div>
          
          {/* Personal Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-human">
              <h3 className="text-4xl font-bold mb-2">1</h3>
              <p className="text-gray-600">Human Created</p>
            </div>
            <div data-testid="stat-life">
              <h3 className="text-4xl font-bold mb-2">38%</h3>
              <p className="text-gray-600">Life Experienced</p>
            </div>
            <div data-testid="stat-languages">
              <h3 className="text-4xl font-bold mb-2">4</h3>
              <p className="text-gray-600">Languages Spoken</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center" data-testid="featured-title">Featured In</h2>
          
          <div className="space-y-8">
            {/* Spotify Embed 1 */}
            <div className="bg-white rounded-lg p-6" data-testid="spotify-embed-1">
              <iframe 
                src="https://open.spotify.com/embed/episode/6a8xc0uIUHsJk1YSm2Q8fE?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
            
            {/* Spotify Embed 2 */}
            <div className="bg-white rounded-lg p-6" data-testid="spotify-embed-2">
              <iframe 
                src="https://open.spotify.com/embed/episode/0PjhP3sKa3a8sr0ra83BxS?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="contact-title">CONTACT</h2>
          
          <p className="text-lg mb-8" data-testid="contact-description">Have something to discuss with me? Feel free to contact me.</p>
          
          <p className="text-gray-600 mb-8" data-testid="contact-location">📍Singapore</p>
          
          <form className="max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              data-testid="input-name"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              data-testid="input-email"
            />
            <textarea 
              placeholder="Your Message" 
              rows={5} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none"
              data-testid="textarea-message"
            ></textarea>
            <Button 
              type="submit" 
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              data-testid="button-submit"
            >
              Send
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4">© 2024 Kavya Jahagirdar. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors" data-testid="footer-linkedin">LinkedIn</a>
            <a href="#" className="hover:text-gray-300 transition-colors" data-testid="footer-twitter">Twitter</a>
            <a href="https://resumey.pro/" className="hover:text-gray-300 transition-colors" target="_blank" data-testid="footer-resumey">Resumey.Pro</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
