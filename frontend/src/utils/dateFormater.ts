const dateFormater = (dateObj: Date): string => {
  const date = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj)

  const hour = getHour(dateObj)

  return `${date[0].toUpperCase()}${date.slice(1)}, às ${hour}`
}

const getDate = (dateObj: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(dateObj)
}

const getHour = (dateObj: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

export default dateFormater
export { getDate, getHour }
