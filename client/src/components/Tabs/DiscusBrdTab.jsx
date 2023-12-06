import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { Modal, Button, Input, Form, Table, Popconfirm, message } from 'antd';
import {createDiscussionBoard, getDiscussionBoards, getDiscussionBoard, getDiscussionPosts, getDiscussionPost } from '../../Utils/requests';
import {} from '../../Utils/requests';
import '../../../src/views/Home/Home.less';

export default function DiscusBrdTab({searchParams, setSearchParams, classroomId}){
    const [visible, setVisible] = useState(false) 
    const [openState, setOpenState] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");
    const [content, setContent] = useState("");
    const [time, setTime] = useState("");

    const [tab, setTab] = useState(
      searchParams.has('tab') ? searchParams.get('tab') : 'home'
    );
    const [page, setPage] = useState(
      searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
    );
    const handleSubmit = async e => {
      const res = await createDiscussionBoard(title, content)
      if (res.err) {
        message.error("Fail to create a new discussion")
      } else {
        message.success("Successfully created discussion")
        setOpenState(false)
      }
    }
    const listStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '1500px',
      height: '800px',
      border: '1px solid #ccc',
      padding: '20px',
      textAlign: 'center',
      marginTop: '100px',
      marginLeft: '100px',
      background: 'white'
    };
    const valueStyle = {
      backgroundColor: 'teal',
      color: 'white',
      padding: '8px',
      margin: '4px',
      borderRadius: '4px',
      borderBottom: '1px solid white',
    };
    
    const postSubmit = async e => {
      const res = await createDiscussionPost(title, description)
      if (res.err) {
        message.error("Fail to create a new discussion post")
      } else {
        message.success("Successfully created discussion post")
        setOpenState(false)
      }
    }
    function value(openState, setOpenState){
      setOpenState(!openState);
    }
  

    const handleCancel = () => {
      setOpenState(false)
    }

    useEffect(() => {
      const fetchData = async () => {
        let wsResponse = await getDiscussionBoards();
        let list = document.getElementById('discusList');
        
        for(let i = 0; i < wsResponse.data.length; ++i){
            let li = document.createElement('li');
            let val = await getDiscussionBoard(Number(wsResponse.data[i].id));

            li.title = JSON.stringify(val.data.title);
            li.id = JSON.stringify(val.data.id);
            li.description = JSON.stringify(val.data.description);
            li.innerText = JSON.stringify(val.data.title) + JSON.stringify(val.data.description);
            list.appendChild(li);
            li.onclick = async() => {
              let posts = await getDiscussionPosts();
              for(let j = 0; j < posts.data.length; ++j){
                let li1 = document.createElement('li');
                let val1 = await getDiscussionPost(Number(posts.data[i].id));

                list.title = JSON.stringify(val1.data.title);
                li1.id = JSON.stringify(val1.data.id);
                list.description = JSON.stringify(val1.data.description);
                li1.innerText = JSON.stringify(val1.data.title) + JSON.stringify(val1.data.description);
                list.appendChild(li1);
              }
            };
        }
        
      };
      fetchData();
    }, [classroomId]);



      return (
        
          <div>

                <div id='page-header'>
                    <h1>Discussion Boards</h1>
                </div> 
            <div>

              <div id="display-code-modal"> 
                <button id="display-code-btn" onClick={() => value(openState, setOpenState)}>Create</button>
              </div>

              <div id="display-code-modal">
                <button onClick={() => value(openState, setOpenState)}>Post</button>
              </div>

            {openState &&      
            <Modal
        title="Create Discussion"
        open={openState}
        width="35vw"
        onCancel={handleCancel}
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
          onFinish={handleSubmit}
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
              Submit
            </Button>
            <Button
              onClick={handleCancel}
              size="large"
              className="content-creator-button"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
        </Modal>}
          
            </div>   
            
            <div style = {listStyle}> 
              <ul id = "discusList" style = {valueStyle}> 

              </ul>


            </div>  

          </div>

          

      ) 
  }