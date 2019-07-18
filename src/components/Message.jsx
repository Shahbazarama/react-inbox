import React from 'react'

export default function Message({ message }) {
  let readClassName = ''
  message.read ? readClassName = 'row message read' : readClassName = 'row message unread'

  return (
    <div className={`${readClassName}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            {/* message.checked = true/false */}
            {/* if checked="checked" */}
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
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
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  )
}
