import MaterialIcon from '@mui/material/Icon';

const Icon = ({ icon, progress, className }) => {
    const styles = className ?? "";
    switch (typeof icon) {
        case 'object':
            const iconType = typeof icon?.type;
            if (
                iconType === 'function'
                ||
                (
                    iconType === 'object'
                    &&
                    typeof icon.type?.render === 'function'
                )) {
                let props = {}
                if (progress) {
                    props = { color: 'disabled' }
                }
                const PassedIcon = icon
                return <PassedIcon
                    className={styles}
                    {...props}
                />;
            }
            if (icon.props) {
                return icon;
            }
            return <>{icon}</>;
        case 'function':
            return icon()
        case 'string':
            if (icon.indexOf('svg') > -1) {
                return <span className={styles}>{icon}</span>;
            }
            return <MaterialIcon className={styles}>{icon}</MaterialIcon>;
        default:
            return <span className={styles}>Iconless</span>;
    }
}

export default Icon
