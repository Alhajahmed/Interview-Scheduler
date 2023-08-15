import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  // Destructure props to get name, avatar, selected, and setInterviewer
  const { name, avatar, selected, setInterviewer } = props;

  // Create class names using classNames library
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected, // Add 'interviewers__item--selected' class if selected is true
  });

  // Render the InterviewerListItem with the appropriate class and onClick handler
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name} {/* Show the name if selected is true */}
    </li>
  );
};