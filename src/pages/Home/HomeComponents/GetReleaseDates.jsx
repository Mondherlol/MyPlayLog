export const getReleaseDate = ({ game, i18next, t }) => {
  if (game.release_dates && game.release_dates[0].human === 'TBD') return 'TBD'
  // Vérifie si on connaît que l'année de sortie.
  const onlyYear =
    game.first_release_date && /^\d{4}$/.test(game.release_dates[0].human)

  // Si la date contient uniquement l'année, on renvoie seulement l'année pour laquelle c'est prévu.
  if (onlyYear) {
    const year = game.release_dates[0].human
    const currentYear = new Date().getFullYear()
    if (year > currentYear) {
      return t('scheduled_for') + ' ' + year + '.'
    } else return year
  }

  //On récupere la release Date.
  const releaseDate = game.release_dates
    ? new Date(game.first_release_date * 1000)
    : null

  //On vérifie si il existe une date sinon on renvoie date inconnue.
  if (releaseDate) {
    //On calcule la différence de temps entre la sortie et aujourd'hui.
    const now = new Date()
    const diff = now.getTime() - releaseDate.getTime()
    const diffInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24))

    //Si le jeu est sortit avant cette année, la différence est en année.
    if (diffInYears > 0) {
      return new Intl.RelativeTimeFormat(i18next.language, {
        numeric: 'auto',
      }).format(-diffInYears, 'year')
    } else {
      //Si le jeu sort / est sorti cette année, la différence est en jours.
      return new Intl.RelativeTimeFormat(i18next.language, {
        numeric: 'auto',
      }).format(-diffInDays, 'day')
    }
  } else {
    return t('release_date_unknown')
  }
}
