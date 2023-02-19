import React, { useContext } from 'react'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import app from 'App'
import { ListContext } from 'Contexts'
import { TableContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import Pagination from './Pagination'
import EntityActions from './EntityActions/EntityActions'
import NoEntitiesFound from '../NoEntitiesFound'

const Table = () => {

    const {
        classProvider,
        create,
        data,
        deselectEntities,
        deselectEntity,
        edit,
        entityActions,
        entityType,
        hasDelete,
        hasEdit,
        hasGuid,
        hasItemSelection,
        hasKey,
        hasOrder,
        hasSlug,
        headers,
        hiddenEntityActions,
        isBrowse,
        menuForActions,
        numbered,
        reload,
        row: externalRow,
        selectEntities,
        selectEntity,
        selectedEntities,
        separateRowForActions,
        setEntity,
        showTopPagiation,
        upsert,
    } = useContext(ListContext)

    let headerElements = []

    const internalRow = () => <><td></td></>

    const row = externalRow || internalRow

    const doesDestructure = (func) => {
        return /\({.+}\)/gm.test(func.toString().replaceAll("\n", "").split("=>")[0])
    }

    if (headers) {

        headerElements = React.Children
            .toArray(headers.props.children)
            .filter(header => {
                if (header.props && header.props.superAdmin) {
                    return app.isSuperAdmin()
                }
                return true
            })
            .map(header => {
                if (header.props.children?.props) {
                    return header.props.children
                }
                return header
            })
            .map(header => {
                const { start, superAdmin, ...rest } = header.props
                return <header.type
                    className={"text-slate-500 dark:text-white text-xs text-center "
                        + (header?.props?.start && " ltr:text-left rtl:text-right ")
                        + (header?.props?.className || "")}
                    key={header.key}
                    ref={header.ref}
                    {...rest}
                >
                    {
                        React.Children.toArray(header.props.children).map(child => {
                            return typeof child === "string" ? app.t(child) : child
                        })
                    }
                </header.type>
            })
    }
    const head =
        <thead className='bg-stone-100 dark:bg-zinc-600 w-full '>
            <tr className="w-full p-2 hidden md:table-row text-right">
                {
                    hasOrder && <th className="text-gray-900 dark:text-white py-3 text-sm font-light tracking-wide text-center w-6"></th>
                }
                {
                    hasItemSelection ?
                        <th className="text-gray-900 dark:text-white py-3 text-sm font-light tracking-wide text-center">
                            <Tooltip
                                title={app.t("Select all")}
                                placement="top"
                            >
                                <Checkbox
                                    color="primary"
                                    onChange={(event) => {
                                        event.target.checked
                                            ?
                                            selectEntities(data)
                                            :
                                            deselectEntities(data)
                                    }}
                                />
                            </Tooltip>
                        </th>
                        :
                        null
                }
                {
                    numbered && <th className="w-10">#</th>
                }
                {
                    headerElements.length > 0
                        ?
                        headerElements
                        :
                        <th></th>
                }
                {/* {
                    (entityActions || hasDelete)
                        ?
                        !hiddenEntityActions && <th></th>
                        :
                        null
                } */}
            </tr>
        </thead>

    const rowStyle = (item, index, hasBottomBorder) => 'py-3 odd:bg-slate-100 bg-slate-50 dark:bg-zinc-500 dark:odd:bg-zinc-400 hover:bg-slate-200 border-b border-slate-200 ' +
        ((hasBottomBorder && index !== data.length - 1) ? ' border-b border-slate-200' : ' ') +
        (classProvider ? classProvider(item) : '')

    const drag = (item) => hasOrder &&
        <td className="text-gray-900 dark:text-white py-3 text-sm font-light tracking-wide text-center">
            <DragIndicatorIcon className="cursor-move dark:fill-white" />
        </td>

    const itemSelection = (item) => hasItemSelection
        ?
        <td className="text-gray-900 dark:text-white py-3 text-sm font-light tracking-wide text-center">
            <Checkbox
                checked={selectedEntities?.indexOf(item.id) > -1}
                color="primary"
                onChange={(event) => {
                    event.target.checked
                        ?
                        selectEntity(item.id)
                        :
                        deselectEntity(item.id)
                }}
            />
        </td>
        :
        null

    const rowNumber = index => numbered &&
        <td className="w-10">
            {index + 1}
        </td>

    const clonedCells = (item) => React.Children
        .toArray(doesDestructure(row) ? row({
            item,
            isSuperAdmin: app.isSuperAdmin()
        }).props.children : row(item).props.children)
        .filter(item => {
            if (item.props && item.props.superAdmin) {
                return app.isSuperAdmin()
            }
            return true
        })
        .map(td => {
            if (td.type === 'td') {
                return td
            }
            if (td.type instanceof Function) {
                return td
            }
            return td.props.children
        })
        .map(td => {
            const { start, superAdmin, ...rest } = td.props
            return <td.type
                key={td.key}
                ref={td.ref}
                className={'text-gray-900 dark:text-white py-3 text-sm font-light tracking-wide text-center '
                    + (td?.props?.start && " ltr:text-left rtl:text-right ")
                    + td.props.className}
                hasmoreroom={menuForActions}
                {...rest}
            >
                {td.props.children}
            </td.type>
        })

    const actions = (item) => (entityActions || hasDelete || hasEdit || edit || app.isDev())
        ?
        !hiddenEntityActions && <td {...(separateRowForActions && { colSpan: "100" })}>
            <EntityActions
                entityActions={entityActions}
            />
        </td>
        :
        null

    // https://codepen.io/nickslash/pen/zYJvqML
    const body = <tbody className="[&>*:nth-child(3n)]:bg-blue-500">
        {
            row && typeof row === 'function'
                ?
                data.length === 0
                    ?
                    <tr>
                        <td colSpan='100'><NoEntitiesFound /></td>
                    </tr>
                    :
                    data.map((item, index) => !menuForActions && separateRowForActions
                        ?
                        <React.Fragment key={item.id}>
                            <EntityContext.Provider
                                value={{
                                    entity: item
                                }}
                            >
                                <tr
                                    className={rowStyle(item, index, hiddenEntityActions) + ' relative '}
                                >
                                    {drag(item)}
                                    {itemSelection(item)}
                                    {rowNumber(index)}
                                    {clonedCells(item)}

                                </tr>
                                {
                                    !hiddenEntityActions &&
                                    <tr
                                        className={rowStyle(item, index, true) + ' h-12'}
                                    >

                                        {actions(item)}

                                    </tr>
                                }
                            </EntityContext.Provider>
                        </React.Fragment>
                        :
                        <EntityContext.Provider
                            key={item.id}
                            value={{
                                entity: item
                            }}
                        >
                            <tr
                                className={rowStyle(item, index, true)}
                            >

                                {drag(item)}
                                {itemSelection(item)}
                                {rowNumber(index)}
                                {clonedCells(item)}
                                {actions(item)}

                            </tr>
                        </EntityContext.Provider>
                    )
                :
                null
        }
    </tbody>

    return <>

        {
            data.length === 0
                ?
                null
                :
                <Collapse
                    in={showTopPagiation}
                    className="w-full"
                >
                    <div className="w-full px-6">
                        <Pagination />
                    </div>
                </Collapse>
        }
        <div
            className={"relative w-full rounded-lg overflow-x-auto"}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <TableContext.Provider
                value={{
                    hasMoreRoom: !menuForActions && separateRowForActions && !hiddenEntityActions
                }}>
                <table
                    className="w-full ptable-1"
                    style={{ minWidth: '600px' }}
                >
                    {head}
                    {body}
                </table>
            </TableContext.Provider >
        </div>
        {
            data.length === 0
                ?
                null
                :
                !isBrowse
                &&
                <div className="pt-8 w-full px-6">
                    <Pagination />
                </div>
        }
    </>
}

export default Table
