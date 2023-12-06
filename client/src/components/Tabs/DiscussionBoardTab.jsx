import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { Table, Popconfirm, message } from 'antd';
//import { Modal, Button, Input, Form, Table, Popconfirm, message } from 'antd';
import {createDiscussionBoard, getDiscussionBoard, getDiscussionBoards, getDiscussionPosts, getDiscussionPost } from '../../Utils/requests';

export default function DiscussionBoardTab({searchParams, setSearchParams, classroomId}){
  const [discussionBoardList, setDiscussionBoardList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");


  const handleCreateDiscussionBoard = async e => {
    const res = await createDiscussionBoard(title, content, classroomId)
    if (res.err) {
      message.error("Fail to create new discussion")
    } else {
      message.success("Successfully created discussion")
      setOpenState(false)
    }
  }
  
  
  // const listStyle = {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // width: '1500px',
    // height: '800px',
    // border: '1px solid #ccc',
    // padding: '20px',
    // textAlign: 'center',
    // marginTop: '100px',
    // marginLeft: '100px',
    // background: 'white'
  // };
  // const valueStyle = {
    // backgroundColor: 'teal',
    // color: 'white',
    // padding: '8px',
    // margin: '4px',
    // borderRadius: '4px',
    // borderBottom: '1px solid white',
  // };
  
  // const postSubmit = async e => {
    // const res = await createDiscussionPost(title, description)
    // if (res.err) {
      // message.error("Fail to create a new discussion post")
    // } else {
      // message.success("Successfully created discussion post")
      // setOpenState(false)
    // }
  // }
  // function value(openState, setOpenState){
    // setOpenState(!openState);
  // }


  // const handleCancel = () => {
    // setOpenState(false)
  // }


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
      console.log(wsResponse);
    };
    fetchData();
    
  }, [classroomId]);

    
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
        render: (_, key) => key.created_at.substring(0, key.created_at.indexOf('T')),
        // render: (_, key) => (
          // <Popconfirm
            // title={'Are you sure you want to delete this workspace?'}
            // icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            // onConfirm={async () => {
              // const res = await deleteAuthorizedWorkspace(key.id);
              // if (res.err) {
                // message.error(res.err);
              // } else {
                // setWorkspaceList(
                  // workspaceList.filter((ws) => {
                    // return ws.id !== key.id;
                  // })
                // );
                // message.success('Delete success');
              // }
            // }}
          // >
            // <button id={'link-btn'}>Delete</button>
          // </Popconfirm>
        // ),
      },
  ];


  return (
      <div>
        <div id='page-header'>
          <div id="display-code-modal">
            <button id="display-code-btn" onClick={handleCreateDiscussionBoard} style={{ fontSize: '1.5em' }}>

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
            // onChange={(Pagination) => {
              // setPage(Pagination.current);
              // setSearchParams({ tab, page: Pagination.current });
            // }}
            // pagination={{ current: page ? page : 1 }}
          ></Table>
        </div>
      </div>
  )
}