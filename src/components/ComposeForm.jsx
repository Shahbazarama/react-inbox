import React from 'react'

export default function ComposeForm({ displayCompose, submitComposeForm, newMessageBody, newMessageSubject }){

  return (
    <>
    {displayCompose ?
      <div className="container">
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" onChange={(e) => newMessageSubject(e.target.value)} id="subject" placeholder="Enter a subject" name="subject" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control" onChange={(e) => newMessageBody(e.target.value)}></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" onClick={(e) => submitComposeForm(e)} className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
      : null}
    </>
    );
  }
