import React, { useEffect, useState } from "react";
import isPast from "date-fns/isPast";
import axios from "axios";
import Session from "./Session";

const SessionList = () => {
  const user = {
    id: "1234",
    firstName: "John",
    lastName: "Doe",
    staffType: "gp",
    staffTypeId: "1"
  };

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

    return filteredSessions;
  };

  if (sessions) {
    return (
      <main>
        <h2>Session List</h2>
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
