import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { Modal, Form, Input, Button, Table, Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createDiscussionBoard, getDiscussionBoard, getDiscussionBoards, deleteDiscussionBoard } from '../../Utils/requests';


export default function DiscussionBoardTab({searchParams, setSearchParams, classroomId}){
  const [discussionBoardList, setDiscussionBoardList] = useState([]);
  const [tab, setTab] = useState(
    searchParams.has('tab') ? searchParams.get('tab') : 'home'
  );
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );
  
  const [openState, setOpenState] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


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

    
  const wsColumn = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        editable: true,
        width: '30%',
        align: 'left',
        render: (_, key) => key.title,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        editable: true,
        width: '40%',
        align: 'left',
        render: (_, key) => key.description,
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


  return (
      <div>
        <div id='page-header'>
          <div id="display-code-modal">
            <button id="display-code-btn" onClick={() => {setOpenState(true)}}>
              Create Discussion Board
            </button>
          </div>
          <h1>Disscussion Boards</h1>
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
        </div>
        
        {openState &&      
          <Modal
          title="Create Discussion"
          open={openState}
          width="35vw"
          onCancel={() => {setOpenState(false);}}
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
          </Modal>}
      </div>
  )
}