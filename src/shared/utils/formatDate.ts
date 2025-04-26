export const formatDate = (dateStr: string): string => {
    const [day, month, year] = dateStr.split("/").map(Number)
    const paddedMonth = String(month).padStart(2, "0")
    const paddedDay = String(day).padStart(2, "0")
    return `${year}-${paddedMonth}-${paddedDay}`
}