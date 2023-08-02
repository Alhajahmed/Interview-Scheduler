import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment({ time, interview, bookInterview, id, interviewers }) {
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const success = await bookInterview(id, interview);
    if (success) {
      transition(SHOW);
    }
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
    </article>
  )
}