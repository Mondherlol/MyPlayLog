import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import ListCard from '../../ExploreLists/ListCard'
import ListCardPlaceholder from '../../ExploreLists/ListCardPlaceholder'
import { useEffect } from 'react'
export default function UserLists({ userId }) {
  const [userLists, setUserLists] = useState([])
  const [totalUserLists, setTotalUserLists] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      setIsLoading(true)
      axios
        .get(`${process.env.REACT_APP_IP_ADRESS}/api/lists?idOwner=${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserLists(res.data.lists)
          setTotalUserLists(res.data.totalLists)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: 'dark',
          })
        })
        .finally(() => setIsLoading(false))
    }
  }, [userId])
  return (
    <div className=" mt-16 p-4 ">
      <h2>Lists :</h2>
      <div className=" mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 flex-wrap">
        {userLists &&
          !isLoading &&
          userLists.map((list) => {
            return <ListCard list={list} key={list._id} />
          })}
        {isLoading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <ListCardPlaceholder key={'list + ' + index} />
            ))}
          </>
        )}
        {totalUserLists === 0 && !isLoading && <h1>No Lists yet.</h1>}
      </div>
    </div>
  )
}
