import {
    useEffect,
    useState,
} from 'react'
import {
    Route,
    Routes,
    useSearchParams,
} from 'react-router-dom'
import app from 'App'
import NotFound from './NotFound'
import Test from './Test'
import routes from '../Routes'
import Unify from '../Components/Unify'
import { modules } from '../Modules'

const MainRouting = ({ setProgress }) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const [allRoutes, setAllRoutes] = useState(routes)

    useEffect(() => {
        const addRoutes = (module, importResult) => {
            const name = `${module}Routes`
            if (Array.isArray(importResult[name])) {
                const moduleRoutes = importResult[name]
                let newRoutes = []
                for (let i = 0; i < moduleRoutes.length; i++) {
                    const moduleRoute = moduleRoutes[i]
                    if (!allRoutes.find(route => route.path === moduleRoute.path)) {
                        newRoutes.push(moduleRoute)
                    }
                }

                setAllRoutes(previousRoutes => {
                    const combinedRoutes = [...new Set([...previousRoutes, ...newRoutes])]
                        .sort((a, b) => a.path.localeCompare(b.path))
                    return combinedRoutes
                })
            }
        }
        modules.forEach(module => {
            import(`../${module}/Exports.jsx`).then(importResult => {
                addRoutes(module, importResult)
                addRoutes(module, importResult)
            })
        })
    }, [])

    useEffect(() => {
        // console.log(allRoutes)
        window.routes = allRoutes
    }, [allRoutes])

    return (
        <Routes>
            <Route
                path='/test'
                element={<Test />}
            />
            {
                allRoutes.filter(entity => {
                    if (entity.superAdmin === true) {
                        return app.isSuperAdmin()
                    }
                    else {
                        return true
                    }
                }).map(route => {
                    return <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Unify
                                component={route.component}
                                setProgress={setProgress}
                                isSuperAdmin={app.isSuperAdmin()}
                                query={searchParams.toString()}
                            />
                        }
                    />
                })
            }
            <Route
                path='*'
                element={<NotFound />}
            />
        </Routes>
    )
}

export default MainRouting
