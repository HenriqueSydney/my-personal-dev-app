import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export function day(date?: dayjs.ConfigType) {
  if (date) {
    return dayjs.utc(date).tz('America/Sao_Paulo')
  }

  return dayjs.utc().tz('America/Sao_Paulo')
}
