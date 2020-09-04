import React from "react";
import format from "date-fns/format";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSession = styled.div`
  border: 1px solid black;
  color: black;
  margin: 10px auto;
  padding: 10px;
  width: 90%;
`;

const StyledHeading = styled.h3`
  font-size: 2rem;
`;

const Session = ({ session }) => {
  // I had an issue with session.endDatetime
  // One piece of test data had a month of 13, which meant that creating a new date
  // threw an error. Not sure whether I was missing something in the way the test data
  // is represented, but I wasn't able to investigate further in time. This is why the
  // session end time is unformatted

  // I've gone for showing the start and end times including dates, as some sessions
  // span two days
  return (
    <StyledSession>
      <StyledHeading>{session.practice.name}</StyledHeading>
      <div>{`Shift date: ${format(new Date(session.startDatetime), "P")}`}</div>
      <div>
        {`Start time: ${format(new Date(session.startDatetime), "Pp")}`}
      </div>
      <div>{`End time: ${session.endDatetime}`}</div>
      <div>{`Hourly rate: £${session.hourlyRate}`}</div>
      <div>{`Number of applicants: ${session.applicationIds.length}`}</div>
    </StyledSession>
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
