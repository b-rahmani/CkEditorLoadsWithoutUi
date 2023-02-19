const Dashboard = ({
    breadcrumbItems,
    children,
    subtitle,
    title,
}) => {
    return <>
        <div className="dashboard py-6 px-3">
            {children}
        </div>
    </>
}

export default Dashboard
