
import { Instagram,Facebook,MessageCircle } from 'lucide-react';
const Footer = () => {
  return (
 <footer className="bg-dark text-light pt-5">
  <div className="container">
    <div className="row gy-4">

      {/* Contact Info */}
      <div className="col-md-4">
        <h5>Contact Us</h5>
        <p>Email: <a href="mailto:sales@bottega9.in" className="text-light">sales@bottega9.in</a></p>
        <p>Phone: <a href="tel:+918194819465" className="text-light">8194‑8194‑65</a>, <a href="tel:+918194819467" className="text-light">67</a></p>
        <p>Address:<br/> SCO 5 (First Floor), Sector 7C, Madhya Marg, Chandigarh, India 160019</p>
      </div>

      {/* Useful Links */}
      <div className="col-md-4">
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/collections" className="text-light">Collections</a></li>
          <li><a href="/services" className="text-light">Services</a></li>
          <li><a href="/ourstory" className="text-light">Our Story</a></li>
          <li><a href="/lookbook" className="text-light">Lookbook</a></li>
          <li><a href="/contact" className="text-light">Contact</a></li>
        </ul>
      </div>

      {/* Social */}
      <div className="col-md-4">
        <h5>Follow Us</h5>
        <a href="https://facebook.com/bottega9.in" target="_blank" rel="noopener noreferrer" className="me-3 text-light">
          <Facebook/>
       
        </a>
        <a href="https://instagram.com/bottega9.in" target="_blank" rel="noopener noreferrer" className="me-3 text-light">
        <Instagram/>
        </a>
        <a href="https://wa.me/918194819465" target="_blank" rel="noopener noreferrer" className="text-light">
            <MessageCircle className='text-sucess'/>
        </a>
        <p className="mt-3">Artisanal furniture & interior design</p>
      </div>

    </div>

    <hr className="border-secondary mt-4" />

    <div className="text-center pb-3">
      <small>© {new Date().getFullYear()} Bottega9. All rights reserved.</small>
    </div>
  </div>
</footer>

  )
}

export default Footer