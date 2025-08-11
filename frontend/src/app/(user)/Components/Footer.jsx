import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import "../Css/footer.css"

const Footer = () => {
  return (
    <footer className="bottega-footer bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* Contact Info */}
          <div className="col-12 col-md-4">
            <h5 className="footer-heading mb-3 text-gold">Contact Us</h5>
            <p>
              Email: <a href="mailto:sales@bottega9.in" className="footer-link">sales@bottega9.in</a>
            </p>
            <p>
              Phone: <a href="tel:+918194819465" className="footer-link">8194‑8194‑65</a>, <a href="tel:+918194819467" className="footer-link">67</a>
            </p>
            <p>
              Address:<br />
              SCO 5 (First Floor), Sector 7C,<br />
              Madhya Marg, Chandigarh,<br />
              India 160019
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4">
            <h5 className="footer-heading mb-3 text-gold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/collections" className="footer-link">Collections</a></li>
              <li><a href="/services" className="footer-link">Services</a></li>
              <li><a href="/ourstory" className="footer-link">Our Story</a></li>
              <li><a href="/lookbook" className="footer-link">Lookbook</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-12 col-md-4">
            <h5 className="footer-heading mb-3 text-gold">Follow Us</h5>
            <div className="d-flex align-items-center mb-3">
              <a href="https://facebook.com/bottega9.in" target="_blank" rel="noopener noreferrer" className="footer-social me-2">
                <Facebook size={22}/>
              </a>
              <a href="https://instagram.com/bottega9.in" target="_blank" rel="noopener noreferrer" className="footer-social me-2">
                <Instagram size={22}/>
              </a>
              <a href="https://wa.me/918194819465" target="_blank" rel="noopener noreferrer" className="footer-social">
                <MessageCircle size={22}/>
              </a>
            </div>
            <div>
              <p className="footer-brand-desc">Artisanal furniture & interior design</p>
            </div>
          </div>

        </div>

        <hr className="border-secondary mt-4" />

        <div className="text-center pt-2">
          <small>© {new Date().getFullYear()} Bottega9. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
