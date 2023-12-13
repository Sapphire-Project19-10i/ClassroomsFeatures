import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { Modal, Form, Input, Button, Table, Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createDiscussionBoard, getDiscussionBoard, getDiscussionBoards, deleteDiscussionBoard, createDiscussionPost, getDiscussionPost, deleteDiscussionPost } from '../../Utils/requests';


export default function DiscussionBoardTab({searchParams, setSearchParams, classroomId}){
  const [discussionBoardList, setDiscussionBoardList] = useState([]);
  const [discussionPostList, setDiscussionPostList] = useState([]);
  const [tab, setTab] = useState(
    searchParams.has('tab') ? searchParams.get('tab') : 'home'
  );
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );
  
  const [openState, setOpenState] = useState(false);
  const [openStateModalDB, setOpenStateModalDB] = useState(false);
  const [openStateModalDP, setOpenStateModalDP] = useState(false);
  
  const [dbTitle, setDbTitle] = useState('');
  const [dbId, setDbId] = useState(0);
  
  const [title_modal, setTitle_modal] = useState('');
  const [description_modal, setDescription_modal] = useState('');
  
  const [name_modal, setName_modal] = useState('');
  const [content_modal, setContent_modal] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      let wsResponse;
      if(classroomId){
        wsResponse = await getDiscussionBoard(classroomId);
        setDiscussionBoardList(wsResponse.data);
      }
      else{
        wsResponse = await getDiscussionBoards();
      }
    };
    fetchData();
  }, [classroomId]);
  
  
  const handleCreateDiscussionBoard = async () => {
    let wsResponse = await createDiscussionBoard(title_modal, description_modal, classroomId);
    if(wsResponse.err){
      message.error("Fail to create discussion");
    }
    else{
      message.success("Successfully created discussion");
      wsResponse = await getDiscussionBoard(classroomId);
      setDiscussionBoardList(wsResponse.data);
      setOpenStateModalDB(false);
      setTitle_modal('');
      setDescription_modal('');
    }
  };
  
  
  const handleRetrieveDiscussionPosts = async (id, title) => {
    let wsResponse = await getDiscussionPost(id);
    if(wsResponse.err){
      message.error("Fail to retrieve discussion posts");
    }
    else{
      setDiscussionPostList(wsResponse.data);
      setDbTitle(title);
      setDbId(id);
    }
  };
  
  
  const handleCreateDiscussionPost = async () => {
    let wsResponse = await createDiscussionPost(name_modal, content_modal, dbId);
    if(wsResponse.err){
      message.error("Fail to create post");
    }
    else{
      message.success("Successfully created post");
      wsResponse = await getDiscussionPost(dbId);
      setDiscussionPostList(wsResponse.data);
      setOpenStateModalDP(false);
      setName_modal('');
      setContent_modal('');
    }
  };


  const dbColumn = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        editable: true,
        width: '25%',
        align: 'left',
        render: (_, key) => key.title,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        editable: true,
        width: '35%',
        align: 'left',
        render: (_, key) => key.description,
      },
      {
        title: 'Created Time',
        dataIndex: 'created_at',
        key: 'created_at',
        editable: true,
        width: '20%',
        align: 'left',
        render: (_, key) => key.created_at.substring(0, key.created_at.indexOf('T')),
      },
      {
        title: 'See posts',
        dataIndex: 'See posts',
        key: 'See posts',
        width: '10%',
        align: 'right',
        render: (_, key) => (
            <button id={'link-btn'} onClick = {() => {handleRetrieveDiscussionPosts(key.id, key.title);setOpenState(true);}}>See posts</button>
        ),
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        width: '10%',
        align: 'right',
        render: (_, key) => (
          <Popconfirm
            title={'Are you sure you want to delete this discussion board?'}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={async () => {
              const res = await deleteDiscussionBoard(key.id);
              if (res.err) {
                message.error(res.err);
              } else {
                setDiscussionBoardList(
                  discussionBoardList.filter((db) => {
                    return db.id !== key.id;
                  })
                );
                message.success('Delete success');
              }
            }}
          >
            <button id={'link-btn'}>Delete</button>
          </Popconfirm>
        ),
      },
  ];
  
  
  const dpColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '20%',
      align: 'left',
      render: (_, key) => key.name,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      editable: true,
      width: '50%',
      align: 'left',
      render: (_, key) => key.content,
    },
    {
      title: 'Created Time',
      dataIndex: 'created_at',
      key: 'created_at',
      editable: true,
      width: '20%',
      align: 'left',
      render: (_, key) => key.created_at.substring(0, key.created_at.indexOf('.')).replace('T', ' '),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      width: '10%',
      align: 'right',
      render: (_, key) => (
        <Popconfirm
          title={'Are you sure you want to delete this post?'}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteDiscussionPost(key.id);
            if(res.err){
              message.error(res.err);
            }
            else{
              setDiscussionPostList(
                discussionPostList.filter((dp) => {
                  return dp.id !== key.id;
                })
              );
              message.success('Delete success');
            }
          }}
        >
          <button id={'link-btn'}>Delete</button>
        </Popconfirm>
      ),
    },
  ];
  
  
  const dbModal = (
    <Modal
      title="Create Discussion"
      open={openStateModalDB}
      width="35vw"
      onCancel={() => {setOpenStateModalDB(false)}}
      footer={null}
    >
      <Form
        id="add-units"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={handleCreateDiscussionBoard}
        layout="horizontal"
        size="default"
      >
        <Form.Item id="form-label" label="Discussion Title">
          <Input
            onChange={e => setTitle_modal(e.target.value)}
            value={title_modal}
            placeholder="Enter discussion title"
            required
          />
        </Form.Item>
        <Form.Item id="form-label" label="Description">
          <Input.TextArea
            rows={3}
            onChange={e => setDescription_modal(e.target.value)}
            value={description_modal}
            placeholder="Enter discussion description"
            required
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          style={{ marginBottom: "0px" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="content-creator-button"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
  
  
  const dpModal = (
    <Modal
      title="Make Post"
      open={openStateModalDP}
      width="35vw"
      onCancel={() => {setOpenStateModalDP(false);}}
      footer={null}
    >
      <Form
        id="add-units"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={handleCreateDiscussionPost}
        layout="horizontal"
        size="default"
      >
        <Form.Item id="form-label" label="Name">
          <Input
            onChange={e => setName_modal(e.target.value)}
            value={name_modal}
            placeholder="Enter your name"
            required
          />
        </Form.Item>
        <Form.Item id="form-label" label="Content">
          <Input.TextArea
            rows={3}
            onChange={e => setContent_modal(e.target.value)}
            value={content_modal}
            placeholder="Enter content here"
            required
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          style={{ marginBottom: "0px" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="content-creator-button"
          >
            Post
          </Button>
        </Form.Item>
      </Form>
    </Modal> 
  );
  

  return (
      <div>
        <div id='page-header'>
          <div id="display-code-modal">
            <button id="display-code-btn" onClick={() => {openState ? setOpenState(false) : setOpenStateModalDB(true);}}>
              {openState ? 'Return To Panel' : 'Create Discussion Board'}
            </button>
          </div>
          <h1>{openState ? dbTitle : 'Discussion Boards'}</h1>
        </div>
        <div id='content-creator-table-container' style={{ marginTop: '6.6vh' }}>
          <Table
            columns={openState ? dpColumn : dbColumn}
            dataSource={openState ? discussionPostList : discussionBoardList}
            rowClassName='editable-row'
            rowKey='id'
            onChange={(Pagination) => {
              setPage(Pagination.current);
              setSearchParams({ tab, page: Pagination.current });
            }}
            pagination={{ current: page ? page : 1 }}
          ></Table>
          {openState &&
            <Button
              size="large"
              className="content-creator-button"
              onClick={() => {setOpenStateModalDP(true);}}
              style={{ float: 'none' }}
            >
              Create Post
            </Button>
          }
        </div>
        {dbModal}
        {dpModal}
      </div>
  );
}