import React from 'react';
import { useSelector } from 'react-redux';
import { Spin, Layout } from 'antd';

import Post from './Post/Post';

const Posts = ({setCurrentId}) => {
    const { Content } = Layout;
    const posts = useSelector((state) => state.posts);
    
    return (
        <Content>
 
            
            {(!posts.length) ? <Spin /> : (
                <Content>
                    {posts.map((post) => (
                        <Content key={post._id}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Content>
                    ))}
                </Content>
            )}

  
        </Content>
    )
}

export default Posts;