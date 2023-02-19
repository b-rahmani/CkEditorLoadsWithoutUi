import {
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import app from 'App'
import { useLocalStorageState } from 'Hooks'
import { useList } from 'Hooks'
import Filtering from './Filtering'
import Sorting from './Sorting'
import Entities from './Entities'
import ListActions from './ListActions/ListActions'
import { ListContext } from 'Contexts'
// import Reload from './Reload'
import Drawer from '../Drawer'
import { DrawerTypes } from '../Drawer'
import Page from '../Page/Page';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import Reload from './Reload'

const List = ({
  breadcrumbItems,
  card,
  classProvider,
  create,
  dialogs,
  edit,
  emptyCta,
  entityActions,
  entityType,
  expanded,
  filters,
  hasDelete,
  hasEdit,
  hasSearch,
  headers,
  isTree,
  listActions,
  menuForActions,
  multicolumn,
  numbered,
  row,
  separateRowForActions,
  show,
  sorts,
  subtitle,
  title,
  upsert,
  upsertionIcon,
  upsertionText,
}) => {

  const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer"
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.camelize(entityType)}_isFilteringOpen`)
  const [hiddenEntityActions, setHiddenEntityActions] = useLocalStorageState(false, `${app.camelize(entityType)}_isEntityActionsHidden`)
  const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.camelize(entityType)}_isTopPaginationShown`)

  const hasItemSelection = listActions ? true : false
  // const { setTitle, setSubtitle, setBreadcrumbItems } = useContext(TopContext)
  let [searchParams] = useSearchParams();
  const [dialogProps, setDialogProps] = useState({})

  const filterablesCount = (filters ? (filters.props.children.map ? filters.props.children.length : 1) : 0) + ((app.isDev() || app.isSuperAdmin()) ? 1 : 0)
  const {
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
    reload,
    reloadEntity,
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
    usedFilters,
  } = useList({
    entityType,
    filterablesCount,
    isTree,
  })

  useEffect(() => {
    // console.log(selectedEntities)
  }, [selectedEntities])

  // useEffect(() => {
  //   setTitle(title)
  //   setSubtitle(subtitle)
  //   setBreadcrumbItems(breadcrumbItems)
  // }, [title, subtitle, breadcrumbItems])

  return <ListContext.Provider value={{
    card,
    classProvider,
    create,
    data,
    deselectEntities,
    deselectEntity,
    dialogProps,
    edit,
    entityActions,
    entityType,
    expanded: expanded || true,
    filters,
    hasData,
    hasDelete,
    hasEdit,
    hasGuid,
    hasItemSelection,
    hasKey,
    hasFilters,
    hasOrder,
    hasSlug,
    headers,
    hiddenEntityActions,
    isFilteringOpen,
    isTree,
    listActionIconStyle,
    listActions,
    loading,
    menuForActions,
    metadata,
    multicolumn,
    numbered,
    reload,
    reloadEntity,
    resetFilters,
    row,
    selectedEntities,
    selectEntities,
    selectEntity,
    separateRowForActions,
    setDialogProps,
    setEntity,
    setEntityActionProgress,
    setEntityProgress,
    setFilter,
    setFilterable,
    setHiddenEntityActions,
    setIsFilteringOpen,
    setPageNumber,
    setPageSize,
    setSorts,
    setTopPaginationVisibility,
    show,
    showTopPagiation,
    upsert,
    upsertionIcon,
    upsertionText,
    usedFilters,
  }}>

    <Page
      title={title}
      details={subtitle}
      className="list"
      breadcrumbItems={breadcrumbItems}
    >

      <Drawer
        isOpen={isFilteringOpen}
        click={() => setIsFilteringOpen(!isFilteringOpen)}
        type={DrawerTypes.filter}>
        <Filtering close={() => setIsFilteringOpen(false)} />
      </Drawer>
      <div className="flex flex-wrap justify-between items-center bg-[#8493b5] p-4 rounded-md">
        {
          hasSearch &&
          <div className="w-full md:w-2/6 h-10 bg-white rounded-md flex items-center overflow-hidden">
            <SearchOutlinedIcon
              className="w-6 h-6 cursor-pointer mx-2"
              onClick={() => { }}
            />
            {/* change when add i18n ${direction==="rtl"?"placeholder:text-right":"placeholder:text-left"} */}
            <input
              type="text"
              className={`w-full block p-2 placeholder:text-right focus:border-none focus:outline-none`}
              placeholder={app.t("Search by name")}
              dir="auto"
              onChange={() => { }}
            />
          </div>
        }
        <div className="mt-4 md:mt-0 justify-end grow flex items-center gap-2">
          <ListActions />
          {
            filters &&
            <button
              className="rounded-md border-white border-2 bg-transparent  px-2 h-10 justify-between gap-2 flex items-center"
              onClick={() => setIsFilteringOpen(true)}>
              <TuneOutlinedIcon className="w-6 h-6 fill-white" />
              <p className="text-white hidden md:block">{app.t("Filters")}</p>
              <span className="text-white hidden md:block">|</span>
              <p className="w-7 h-7  bg-gray-500 flex items-center justify-center text-white rounded-[100%]">
                <span>0</span>
              </p>
            </button>
          }
          <Sorting sorts={sorts} />
          <Reload />
        </div>
      </div>

      <Entities />

    </Page>

  </ListContext.Provider>
}

export default List
