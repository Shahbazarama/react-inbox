import React from 'react'

export default function Toolbar({ composeButton, markAsRead, markAsUnread, markAsChecked, applyLabel, removeLabel, deleteMessages, anyChecked, noneChecked, unreadCount}) {

  let iconClassName = ''
  anyChecked() ? iconClassName = 'fa fa-minus-square-o' : iconClassName = 'fa fa-check-square-o'
  let noneCheckedBool = false
  noneChecked() ?  noneCheckedBool = true : noneCheckedBool = false
  if(noneCheckedBool){
    iconClassName = 'fa fa-square-o'
  }

  let applyLabelRef = React.createRef()
  let removeLabelRef = React.createRef()
  function helper() {
    applyLabelRef.current.selectedIndex = 0
    removeLabelRef.current.selectedIndex = 0
  }

  return (
    <div className="container">
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadCount()}</span>
            unread messages
          </p>

          <button className="btn btn-danger" onClick={() => composeButton()}>
            <i className="fa fa-plus"></i>
          </button>

          <button className="btn btn-default" onClick={() => markAsChecked()}>
            <i className={`${iconClassName}`}></i>
          </button>

          <button className="btn btn-default" onClick={() => markAsRead()} disabled={noneCheckedBool}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => markAsUnread()} disabled={noneCheckedBool}>
            Mark As Unread
          </button>

          <select ref={applyLabelRef} className="form-control label-select" onChange={(e) => {applyLabel(e.target.value); helper()}} disabled={noneCheckedBool}>
            <option selected>Apply Label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select ref={removeLabelRef} className="form-control label-select" onChange={(e) => {removeLabel(e.target.value); helper()}} disabled={noneCheckedBool}>
            <option selected>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={() => deleteMessages()} disabled={noneCheckedBool}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
