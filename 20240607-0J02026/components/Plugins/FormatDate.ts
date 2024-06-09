const formatDate = (dateStr: string | Date): string => {
  return new Date(dateStr)
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .toString()
}

export default formatDate
