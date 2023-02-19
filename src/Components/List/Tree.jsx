import React from 'react'
import { useLocalStorageState } from 'Hooks'
import app from 'App'
import List from './List'

const Tree = ({
    entityType,
    expanded,
    show,
    ...rest
}) => {

    const [isExpanded, setIsExpanded] = useLocalStorageState(expanded || true, `${app.camelize(entityType)}_isTreeExpanded`)

    return <List
        {...rest}
        entityType={entityType}
        isTree
        expanded={isExpanded}
        show={show}
    />
}

export default Tree 
