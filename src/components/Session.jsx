import React from "react";
import format from "date-fns/format";
import PropTypes from "prop-types";

const Session = ({ session }) => {
  return (
    <div>
      <h3>{session.practice.name}</h3>
      <div>{`Shift date: ${format(new Date(session.startDatetime), "P")}`}</div>
      <div>
        {`Start time: ${format(new Date(session.startDatetime), "Pp")}`}
      </div>
      <div>{`End time: ${session.endDatetime}`}</div>
      <div>{`Hourly rate: £${session.hourlyRate}`}</div>
      <div>{`Number of applicants: ${session.applicationIds.length}`}</div>
    </div>
  );
};

Session.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    startDatetime: PropTypes.string,
    endDatetime: PropTypes.string,
    applicationIds: PropTypes.arrayOf(PropTypes.number),
    practice: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }),
    locum: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    }),
    hourlyRate: PropTypes.number,
    staffType: PropTypes.string,
    staffTypeId: PropTypes.string
  }).isRequired
};

export default Session;
