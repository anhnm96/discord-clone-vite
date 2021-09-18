import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(calendar)

export function getTime(createdAt: string) {
  return dayjs(createdAt).utc(true).local().calendar()
}

export function getShortenedTime(createdAt: string) {
  return dayjs(createdAt).utc(true).local().format('h:mm A')
}

export function getTimeDifference(date1: string, date2: string) {
  return dayjs(date1).diff(dayjs(date2), 'minutes')
}

export function checkNewDay(date1: string, date2: string) {
  return !dayjs(date1).isSame(dayjs(date2), 'day')
}

export function formatDivider(date: string) {
  return dayjs(date).format('MMMM D, YYYY')
}
