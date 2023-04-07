import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from '../../../i18n'
import styled from 'styled-components'
import colors from '../../../utils/style/colors'

import IconArrow from '../../../assets/icons/yellow-right-arrow.png'
const regions = ['no-flag']

for (let i = 1; i <= 10; i++) {
  const region = {
    id: i,
    icon: require(`../../../assets/icons/regions//region_${i}.svg`),
  }
  regions.push(region)
}

const StyledTitle = styled.h1`
  background: rgba(217, 217, 217, 0.2);
  padding: 5px;
  padding-left: 10%;
  padding-right: 10%;
  border-radius: 8px;
  border-color: ${colors.backgroundDerivation};
`

const StyledButton = styled.button`
  background: none;
  margin-left: 5px;
  cursor: pointer;
  color: ${colors.primary};
  border: none;
  transition: 0.5s;
`
const StyledIcon = styled.img`
  transition: 0.5s;
  &:hover {
    transform: translateX(2px);
  }
`
const ConsoleName = styled.span`
  padding: 5px;
  font-weight: bold;
`
const ExpandedDates = styled.div`
  background: ${colors.backgroundDerivation};
  border-radius: 8px;
  padding: 5px;
  text-align: left;
`
function ReleaseDates({ releaseDates }) {
  const { t } = useTranslation()
  const [releases, setReleases] = useState([])

  // Utilisation de la méthode setReleases pour mettre à jour l'état de releases

  useEffect(() => {
    const updatedReleases = []
    releaseDates.forEach((release) => {
      const { platform } = release
      let consoleIndex = updatedReleases.findIndex(
        (c) => c.console === platform.abbreviation
      )
      if (consoleIndex === -1) {
        consoleIndex = updatedReleases.length
        updatedReleases.push({
          console: platform.abbreviation,
          releases: [],
          isExpanded: false,
        })
      }

      if (release.region !== 7) {
        const date = release.human !== 'TBD' ? new Date(release.human) : 'TBD'
        updatedReleases[consoleIndex].releases.push({
          region: release.region,
          date,
        })
      }
    })

    updatedReleases.forEach((console) => {
      console.releases.sort((a, b) => {
        if (a.date === 'TBD' && b.date === 'TBD') return 0
        if (a.date === 'TBD') return 1
        if (b.date === 'TBD') return -1
        return new Date(a.date) - new Date(b.date)
      })
    })

    setReleases(updatedReleases)
  }, [releaseDates])
  return (
    <div className="w-full  flex-col flex justify-center items-center   text-center  p-4">
      <StyledTitle className="  border-b-4 w-fit    border-0  border-solid  ">
        {t('release_dates')}
      </StyledTitle>
      <div>
        {releases.map((release) => {
          return (
            <div className=" " key={release.console}>
              <div className="flex justify-start items-center">
                <ConsoleName>{release.console}</ConsoleName> -{' '}
                {release.releases[0].region !== 8 && (
                  <img
                    className="ml-2 mr-1"
                    width={18}
                    src={regions[release.releases[0].region].icon}
                    alt={regions[release.releases[0].region].icon}
                  />
                )}
                {/* //La date est localisée selon la traduction de la page. */}
                {release.releases[0].date !== 'TBD'
                  ? new Intl.DateTimeFormat(i18next.language, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }).format(new Date(release.releases[0].date))
                  : 'TBD'}
                {release.releases.length > 1 && !release.isExpanded && (
                  <StyledButton
                    className="flex justify-top"
                    onClick={() => {
                      setReleases((prevReleases) =>
                        prevReleases.map((prevRelease) =>
                          prevRelease.console === release.console
                            ? {
                                ...prevRelease,
                                isExpanded: !prevRelease.isExpanded,
                              }
                            : prevRelease
                        )
                      )
                    }}
                  >
                    <StyledIcon
                      className=" w-3 h-3 "
                      src={IconArrow}
                      alt="expand-icon"
                    />
                  </StyledButton>
                )}
              </div>
              {release.isExpanded && (
                <ExpandedDates>
                  {release.releases.map((currentRelease) => {
                    return (
                      <div className="flex" key={currentRelease.region}>
                        {currentRelease.region !== 8 ? (
                          <img
                            className="ml-2 mr-1"
                            width={18}
                            src={regions[currentRelease.region].icon}
                            alt={regions[currentRelease.region].icon}
                          />
                        ) : (
                          <div
                            className="ml-2 mr-1"
                            style={{ width: 18, height: 2 }}
                          >
                            {' '}
                          </div>
                        )}

                        {currentRelease.data !== 'TBD'
                          ? new Intl.DateTimeFormat(i18next.language, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }).format(new Date(currentRelease.date))
                          : 'TBD'}
                        <br />
                      </div>
                    )
                  })}
                  <div className="divider">
                    <div className="bar"></div>
                    <div
                      className="show-more"
                      onClick={() => {
                        setReleases((prevReleases) =>
                          prevReleases.map((prevRelease) =>
                            prevRelease.console === release.console
                              ? {
                                  ...prevRelease,
                                  isExpanded: !prevRelease.isExpanded,
                                }
                              : prevRelease
                          )
                        )
                      }}
                    >
                      {t('show_less')}
                    </div>
                    <div className="bar"></div>
                  </div>
                </ExpandedDates>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReleaseDates
