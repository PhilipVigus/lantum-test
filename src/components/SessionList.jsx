import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import isPast from "date-fns/isPast";
import axios from "axios";

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

      return true;
    });

    return filteredSessions;
  };

  if (sessions) {
    return (
      <main>
        <h2>Session List</h2>
        {getFilteredSessions().map((session) => {
          return (
            <div key={`${session.id}${session.startDatetime}`}>
              <h3>{session.practice.name}</h3>
              <div>
                {`Shift date: ${format(new Date(session.startDatetime), "P")}`}
              </div>
              <div>
                {`Start time: ${format(new Date(session.startDatetime), "Pp")}`}
              </div>
              <div>{`End time: ${session.endDatetime}`}</div>
              <div>{`Hourly rate: £${session.hourlyRate}`}</div>
              <div>{`Number of applicants: ${session.applicationIds.length}`}</div>
            </div>
          );
        })}
      </main>
    );
  } else {
    return <main>Loading sessions</main>;
  }
};

export default SessionList;
