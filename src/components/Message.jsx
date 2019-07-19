import React from 'react'

export default function Message({ message, selectedHandler, readHandler, starHandler }) {

  // build classname if message has been read or not
  let readClassName = ''
  message.read ? readClassName = 'row message read' : readClassName = 'row message unread'
  // add selected status to input/checkbox field
  let checkStatus = ''
  message.selected ? checkStatus = 'checked' : checkStatus = ''
  // add selected to classname is selected, or remove if not
  message.selected ? readClassName += ' selected' : readClassName.replace(/\bselected\b/g ,'')

  return (
    // onClick/onChange functions send message ID back to App.js when interacted with
    <div className={`${readClassName}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={`${checkStatus}`} onChange={() => selectedHandler(message.id)}/>
          </div>
          <div className="col-xs-2" onClick={() => starHandler(message.id)}>
            {message.starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map( label => {
          return (
            <span className="label label-warning">{label}</span>
          )
        })}
        <a href="#" onClick={() => readHandler(message.id)}>
          {message.subject}
        </a>
      </div>
    </div>
  )
}
