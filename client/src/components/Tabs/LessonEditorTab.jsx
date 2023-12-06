import React, { useState, useEffect } from 'react';

import { Tabs, Table, Popconfirm, message } from 'antd';
import Navbar from '../../components/NavBar/NavBar';
import { QuestionCircleOutlined } from '@ant-design/icons';
import SavedWorkSpaceTab from '../../components/Tabs/SavedWorkspaceTab';
import UnitCreator from '../../views/ContentCreator/UnitCreator/UnitCreator';
import LessonModuleActivityCreator from '../../views/ContentCreator/LessonModuleCreator/LessonModuleCreator';
import {
  getLessonModuleAll,
  deleteLessonModule,
  getGrades,
} from '../../Utils/requests';
import UnitEditor from '../../views/ContentCreator/UnitEditor/UnitEditor';
import LessonEditor from '../../views/ContentCreator/LessonEditor/LessonEditor';
import { useSearchParams } from 'react-router-dom';

//import './LessonEditorTab.less';

const { TabPane } = Tabs;

export default function LessonEditorTab() {
  const [gradeList, setGradeList] = useState([]);
  const [learningStandardList, setLessonModuleList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = useState(
    searchParams.has('tab') ? searchParams.get('tab') : 'home'
  );
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );
  const [viewing, setViewing] = useState(parseInt(searchParams.get('activity')));

  useEffect(() => {
    const fetchData = async () => {
      const [lsResponse, gradeResponse] = await Promise.all([
        getLessonModuleAll(),
        getGrades(),
      ]);
      setLessonModuleList(lsResponse.data);

      const grades = gradeResponse.data;
      grades.sort((a, b) => (a.id > b.id ? 1 : -1));
      setGradeList(grades);

    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <UnitEditor id={key.unit.id} unitName={key.unit.name} linkBtn={true} />
      ),
    },
    {
      title: 'Lesson',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <LessonEditor
          learningStandard={key}
          linkBtn={true}
          viewing={viewing}
          setViewing={setViewing}
          tab={tab}
          page={page}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'expectations',
      key: 'character',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      width: '10%',
      align: 'right',
      render: (_, key) => (
        <Popconfirm
          title={'Are you sure you want to delete this learning standard?'}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteLessonModule(key.id);
            if (res.err) {
              message.error(res.err);
            } else {
              setLessonModuleList(
                learningStandardList.filter((ls) => {
                  return ls.id !== key.id;
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
        <h1>Lessons & Units</h1>
      </div>
      <div id='content-creator-table-container'>
        <div id='content-creator-btn-container'>
          <UnitCreator gradeList={gradeList} />
          <LessonModuleActivityCreator />
        </div>
        <Table
          columns={columns}
          rowClassName='editable-row'
          rowKey='id'
          onChange={(Pagination) => {
            setViewing(undefined);
            setPage(Pagination.current);
            setSearchParams({ tab, page: Pagination.current });
          }}
          pagination={{ current: page ? page : 1 }}
        ></Table>
      </div>
    </div>
  );
}