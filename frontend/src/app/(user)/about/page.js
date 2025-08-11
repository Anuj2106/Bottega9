'use client';
import Image from "next/image";
import '../Css/about.css';
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="about-container container-fluid p-0">
      
      {/* Hero Section with Parallax */}
      <section className="hero-section text-white d-flex align-items-center">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5">
          <div className="text-center text-md-start px-4" style={{ maxWidth: '600px' }}>
            <h1 className="display-3 fw-bold mb-4 animate-fade-up">Our Story</h1>
            <p className="lead mb-4 animate-fade-up delay-1">
              Where artisanal craftsmanship meets modern elegance.
            </p>
            <a href="#philosophy" className="btn btn-outline-light btn-lg fw-semibold animate-fade-up delay-2">
              Discover Our Philosophy
            </a>
          </div>
          <div className="px-4 animate-fade-left" style={{ maxWidth: '600px' }}>
            <Image
              src="/images/showroom.jpg"
              alt="Bottega9 Showroom"
              width={800}
              height={600}
              className="img-fluid rounded shadow-lg hover-scale"
              priority
            />
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-black text-white py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6 animate-fade-right">
              <h2 className="fw-semibold mb-4 text-gold">Born from Passion</h2>
              <p className="fs-5">
                BOTTEGA9 was born out of the strong desire of two architects to bridge the gap between traditional Indian craftsmanship and contemporary design.
              </p>
              <p className="fs-5">
                Since 2002, we have been dedicated to making spaces beautiful through thoughtful design and exceptional execution.
              </p>
              <p className="fst-italic text-gold mt-4">— The Founders</p>
            </div>
            <div className="col-md-6 text-center animate-fade-left">
              <Image
                src="/images/workshop.jpg"
                alt="Bottega9 Workshop"
                width={600}
                height={500}
                className="img-fluid rounded shadow-lg hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - Cards with Hover */}
      <section id="philosophy" className="py-5 bg-light text-dark">
        <div className="container">
          <h2 className="text-center mb-5 fw-semibold animate-fade-up">Our Philosophy</h2>
          <div className="row g-4">
            {[
              { number: "01", title: "Artisanal Excellence", desc: "..." },
              { number: "02", title: "Modern Aesthetics", desc: "..." },
              { number: "03", title: "Natural Materials", desc: "..." },
            ].map((item, index) => (
              <div key={index} className="col-md-4 animate-fade-up delay-${index}">
                <div className="philosophy-card p-4 h-100 text-center rounded shadow-sm">
                  <div className="display-6 fw-bold text-gold mb-3">{item.number}</div>
                  <h3 className="mb-3">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services with Overlay hover */}
      <section className="py-5 bg-black text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-semibold text-gold">What We Do</h2>
            <p className="text-secondary">From concept to completion, we bring your vision to life</p>
          </div>
          <div className="row g-4">
            {[
              { title: "Interior Design", desc: "...", image: "/images/service1.jpg" },
              { title: "Bespoke Furniture", desc: "...", image: "/images/service2.jpg" },
              { title: "Express Makeovers", desc: "...", image: "/images/service3.jpg" }
            ].map((service, idx) => (
              <div key={idx} className="col-md-4 animate-fade-up delay-${idx}">
                <div className="service-card position-relative overflow-hidden rounded shadow-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-100 h-100 object-cover"
                  />
                  <div className="service-overlay d-flex flex-column justify-content-center align-items-center text-center p-4">
                    <h3 className="text-gold mb-3">{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-semibold animate-fade-up">Our Values</h2>
          <div className="row g-4">
            {["Quality", "Innovation", "Sustainability", "Heritage"].map((val, i) => (
              <div key={i} className="col-md-6 col-lg-3 animate-fade-up delay-${i}">
                <div className="value-card p-4 bg-white rounded h-100 shadow-sm border-start border-3 border-gold hover-scale">
                  <h3 className="mb-3 fw-semibold">{val}</h3>
                  <p>Sample description...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-5 text-center">
        <div className="container animate-fade-up">
          <h2 className="mb-4 fw-semibold">Let's Create Something Beautiful Together</h2>
          <p className="mb-4 text-secondary">
            Ready to transform your space? Get in touch and let's make it happen.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link className="btn btn-gold btn-lg fw-semibold" href="/contact">Start Your Project</Link>
            <a className="btn btn-outline-gold btn-lg fw-semibold" href="#">View Our Work</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
