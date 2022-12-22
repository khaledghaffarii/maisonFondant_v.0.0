import Blog from './Blog';
import NewBlog from './NewBlog'
import EditBlog from './EditBlog'
import ArchiveBlog from './ArchiveBlog';
import DetailsBlog  from './DetailsBlog'
export const BlogConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/blog',
            component: Blog
        },
        {
            path     : '/newBlog',
            component: NewBlog
        },
        {
            path     : '/editBlog/:id',
            component : EditBlog
        },
        {
            path     : '/archiveBlog',
            component : ArchiveBlog
        },
        {
            path     : '/detailsBlog/:id',
            component : DetailsBlog
        }
        
    ]
};

