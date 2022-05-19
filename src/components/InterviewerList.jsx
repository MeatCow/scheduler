import React from 'react'
import InterviewerListItem from './InterviewerListItem';
import "./styles/InterviewerList.scss"

const InterviewerList = (props) => {
  const { interviewer, interviewers, setInterviewer } = props;

  const formatInterviewers = () => {
    return interviewers.map(thisInterviewer => {
      return <InterviewerListItem
        key={thisInterviewer.id}
        {...thisInterviewer}
        selected={thisInterviewer.id === interviewer}
        setInterviewer={() => setInterviewer && setInterviewer(thisInterviewer.id)}
      />
    });
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{formatInterviewers()}</ul>
    </section>
  )
}

export default InterviewerList