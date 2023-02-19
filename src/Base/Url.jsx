const Url = {
    parseQuery: () => {
        var params = new URLSearchParams(window.location.search)
        var result = {}
        params.forEach((value, key) => result[key] = value)
        return result
    },
    parseQueryAsArray: () => {
        var params = new URLSearchParams(window.location.search)
        var result = []
        params.forEach((value, key) => result.push({
            key,
            value
        }))
        return result
    },
    hasQuery: (key) => {
        key = key.toLowerCase()
        var params = new URLSearchParams(window.location.search)
        let has = false
        params.forEach((value, queryKey) => {
            if (queryKey.toLowerCase() === key) {
                has = true
                return
            }
        })
        return has
    },
    getUrlParameter: (key) => {
        key = key.toLowerCase()
        var params = new URLSearchParams(window.location.search)
        let result = undefined
        params.forEach((value, queryKey) => {
            if (queryKey.toLowerCase() === key) {
                result = value
                return
            }
        })
        return result
    }
}

export default Url
