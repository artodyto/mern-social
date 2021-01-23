import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const FormComponent = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id == currentId) : null));
    
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = () => {
        if (currentId === 0) {
            dispatch(createPost(postData));
        } else {
            dispatch(updatePost(currentId, postData));
        }
        onReset();
    }

    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
        
        },
    };

    const tailLayout = {
        wrapperCol: { offset: 4},
    };

    const [form] = Form.useForm();

    const onReset = () => {
        setCurrentId(0);
        setPostData({ creator: '',title: '',message: '',tags: '',selectedFile: '' });
    };

    return (
        <>
            <Form {...layout} form={form} name="Post" onFinish={handleSubmit}>
                <Form.Item label="Creator">
                    <Input value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                </Form.Item>
                <Form.Item label="Title">
                    <Input value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                </Form.Item>
                <Form.Item label="Message">
                    <Input value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                </Form.Item>
                <Form.Item label="Tags">
                    <Input value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{marginRight:"8px"}}>Submit</Button>
                    <Button htmlType="button" onClick={onReset}>Reset</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default FormComponent;