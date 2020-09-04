import React from "react";
import format from "date-fns/format";

const SessionList = () => {
  const sessions = [
    {
      id: "1243",
      status: "POSTED",
      startDatetime: "2020-11-19T16:50:00+00:00",
      endDatetime: "2020-11-19T19:15:00+00:00",
      applicationIds: [],
      practice: { id: "23314", name: "Grant Tree Medical Centre" },
      locum: null,
      hourlyRate: 85,
      staffType: "gp",
      staffTypeId: "1"
    },
    {
      id: "1242",
      status: "POSTED",
      startDatetime: "2020-09-14T08:40:00+00:00",
      endDatetime: "2020-09-14T18:30:00+00:00",
      applicationIds: [5509, 5503],
      practice: { id: "199120", name: "West London Clinic" },
      locum: null,
      hourlyRate: 100,
      staffType: "gp",
      staffTypeId: "1"
    }
  ];

  return (
    <main>
      <h2>Session List</h2>
      {sessions.map((session) => (
        <div key={session.id}>
          <h3>{session.practice.name}</h3>
          <div>
            {`Shift date: ${format(new Date(session.startDatetime), "P")}`}
          </div>
          <div>
            {`Start time: ${format(new Date(session.startDatetime), "Pp")}`}
          </div>
          <div>
            {`End time: ${format(new Date(session.endDatetime), "Pp")}`}
          </div>
          <div>{`Hourly rate: £${session.hourlyRate}`}</div>
          <div>{`Number of applicants: ${session.applicationIds.length}`}</div>
        </div>
      ))}
    </main>
  );
};

export default SessionList;
