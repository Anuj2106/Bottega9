// components/Highlights.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { Leaf, Sofa, Building, Users } from 'lucide-react'; // Imported icons

export default function Highlights() {
  return (
    <div className="container my-5">
      <div className="row text-center justify-content-center">
        <div className="col-6 col-sm-3 mb-4">
          <div className="mb-2">
            <Leaf size={48} color="gray" strokeWidth={2} />
          </div>
          <div>10 YEARS<br />OF LEGACY</div>
        </div>
        <div className="col-6 col-sm-3 mb-4">
          <div className="mb-2">
            <Sofa size={48} color="gray" strokeWidth={2} />
          </div>
          <div>HIGH QUALITY<br />FURNITURE</div>
        </div>
        <div className="col-6 col-sm-3 mb-4">
          <div className="mb-2">
            <Building size={48} color="gray" strokeWidth={2} />
          </div>
          <div>SHOWROOMS<br />ACROSS INDIA</div>
        </div>
        <div className="col-6 col-sm-3 mb-4">
          <div className="mb-2">
            <Users size={48} color="gray" strokeWidth={2} />
          </div>
          <div>10,000+ SATISFIED<br />CUSTOMERS</div>
        </div>
      </div>
    </div>
  );
}
