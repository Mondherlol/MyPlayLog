import { Link } from 'react-router-dom'

function Platforms({ platforms }) {
  return (
    <div className=" mt-auto flex flex-wrap row-auto justify-start  w-full sm:justify-start">
      {platforms.map((platform) => {
        return (
          <Link
            to={`/search?platforms=${platform.id}`}
            key={platform.id}
            className={`border border-solid border-white p-1.5 mr-2 duration-150 rounded-xl bg-[#110f3387] w-fit cursor-pointer text-white hover:text-[#fdc500] hover:font-bold `}
          >
            {platform.abbreviation ? platform.abbreviation : platform.name}
          </Link>
        )
      })}
    </div>
  )
}

export default Platforms
