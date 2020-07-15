import React from 'react'
import { useForm } from 'react-hook-form'
import { Segment } from 'semantic-ui-react'
import { Radio } from 'antd'

export default () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <React.Fragment>
      <h1>สร้างคำถาม</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Segment>
          ประเภทคำถาม
          <Radio.Group defaultValue='a' buttonStyle='solid'>
            <Radio.Button value='a'>ปรนัย</Radio.Button>
            <Radio.Button value='d'>อัตนัย</Radio.Button>
          </Radio.Group>
        </Segment>
        <Segment>wowss</Segment>
        <input name='firstName' ref={register} />
        <select name='gender' ref={register}>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>
        <input type='submit' />
      </form>
    </React.Fragment>
  )
}
