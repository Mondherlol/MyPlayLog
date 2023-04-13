import styled from 'styled-components'
import colors from '../../utils/style/colors'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 260px;
  width: 100%;
  background-color: ${colors.backgroundDerivation};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  transition: 0.1s;
  &:hover {
    transform: scale(1.01);
    z-index: 1;
  }

  overflow: hidden;
  box-shadow: inset 0 3px 15px 3px #0009;
  position: relative;
`

const CoversContainer = styled.div`
  // border-top-left-radius: 16px;
  // border-top-right-radius: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background-color: rgb(83 81 126 / 21%);
  overflow: hidden;
  position: relative;
`

export default function ListCardPlaceholder() {
  return (
    <ListContainer>
      <CoversContainer>
        <div
          className="loading"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        ></div>
      </CoversContainer>
      <div style={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        <div style={{ padding: '20px 30px' }}>
          <h2
            className="loading mb-4"
            style={{
              width: 300,
              height: 30,
              background: 'rgb(83 81 126 / 21%)',
            }}
          >
            {' '}
          </h2>
          <p
            className="loading"
            style={{
              height: 50,
              background: 'rgb(83 81 126 / 21%)',
            }}
          ></p>
        </div>
      </div>
    </ListContainer>
  )
}
