import * as React from 'react';

export class Posts extends React.Component<IPostsProps, {}> {
  render() {
    return (
      <ul>
        {this.props.posts.map((post: IPost, i: number) =>
          <li key={i}>{post.author}: {post.text}</li>
        )}
      </ul>
    );
  }
}
