import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'

const UserCard = ({ ele }) => {
  return (
    //  style={{backgroundColor:'rgb(255,255,255,0.1)'}}
    <div
      className=" w-44 h-52 rounded-md relative cursor-pointer   "
      style={{ backgroundColor: colors.backgroundDerivation }}
    >
      <Link to={`/user/${ele._id}`}>
        <div className="absolute top-2 left-4 w-36 h-36 rounded-full  shadow-2xl flex items-center justify-center">
          <img
            src={ele.profilePic}
            alt="Profile"
            className="w-36 h-36 rounded-full "
          />
        </div>
        <h1 className="absolute mt-40 ml-3 text-white ">{ele.username}</h1>
      </Link>
    </div>
  )
}

export default UserCard
