function getEvents() {
  let dummyData = [
  /*
      {
        id: "event-0",
        title: "a",
        description: "",
        location: "",
        status: "active",
        all_day: false,
        transparency: "opaque",
        timezone: "Europe/Stockholm",
        organizer: "",
        recurrence: "",
        created_at: "",
        updated_at: "",
        startDate: "2026-09-07T08:00:00Z",
        endDate: "2026-09-07T10:00:00Z",
      },
      {
        id: "event-1",
        flair: "active",
        title:
          "Knyppling är ett traditionellt textilt hantverk där man flätar, tvinnar och korsar trådar",
        description:
          "Knyppling är ett traditionellt textilt hantverk där man flätar, tvinnar och korsar trådar för att tillverka spetsar. Tekniken utvecklades i Italien under 1400-talet och spreds till Sverige under mitten av 1500-talet, där det främst användes av adeln innan det blev ett utbrett folkligt hantverk. Idag har slöjdformen utvecklats från att enbart pryda lakan och kläder till att bli en fri konstform.",
        location: "Konsum",
        startDate: "2026-09-08T08:00:00Z",
        endDate: "2026-09-08T10:00:00Z",
        allDay: false,
        attendees: ["alice@example.com", "bob@example.com"],
    },
      */
      {
        id: "event-2",
        title: "Bandy",
        description: "Weekly progress update and planning.",
        location: "Konsum",
        startDate:  "Fri Sep 04 2026 00:00:00 GMT+0200 (Central European Summer Time)",
        endDate:    "Fri Sep 16 2026 09:00:00 GMT+0200 (Central European Summer Time)",
        allDay: false,
        attendees: ["alice@example.com", "bob@example.com"],
      },
      {
        id: "event-3",
        title: "Piingis",
        flair: "maybe",
        description: "Weekly progress update and planning.",
        location: "Konsum",
        startDate:  "Fri Sep 04 2026 00:00:00 GMT+0200 (Central European Summer Time)",
        endDate:    "Fri Sep 16 2026 09:00:00 GMT+0200 (Central European Summer Time)",
        allDay: false,
        attendees: ["alice@example.com", "bob@example.com"],
      },
      {
        id: "event-4",
        title: "Stryk",
        flair: "important",
        description: "Weekly progress update and planning.",
        location: "Konsum",
        startDate:  "Fri Sep 04 2026 00:00:00 GMT+0200 (Central European Summer Time)",
        endDate:    "Sat Sep 05 2026 10:00:00 GMT+0200 (Central European Summer Time)",
        allDay: false,
        attendees: ["alice@example.com", "bob@example.com"],
    },
      /*
      {
        id: "event-5",
        title: "h",
        description: "",
        location: "",
        startDate: "2026-09-27T09:00:00Z",
        endDate: "2026-09-27T10:00:00Z",
      },
      {
        id: "event-6",
        title: "❤️ Stryk",
        flair: "today",
        description: "Weekly progress update and planning.",
        location: "Konsum",
        startDate: "2026-09-03T09:00:00Z",
        endDate: "2026-09-03T10:00:00Z",
        allDay: false,
        attendees: ["alice@example.com", "bob@example.com"],
      },
       */
    ];

  return dummyData;
}

export default getEvents
