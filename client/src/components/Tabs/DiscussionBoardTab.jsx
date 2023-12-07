import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { Modal, Form, Input, Button, Table, Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createDiscussionBoard, getDiscussionBoard, getDiscussionBoards, deleteDiscussionBoard, createDiscussionPost, getDiscussionPosts, getDiscussionPost } from '../../Utils/requests';


export default function DiscussionBoardTab({searchParams, setSearchParams, classroomId}){
  const [ID, setID] = useState(0);
  const [discussionBoardList, setDiscussionBoardList] = useState([]);
  const [discussionPostList, setDiscussionPostList] = useState([]);
  const [tab, setTab] = useState(
    searchParams.has('tab') ? searchParams.get('tab') : 'home'
  );
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );
  
  const [openState, setOpenState] = useState(false);
  const [openState1, setOpenState1] = useState(false);
  const [openState2, setOpenState2] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");


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
  
  useEffect(() => {
    const fetchData = async () => {
      let wsResponse;
      if(classroomId){
        wsResponse = await getDiscussionPost(ID);

        setDiscussionPostList(wsResponse.data);
      }
      else{
        wsResponse = await getDiscussionPosts();
      }
    };
    fetchData();
  }, [classroomId]);
  
  
  const handleCreateDiscussionBoard = async () => {
    let wsResponse = await createDiscussionBoard(title, description, classroomId);
    if(wsResponse.err){
      message.error("Fail to create discussion");
    }
    else{
      message.success("Successfully created discussion");
      wsResponse = await getDiscussionBoard(classroomId);
      setDiscussionBoardList(wsResponse.data);
      setOpenState(false);
    }
  }

  const handleCreateDiscussionPost = async () => {
    let wsResponse = await createDiscussionPost(name, content, ID);
    if(wsResponse.err){
      message.error("Fail to create discussion post");
    }
    else{
      message.success("Successfully created discussion post");
      wsResponse = await getDiscussionPost(ID);
      setDiscussionPostList(wsResponse.data);
      setOpenState1(false);
    }
  }
  function tempfunc(id){
    setOpenState1(true);
    setID(id);
  }
  function tempfunc2(id){
    setOpenState2(!openState2);
    setID(id);
  }

  const wsColumn = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        editable: true,
        width: '20%',
        align: 'left',
        render: (_, key) => key.title,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        editable: true,
        width: '30%',
        align: 'left',
        render: (_, key) => key.description,
      },
      {
        title: 'Reply',
        dataIndex: 'reply',
        key: 'reply',
        width: '10%',
        align: 'right',
        render: (_, key) => (
            <button id={'link-btn'} onClick = {() => tempfunc(key.id)} >Reply</button>
        ),
      },
      {
        title: 'See posts',
        dataIndex: 'See posts',
        key: 'See posts',
        width: '10%',
        align: 'right',
        render: (_, key) => (
            <button id={'link-btn'} onClick = {() => tempfunc2(key.id)} >See posts</button>
        ),
      },
      {
        title: 'Created Time',
        dataIndex: 'created_at',
        key: 'created_at',
        editable: false,
        width: '20%',
        align: 'left',
        render: (_, key) => key.created_at.substring(0, key.created_at.indexOf('T')),
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
  
  const postColumn = [
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
      title: 'Post',
      dataIndex: 'post',
      key: 'post',
      editable: true,
      width: '30%',
      align: 'left',
      render: (_, key) => key.post,
    },
    {
      title: 'Created Time',
      dataIndex: 'created_at',
      key: 'created_at',
      editable: false,
      width: '20%',
      align: 'left',
      render: (_, key) => key.time,
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
            const res = await deleteDiscussionPost(key.id);
            if (res.err) {
              message.error(res.err);
            } else {
              setDiscussionPostList(
                discussionPostList.filter((db) => {
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

  return (
      <div>
        <div id='page-header'>
          <div id="display-code-modal">
            <button id="display-code-btn" onClick={() => {setOpenState(true)}}>
              Create Discussion Board
            </button>
          </div>
          <h1>Discussion Boards</h1>
        </div>
        <div
          id='content-creator-table-container'
          style={{ marginTop: '6.6vh' }}
        >
          
          <Table
            columns={wsColumn}
            dataSource={discussionBoardList}
            rowClassName='editable-row'
            rowKey='id'
            onChange={(Pagination) => {
              setPage(Pagination.current);
              setSearchParams({ tab, page: Pagination.current });
            }}
            
            pagination={{ current: page ? page : 1 }}
          ></Table>
          {openState2 && <Table
            columns={postColumn}
            dataSource={discussionPostList}
            rowClassName='editable-row'
            rowKey='id'
            onChange={(Pagination) => {
              setPage(Pagination.current);
              setSearchParams({ tab, page: Pagination.current });
            }} 
            
            pagination={{ current: page ? page : 1 }}
          ></Table> }
        </div>
          <Modal
          title="Create Discussion"
          open={openState}
          width="35vw"
          onCancel={() => {setOpenState(false)}}
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
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter discussion title"
                  required
                />
              </Form.Item>
              <Form.Item id="form-label" label="Description">
                <Input.TextArea
                  rows={3}
                  onChange={e => setDescription(e.target.value)}
                  value={description}
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
          
          <Modal
          title="Make Post"
          open={openState1}
          width="35vw"
          onCancel={() => {setOpenState1(false);}}
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
                  onChange={e => setName(e.target.value)}
                  value={name}
                  placeholder="Enter your name"
                  required
                />
              </Form.Item>
              <Form.Item id="form-label" label="Reply">
                <Input.TextArea
                  rows={3}
                  onChange={e => setContent(e.target.value)}
                  value={content}
                  placeholder="Enter reply here"
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
          
      </div>
  )
}