function Platforms({ platforms }) {
  return (
    <div className=" mt-auto flex flex-wrap row-auto justify-start  w-full sm:justify-start">
      {platforms.map((platform) => {
        return (
          <span
            key={platform.id}
            className={`border border-solid border-white p-1.5 mr-2 duration-150 rounded-xl bg-[#110f3387] w-fit cursor-pointer  hover:text-[#fdc500] hover:font-bold `}
          >
            {platform.abbreviation}
          </span>
        )
      })}
    </div>
  )
}

export default Platforms
