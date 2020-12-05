const dateFormater = (dateObj: Date): string => {
  const date = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj)

  const hour = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)

  return `${date[0].toUpperCase()}${date.slice(1)}, às ${hour}`
}

export default dateFormater
