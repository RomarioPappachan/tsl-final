/* eslint-disable react/prop-types */


const Footer = ({ usersCount }) => {
  return (
    <>
        <div className="footer-container-wrapper w-100">
            <div className="footer row">
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">0</span>
                  <span className="footer-head">Total meditators</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update"> {usersCount} </span>
                  <span className="footer-head">Waiting List</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">0</span>
                  <span className="footer-head">Benefactories</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">0</span>
                  <span className="footer-head">Classes</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer