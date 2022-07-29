import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)
dayjs.locale('ru', { weekStart: 1 })

export default dayjs()