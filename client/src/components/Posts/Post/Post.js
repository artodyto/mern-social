import React from 'react';
import moment from 'moment';
import { Card, Divider, Image, Button, Menu, Dropdown } from 'antd';
import { deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import { EllipsisOutlined } from '@ant-design/icons';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();

    const menu = (
        <Menu>
          <Menu.Item>
            <a style={{width: 100}} onClick={(e) => updatePost(e)}>Edit</a>
          </Menu.Item>
        </Menu>
    );

    const showOptions = (
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <EllipsisOutlined />
            </a>
        </Dropdown>
    );

    const updatePost = (e) => {
        e.preventDefault();
        setCurrentId(post._id);
    }

    return (
        <Card title={post.creator} extra={showOptions} style={{ width: 300, margin: "1rem auto" }}>
            <h6>{moment(post.createdAt).fromNow()}</h6>
            <Divider />
            <p>{post.message}</p>
            
            {(post.selectedFile) ? <Image src={post.selectedFile} /> : ""}
            <Divider />
            <div className="d-flex justify-content-around align-items-center">
                <Button type="link">Like</Button>
                <Divider type="vertical" />
                <Button type="link" onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
            </div>
        </Card>
    )
}

export default Post;