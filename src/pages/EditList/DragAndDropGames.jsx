import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { SortableGame } from './SortableGame'

export default function DragAndDropGames({ list, setList, setProgress }) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  )

  return (
    <DndContext
      autoScroll={true}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row">
        <div className="flex flex-col flex-1">
          <SortableContext items={list.games}>
            <div className="flex flex-row flex-wrap">
              {list.games.map((game, index) => (
                <SortableGame
                  list={list}
                  setList={setList}
                  key={game.id}
                  id={game.id}
                  game={game}
                  index={index}
                  setProgress={setProgress}
                />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </DndContext>
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = list.games.findIndex((game) => game.id === active.id)
      const newIndex = list.games.findIndex((game) => game.id === over.id)
      setList((list) => {
        const newGames = [...list.games]
        const [movedGame] = newGames.splice(oldIndex, 1)
        newGames.splice(newIndex, 0, movedGame)
        // Update the rank of each game based on its new index in the list
        const updatedGames = newGames.map((game, index) => ({
          ...game,
          rank: index + 1,
        }))

        return { ...list, games: updatedGames }
      })
    }
  }
}
