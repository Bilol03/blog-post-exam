import { User } from './users.model';
import { Blog } from './blogs.models';
import { Post } from './post.models';
import { Comment } from './comments.model';
import { BlogUser } from './blog_user.model';

User.belongsToMany(Blog, { through: BlogUser, foreignKey: 'user_id' });
Blog.belongsToMany(User, { through: BlogUser, foreignKey: 'blog_id' });

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Blog.hasMany(Post, { foreignKey: 'blog_id' });
Post.belongsTo(Blog, { foreignKey: 'blog_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
