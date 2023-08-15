import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  // Destructure props to get interviewers, value, and onChange
  const { interviewers, value, onChange } = props;

  // Map through interviewers to create InterviewerListItem components
  const interviewerItems = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });

  // Render the InterviewerList section with interviewer items
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className='interviewers__list'>{interviewerItems}</ul>
    </section>
  );
}