import React, { useEffect, useState } from 'react';
import { Layout, Button, Card, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import FormComponent from './components/Form/Form';

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const [ currentId, setCurrentId ] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    console.log('this was use effect on app js');
  }, [currentId, dispatch])

  const [isModalVisible, setIsModalVisible] = useState(false);
    
  const showModal = () => {
      setIsModalVisible(true);
  };
  
  const handleCancel = () => {
      setIsModalVisible(false);
  };

  return (
    <Layout>
        <Content>
          <Card style={{margin: 'auto', width: 300}}>
            <div className="d-flex justify-content-between">
                <Avatar icon={<UserOutlined />}  style={{marginRight: '0.5rem', width: 40}} />
                <Button style={{width: '100%', textAlign:'left'}} shape="round" onClick={() => showModal()}>What's on your mind.</Button>
            </div>
          </Card>
          <Posts setCurrentId={setCurrentId}/>
        </Content>
      <Modal title="Create Post" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <FormComponent currentId={currentId} setCurrentId={setCurrentId} />
      </Modal>
    </Layout>
  );
}

export default App;
