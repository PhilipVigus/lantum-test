import React, { useEffect, useState } from "react";
import isPast from "date-fns/isPast";
import axios from "axios";
import styled from "styled-components";
import Session from "./Session";

const StyledHeading = styled.h2`
  font-size: 3rem;
  text-align: center;
`;

const SessionList = () => {
  // should be moved into global state, but I ran out of time
  // I would probably use redux for this, as I find it easier
  // to work with than contexts
  const user = {
    id: "1234",
    firstName: "John",
    lastName: "Doe",
    staffType: "gp",
    staffTypeId: "1"
  };

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
    console.log(sessions);
    const filteredSessions = sessions.filter((session) => {
      // Not happy with the length of this method, but I ran
      // out of time and was unable to investigate ways of
      // handling multiple tests in a more succinct way that
      // was still easy to read
      if (user.staffTypeId !== session.staffTypeId) {
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

    console.log(filteredSessions);
    return filteredSessions;
  };

  const sortByName = () => {
    const sortedArray = sessions.sort((session1, session2) => {
      if (session1.practice.name < session2.practice.name) {
        return -1;
      } else {
        return 1;
      }
    });

    setSessions([...sortedArray]);
  };

  // there needs to be some kind of error handling in here
  // for dealing with what happens if the component fails to
  // get the sessions data from the API
  // I'd probably introduce an error state variable that
  // is checked at this point and use this to decide whether
  // to display a user friendly error message or not
  if (sessions) {
    console.log(sessions);
    return (
      <main>
        <StyledHeading>Session List</StyledHeading>
        <button type="button" onClick={sortByName}>
          Sort
        </button>
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
