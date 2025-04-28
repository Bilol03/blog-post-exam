import { User } from './users.model';
import { Blog } from './blogs.models';
import { Post } from './post.models';
import { Comment } from './comments.model';
import { BlogUser } from './blog_user.model';


BlogUser.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
BlogUser.belongsTo(Blog, { foreignKey: 'blog_id', as: 'blog' })

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Blog.hasMany(Post, { foreignKey: 'blog_id' });
Post.belongsTo(Blog, { foreignKey: 'blog_id', as: 'blog' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post'});

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: "user"});
