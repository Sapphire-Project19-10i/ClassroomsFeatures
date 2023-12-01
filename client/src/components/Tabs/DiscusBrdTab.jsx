import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { Modal, Button, Input, Form, Table, Popconfirm, message } from 'antd';
import { createActivity } from '../../Utils/requests';

function value(openState, setOpenState){
    setOpenState(!openState);

}

export default function DiscusBrdTab({searchParams, setSearchParams, classroomId}){
   // const [visible, setVisible] = useState(false) 
    const [openState, setOpenState] = useState(false);
    const [workspaceList, setWorkspaceList] = useState([]);
    const [tab, setTab] = useState(
      searchParams.has('tab') ? searchParams.get('tab') : 'home'
    );
    const [page, setPage] = useState(
      searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
    );
    const handleSubmit = async e => {
     // const res = await createActivity(number, name, standard, description, grade)
    //  if (res.err) {
    //    message.error("Fail to create a new discussion")
   //   } else {
    //    message.success("Successfully created discussion")
    setOpenState(false)
   //   }
    }
    const handleCancel = () => {
      setOpenState(false)
    }
    const wsColumn = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        width: '30%',
        align: 'left',
        render: (_, key) => key.name,
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
        title: 'Student Responses',
        dataIndex: 'open',
        key: 'open',
        editable: false,
        width: '20%',
        align: 'left',
        render: (_, key) => (
          <Link
            onClick={() =>
              localStorage.setItem('sandbox-activity', JSON.stringify(key))
            }
            to={'/sandbox'}
          >
            Open
          </Link>
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
            title={'Are you sure you want to delete this workspace?'}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={async () => {
              const res = await deleteAuthorizedWorkspace(key.id);
              if (res.err) {
                message.error(res.err);
              } else {
                setWorkspaceList(
                  workspaceList.filter((ws) => {
                    return ws.id !== key.id;
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
              <h1>Discussion Boards</h1>
            </div>
            <div>
              <button id ="testButton" onClick = {() => value(openState, setOpenState)} text = "Create">Create   
              </button>
            {!openState}
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

          <Form.Item id="form-label" label="Grade">
            <select
              id="grade-dropdown"
              name="grade"
            //  defaultValue={grade}
              required
            //  onChange={e => setGrade(e.target.value)}
            >

            </select>
          </Form.Item>
          <Form.Item id="form-label" label="Discussion Name">
            <Input
            //  onChange={e => setName(e.target.value)}
            //  value={name}
              placeholder="Enter discussion name"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="Discussion Number">
            <Input
            //  onChange={e => setNumber(e.target.value)}
              type="number"
            //  value={number}
              placeholder="Enter discussion number"
              min={1}
              max={15}
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="Description">
            <Input.TextArea
              rows={3}
            //  onChange={e => setDescription(e.target.value)}
           //   value={description}
              placeholder="Enter discussion description"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="Standards">
            <Input
            //  onChange={e => setStandard(e.target.value)}
            //  value={standard}
              placeholder="Enter discussion standards"
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
          
            <Table
              columns={wsColumn}
              dataSource={workspaceList}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
            </div>
  
          </div>
      ) 
  }