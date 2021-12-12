class DateFormat {
    public static getDate() {
        const date = new Date()
        const year = `${date.getFullYear()}`
        let month = `${date.getMonth()}`
        let day = `${date.getDate()}`

        if (date.getMonth() < 10) {
            month = `0${month}`
        }
        if (date.getDate() < 10) {
            day = `0${day}`
        }

        return `${year}-${month}-${day}`
    }
    public static getDateTime() {
        const date = new Date()
        let hours = `${date.getHours()}`
        let minutes = `${date.getMinutes()}`
        let seconds = `${date.getSeconds()}`
        if (date.getHours() < 10) {
            hours = `0${hours}`
        }
        if (date.getMinutes() < 10) {
            minutes = `0${minutes}`
        }
        if (date.getSeconds() < 10) {
            seconds = `0${seconds}`
        }

        return `${DateFormat.getDate()} ${hours}:${minutes}:${seconds}`
    }
}
export default DateFormat;