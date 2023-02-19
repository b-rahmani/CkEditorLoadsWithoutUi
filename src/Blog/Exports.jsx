import ArticleIcon from '@mui/icons-material/Article'
import PostHtml from './Form'

const BlogRoutes = [
    {
        path: '/postHtml',
        component: PostHtml
    },
]

const BlogMenu = [
    {
        title: 'Post HTML',
        icon: ArticleIcon,
        url: '/postHtml',
    }
]

export { BlogMenu }
export { BlogRoutes }
