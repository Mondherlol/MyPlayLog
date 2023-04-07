import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
function Footer() {
  return (
    <div
      style={{ background: 'rgb(6 5 28)' }}
      className=" w-full h-9 flex justify-center align-middle center "
    >
      <span className="my-auto">
        {' '}
        © 2023 <span style={{ color: colors.primary }}>My PlayLog</span> |
        {' See : '}
        <Link className=" text-white underline" to="/credits">
          Credits
        </Link>
      </span>
    </div>
  )
}

export default Footer
