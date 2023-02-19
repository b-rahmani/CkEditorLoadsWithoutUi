import app from 'App'
import HouseIcon from '@mui/icons-material/House'
import { Link } from 'react-router-dom'

const Page = ({
    children,
    className,
    details,
    title,
    breadcrumbItems
}) => {

    return <>
        <div className={"mt-6 px-4 pb-72 " + className}  >
            <div className="flex items-center justify-between gap-6 mb-5">
                <h2 className="text-xl dark:text-white">{app.t(title)}</h2>
                <p className="hidden md:flex text-xs dark:text-white ">{app.t(details)}</p>
                <hr className="grow" />
            </div>
            {
                breadcrumbItems &&
                <div className="flex mx-4 items-center justify-between gap-6 mb-5 text-xs">
                    <div className='flex items-center'>
                        <span className="link">
                            <Link to="/">
                                <HouseIcon fontSize='small' />
                            </Link>
                        </span>
                        {
                            breadcrumbItems?.map((item, index) => <span
                                className={`${item.title ?? "hidden"}`}
                                key={index}
                            >
                                <span
                                    className={`mx-2 ${item.title ?? "hidden"}`}
                                    style={{
                                        fontSize: '10px'
                                    }}
                                >/</span>
                                <span className="link">
                                    {
                                        item.link ?
                                            <Link to={item.link}>
                                                {app.t(item.title)}
                                            </Link> :
                                            <span>
                                                {app.t(item.title)}
                                            </span>
                                    }
                                </span>
                            </span>
                            )
                        }
                    </div>
                </div>
            }
            <div className="pageContent">
                {children}
            </div>
        </div>
    </>
}

export default Page
