
const FooterSuccess = ({ usersCount }) => {
  console.log(usersCount)
  return (
    <>
    <div className="footer1-container-wrapper w-100">
        <div className="footer1 row">
            <div className="footer1-sub-grp col-3">
              <span className="footer1-update">0</span>
              <span className="footer1-head">Total meditators</span>
            </div>
            <div className="footer1-sub-grp col-3">
              <span className="footer1-update"> {usersCount} </span>
              <span className="footer1-head">Waiting List</span>
            </div>
            <div className="footer1-sub-grp col-3">
              <span className="footer1-update">0</span>
              <span className="footer1-head">Benefactories</span>
            </div>
            <div className="footer1-sub-grp col-3">
              <span className="footer1-update">0</span>
              <span className="footer1-head">Classes</span>
            </div>
        </div>
    </div>
</>
  )
}

export default FooterSuccess