import Link from 'next/link'
const Heading = ({tittle,subtittle}) => {
  return (
    <>
    <div className="container">
         <div className="row">
            <div className="col-12  d-md-flex justify-content-between  align-items-center">
                <h1 className="text-center text-md-start text-decoration-underline">{tittle}</h1>
                <Link className="rounded-pill  btn-dark d-none d-md-inline" href="#"> {subtittle} &nbsp;➞ </Link>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Heading