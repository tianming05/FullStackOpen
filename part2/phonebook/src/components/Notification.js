import React from 'react'

const Notification = props => {
  if (props.message.msgContent === null) {
    return null
  }
	else if(props.message.msgType === "notification"){
		return (
			<div className="notification">
				{props.message.msgContent}
			</div>
		)
	}
	else if(props.message.msgType === "error"){
		return (
			<div className="error">
				{props.message.msgContent}
			</div>
		)
	}
	else{
		return null;
	}
}

export default Notification;