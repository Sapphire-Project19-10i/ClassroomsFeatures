import { Button, Form, Input, message, Modal, DatePicker } from "antd"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  getLessonModule,
  updateLessonModule,
} from "../../../Utils/requests"
import ActivityEditor from "../ActivityEditor/ActivityEditor"
import moment from 'moment';
import "./LessonEditor.less"
import TextEditor from "../../../components/TextEditor"

export default function LessonEditor({
  learningStandard,
  viewing,
  setViewing,
  tab,
  page,
}) {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState(learningStandard.name)
  const [description, setDescription] = useState("")
  const [standards, setStandards] = useState("")
  const [link, setLink] = useState("")
  const [linkError, setLinkError] = useState(false)
  const [displayName, setDisplayName] = useState(learningStandard.name)
  const [releaseDate, setReleaseDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams()

  const showModal = async () => {
    setVisible(true)
    const res = await getLessonModule(learningStandard.id)
    setName(res.data.name)
    setDescription(res.data.expectations)
    setStandards(res.data.standards)
    setLink(res.data.link)
    setReleaseDate(res.data.releaseDate ? moment(res.data.releaseDate) : null);
    setCloseDate(res.data.closeDate ? moment(res.data.closeDate) : null);
    setLinkError(false)
  }

  useEffect(() => {
    setDisplayName(learningStandard.name)
  }, [learningStandard.name])

  const handleCancel = () => {
    setVisible(false)
  }

  const handleSubmit = async () => {
    if (link) {
      const goodLink = checkURL(link)
      if (!goodLink) {
        setLinkError(true)
        message.error("Please Enter a valid URL starting with HTTP/HTTPS", 4)
        return
      }
    }
    const response = await updateLessonModule(
      learningStandard.id,
      name,
      description,
      standards,
      link,
      releaseDate,
      closeDate
    )
    if (response.err) {
      message.error("Fail to update lesson")
    } else {
      message.success("Update lesson success")
      setDisplayName(name)
      setSearchParams({ tab, page, activity: response.data.id })
      setViewing(response.data.id)
      setVisible(false)
    }
  }

  const checkURL = n => {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
    if (n.search(regex) === -1) {
      return null
    }
    return n
  }

  return (
    <div>
      <button id="link-btn" onClick={showModal}>
        {displayName}
      </button>
      <Modal
        title="Lesson Editor"
        open={visible}
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
          <Form.Item id="form-label" label="Lesson Name">
            <Input
              onChange={e => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter lesson name"
            />
          </Form.Item>
          <Form.Item id="form-label" label="Description">
            <TextEditor
                rows={3}
                required
                onChange={e => setDescription("<h1>helloworld</h1>")}
                value={description}
                placeholder="Enter lesson description"
              />
          </Form.Item>
          <Form.Item id="form-label" label="Standards">
            <Input
              onChange={e => setStandards(e.target.value)}
              value={standards}
              required
              placeholder="Enter lesson standards"
            />
          </Form.Item>
          <Form.Item id="form-label" label="Release Date">
            <DatePicker
              value={releaseDate}
              onChange={(date) => setReleaseDate(date)}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item id="form-label" label="Close Date">
            <DatePicker
              value={closeDate}
              onChange={(date) => setCloseDate(date)}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Link to Additional Resources (Optional)">
            <Input
              onChange={e => {
                setLink(e.target.value)
                setLinkError(false)
              }}
              style={linkError ? { backgroundColor: "#FFCCCC" } : {}}
              value={link}
              placeholder="Enter a link"
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
              Next
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
      </Modal>
      {!visible ? (
        <ActivityEditor
          learningStandard={learningStandard}
          viewing={viewing}
          setViewing={setViewing}
          page={page}
          tab={tab}
        />
      ) : null}
    </div>
  )
}
