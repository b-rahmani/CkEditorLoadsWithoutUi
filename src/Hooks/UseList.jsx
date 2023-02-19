import {
    useEffect,
    useMemo,
    useState,
} from 'react'
import app from 'App'
import { get } from 'App'
import { useMessage } from 'Hooks'

const useList = ({
    entityType,
    filterablesCount,
    isBrowse,
    isTree,
}) => {

    var key = `${app.camelize(entityType)}${isBrowse && '_browse'}_listParameters`
    var value = window.localStorage.getItem(key)
    var existingParameters = (value === null ? {} : JSON.parse(value))

    const [pageNumber, setPageNumber] = useState(existingParameters.pageNumber || 1)
    const [pageSize, setPageSize] = useState(existingParameters.pageSize || 5)
    const [filterables, setFilterables] = useState(null)
    const [filters, setFilters] = useState([])
    const [sorts, setSorts] = useState(existingParameters.sorts || [])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [metadata, setMetadata] = useState({})
    const [hasData, setHasData] = useState(false)
    const [selectedEntities, setSelectedEntities] = useState([])
    const { error } = useMessage()
    const [resetRequested, setResetRequested] = useState(false)
    const [hasGuid, setHasGuid] = useState(false)
    const [hasKey, setHasKey] = useState(false)
    const [hasOrder, setHasOrder] = useState(false)
    const [hasSlug, setHasSlug] = useState(false)
    const [hasFilters, setHasFilters] = useState(filters.length > 0)

    const setFilterable = (property) => {
        if (!property) {
            return
        }
        for (var i = 0; i < filterables?.length; i++) {
            if (filterables[i].property === property) {
                return
            }
        }
        setFilterables((previousFilterables) => {
            if (previousFilterables) {
                return [property, ...previousFilterables].filter((v, i, a) => a.indexOf(v) === i)
            }
            return [property]
        })
    }

    const setFilter = (property, value, operator) => {
        if (filters.find(i => i.property === property)) {
            if (value) {
                const newFilters = filters.map((i) => {
                    return i.property === property && i.operator === operator
                        ? { property, value, operator }
                        : i
                })
                setFilters(newFilters)
            }
            else {
                const newFilters = filters.filter(i => i.property !== property)
                setFilters(newFilters)
            }
        }
        else {
            if (value) {
                const newFilters = [...filters, { property, value, operator }]
                setFilters(newFilters)
            }
        }
    }

    const removeFilter = (property) => {

    }

    const resetFilters = () => {
        setFilters([])
        setResetRequested(true)
    }

    const addSort = (property, direction) => {

    }

    const removeSort = (property) => {

    }

    const storeInLocalStorage = () => {
        window.localStorage.setItem(key, JSON.stringify({
            filters: filters.filter(i => i.value),
            pageNumber,
            pageSize,
            sorts,
        }))
    }

    useEffect(() => {
        storeInLocalStorage()
        var queryParameters = app.parseQueryAsArray()
        var queryFilters = queryParameters.filter(i => {
            if (filterables && filterables.filter) {
                const result = filterables.filter(x => x.toLowerCase() === i.key.toLowerCase())
                return result ? result.length > 0 : false
            }
            return false
        })
        const log = {
            filterables: {
                value: JSON.stringify(filterables)
            },
            filterablesCount: {
                value: filterablesCount
            },
            queryParameters: {
                value: JSON.stringify(queryParameters)
            },
            queryFilters: {
                value: JSON.stringify(queryFilters)
            },
            filters: {
                value: JSON.stringify(filters)
            },
            sorts: {
                value: JSON.stringify(sorts)
            },
            pageSize: {
                value: pageSize
            },
            pageNumber: {
                value: pageNumber
            }
        }
        // console.table(log)
        if (filterablesCount === 0) {
            load()
        }
        else {
            if (filterables && filterables.length === filterablesCount) {
                load()
            }
        }

        setHasFilters(filters.length > 0)

    }, [filterables, filters, sorts, pageSize, pageNumber])

    useEffect(() => {
        if (resetRequested && filters.length === 0) {
            reload()
            setResetRequested(false)
        }
    }, [filters, resetRequested])

    const buildFiltersQueryString = () => {
        //filters=title_contains_hi&stateId_eq_closed&userAge_gt_35
        var query = ""
        for (var i = 0; i < filters.length; i++) {
            var filter = filters[i]
            if (app.isSomething(filter.value)) {
                query += `&${filter.property}_${filter.operator}_${filter.value}`
            }
        }
        if (query.startsWith('&')) {
            query = query.slice(1)
        }
        return query
    }

    const buildSortsQueryString = () => {
        var query = ""
        for (var i = 0; i < sorts.length; i++) {
            var sort = sorts[0]
            if (sort.column) {
                query += `&${sort.column}_${sort.direction}`
            }
        }
        query = query.slice(1)
        return query
    }

    const setEntityActionProgress = (entity, progress) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === entity.id) {
                    data[i].actionProgress = actionProgress
                }
            }
            return [...data]
        })
    }

    const setEntityProgress = (entity, progress) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === entity.id) {
                    data[i].progress = progress
                }
            }
            return [...data]
        })
    }

    const setEntity = (entity) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === entity.id) {
                    data[i] = entity
                }
            }
            return [...data]
        })
    }

    const load = () => {
        setLoading(true)
        let url = `${app.camelize(entityType)}/`
        if (isTree) {
            url += 'tree'
        }
        else {
            url += `list?pageNumber=${pageNumber}&pageSize=${pageSize}`
        }
        const filters = encodeURIComponent(buildFiltersQueryString())
        if (filters) {
            url += `&filters=${filters}`
        }
        const sorts = buildSortsQueryString()
        if (sorts) {
            url += `&sorts=${sorts}`
        }
        if (window.location.search) {
            const query = window.location.search.slice(1)
            if (url.indexOf('?') > -1) {
                url += '&'
            }
            else {
                url += '?'
            }
            url += query
        }
        get(url).then((result) => {
            if (!result) {
                return
            }
            if (isTree) {
                setData(result)

            }
            else {
                const { data, metadata } = result
                setData(data)
                setMetadata(metadata)
            }
            setLoading(false)
        }, (e) => {
            error(e)
            setLoading(false)
        })
    }

    const reload = (entity) => {
        load()
    }

    const selectEntity = (id) => {
        if (!id) {
            return
        }
        if (selectedEntities.indexOf(id) > -1) {
            return
        }
        setSelectedEntities((previousSelectedEntities) => {
            const all = [id, ...previousSelectedEntities]
            const unique = [...new Set(all)].sort()
            return unique
        })
    }

    const selectEntities = (entities) => {
        if (!entities || entities.length === 0) {
            return
        }
        if (!entities[0].id) {
            return
        }
        setSelectedEntities((previousSelectedEntities) => {
            let newItems = entities.map(i => i.id)
            const all = [...previousSelectedEntities, ...newItems]
            const unique = [...new Set(all)].sort()
            return unique
        })
    }

    const deselectEntity = (id) => {
        if (!id) {
            return
        }
        if (selectedEntities.indexOf(id) === -1) {
            return
        }
        setSelectedEntities((previousSelectedEntities) => {
            selectedEntities.splice(selectedEntities.indexOf(id), 1)
            return [...selectedEntities]
        })
    }

    const deselectEntities = (entities) => {
        if (!entities || entities.length === 0) {
            return
        }
        if (!entities[0].id) {
            return
        }
        setSelectedEntities((previousSelectedEntities) => {
            let entitiesToBeDeleted = entities.map(i => i.id)

            return previousSelectedEntities.filter(i => !entitiesToBeDeleted.includes(i))
        })
    }

    const reloadEntity = (entity) => {
        setEntityProgress(entity, true)
        get(`${app.camelize(entityType)}/get/${entity.id}`)
            .then(result => {
                setEntityProgress(entity, false)
                setEntity(result)
            }, e => {
                setEntityProgress(entity, false)
                error(e)
            })
    }

    useEffect(() => {
        if (data && Array.isArray(data) && data.length !== 0) {
            setHasData(true)
            const firstRecord = data[0]
            if (firstRecord.hasOwnProperty('guid')) {
                setHasGuid(true)
            }
            if (firstRecord.hasOwnProperty('key')) {
                setHasKey(true)
            }
            if (firstRecord.hasOwnProperty('order')) {
                setHasOrder(true)
            }
            if (firstRecord.hasOwnProperty('slug')) {
                setHasSlug(true)
            }
        }
        else {
            setHasData(false)
            if (pageNumber > 1) {
                setPageNumber(1)
            }
        }
    }, [data])

    return {
        addSort,
        buildFiltersQueryString,
        buildSortsQueryString,
        data,
        deselectEntities,
        deselectEntity,
        hasData,
        hasGuid,
        hasKey,
        hasFilters,
        hasOrder,
        hasSlug,
        loading,
        metadata,
        pageNumber,
        pageSize,
        reload,
        reloadEntity,
        removeFilter,
        removeSort,
        resetFilters,
        selectedEntities,
        selectEntities,
        selectEntity,
        setEntity,
        setEntityActionProgress,
        setEntityProgress,
        setFilter,
        setFilterable,
        setPageNumber,
        setPageSize,
        setSorts,
        sorts,
        usedFilters: filters,
    }
}

export default useList
