import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import isPast from "date-fns/isPast";
import axios from "axios";
import styled from "styled-components";
import Session from "./Session";

const StyledHeading = styled.h2`
  font-size: 3rem;
  text-align: center;
`;

const SessionList = () => {
  const userStaffType = useSelector((state) => state.user.details.staffTypeId);

  // kept this as local component state, as at the moment
  // the data is only being used by this component
  // it's likely that should the app get more complex, this
  // may need to be elevated to global state if it's accessed
  // by a lot of components
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const getSessionsData = async () => {
      try {
        const sessionsResult = await axios.get(
          "https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions",
          {
            cancelToken: source.token
          }
        );

        setSessions(sessionsResult.data.data);
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log("Sessions get request cancelled");
        } else {
          console.log(e);
        }
      }
    };

    getSessionsData();

    return () => {
      source.cancel("Sessions get request cancelled");
    };
  }, [setSessions]);

  const getFilteredSessions = () => {
    const filteredSessions = sessions.filter((session) => {
      // Not happy with the length of this method, but I ran
      // out of time and was unable to investigate ways of
      // handling multiple tests in a more succinct way that
      // was still easy to read
      if (userStaffType !== session.staffTypeId) {
        return false;
      }

      if (isPast(new Date(session.startDatetime))) {
        return false;
      }

      if (session.status !== "POSTED") {
        return false;
      }

      if (session.locum !== null) {
        return false;
      }

      return true;
    });

    return filteredSessions;
  };

  // there needs to be some kind of error handling in here
  // for dealing with what happens if the component fails to
  // get the sessions data from the API
  // I'd probably introduce an error state variable that
  // is checked at this point and use this to decide whether
  // to display a user friendly error message or not
  if (sessions) {
    return (
      <main>
        <StyledHeading>Session List</StyledHeading>
        {getFilteredSessions().map((session) => (
          <Session
            key={`${session.id}${session.startDatetime}`}
            session={session}
          />
        ))}
      </main>
    );
  } else {
    return <main>Loading sessions</main>;
  }
};

export default SessionList;
