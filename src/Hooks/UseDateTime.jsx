import app from 'App'

const useDateTime = () => {

    const dayOfMonth = (date) => {

    }

    const getMonthName = (month) => {
        const date = new Date()
        date.setMonth(month - 1)
        const name = date.toLocaleString(app.getLocale().key, { month: 'long' })
        return name
    }

    const getShortMonthName = (month) => {
        const date = new Date()
        date.setMonth(month - 1)
        const name = date.toLocaleString(app.getLocale().key, { month: 'short' })
        return name
    }

    return {
        getMonthName,
        getShortMonthName
    }
}

export default useDateTime
