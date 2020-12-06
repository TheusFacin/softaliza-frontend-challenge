const parseDate = (date: string, hour: string): Date => {
  const dateString = `${date.split('/').reverse().join('-')}T${hour}`

  return new Date(dateString)
}

export default parseDate
