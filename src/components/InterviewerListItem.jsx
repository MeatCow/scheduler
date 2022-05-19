import React from 'react'
import "components/styles/InterviewerListItem.scss"
import classNames from 'classnames';

const InterviewerListItem = (props) => {
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClasses = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": selected,
  });

  return (
    <li
      onClick={setInterviewer}
      className={interviewerClasses}>
      <img
        className='interviewers__item-image'
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}

export default InterviewerListItem