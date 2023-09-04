import { FC, useEffect, useState } from "react";
import moment from "moment";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  View,
  ViewStatic,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import { useScheduleDetailsContext } from "../../helpers/ScheduleDetailsContext";
import { useCalendarContext } from "../../helpers/CalendarContext";
import { Appointment } from "../../types";

interface MyEvent extends Event {
  id: number;
}

const DesktopCalendar: FC = () => {
  const momentNow = moment();
  const [authData] = useAuthDataContext();
  const [detailsState, setDetailsState] = useScheduleDetailsContext();
  const [calendarState, setCalendarState] = useCalendarContext();
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    momentNow.toDate()
  );
  const [currentView, setCurrentView] = useState<string>("agenda"); //Choisi la vu du calendrier

  useEffect(() => {
    // Conversion des rendez-vous de la structure d'Appointment à la structure d'Event
    const convertedEvents: MyEvent[] = authData.appointments.map(
      (appointment) => {
        const [startTime, endTime] = appointment.hours.split(" - ");
        const [startHour, startMinute] = startTime.split(":");
        const [endHour, endMinute] = endTime.split(":");
        const startDate = new Date(appointment.date);
        const start = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          Number(startHour),
          Number(startMinute)
        );
        
        const end = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          Number(endHour),
          Number(endMinute)
        );

        return {
          ...appointment,
          start,
          end,
        };
      }
    );

    setEvents(convertedEvents);
  }, [authData.appointments]);

  useEffect(() => {
    setCalendarState({
      currentDate: momentNow.toDate(),
    });
  }, []);

  useEffect(() => {
    setCalendarState({
      currentDate: selectedDate,
    });
  }, [selectedDate]);

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedDate(slotInfo.start);
    setCalendarState({
      currentDate: selectedDate,
    });
    setCurrentView("day");
  };

  const handleSelectEvent = (event: Event) => {
    const appointment = event as Appointment;
    setSelectedDate(event.start);
    setCurrentView("day");

    setDetailsState({
      isDisplayed: true,
      details: {
        id: appointment.id,
        phoneEnterprise: appointment.phoneEnterprise,
        companyName: appointment.companyName,
        title: appointment.title,
        color: appointment.color,
        duration: appointment.duration,
        hours: appointment.hours,
        date: appointment.date,
        intervenants: appointment.intervenants,
        clientName: appointment.clientName,
        address: appointment.address,
        note: appointment.note,
        punctuality: appointment.punctuality,
        friendliness: appointment.friendliness,
        interventionQuality: appointment.interventionQuality,
        comment: appointment.comment,
      },
      isModifying: false,
    });
  };

  return (
    <DnDCalendar
      culture="fr"
      messages={{
        today: "Aujourd'hui",
        previous: "Précédent",
        next: "Suivant",
        month: "Mois",
        week: "Semaine",
        day: "Jour",
        agenda: "Agenda",
        date: "Date",
        time: "Heure",
        event: "Événement",
      }}
      defaultView={currentView as View}
      date={selectedDate}
      onNavigate={(date, view) => {
        setSelectedDate(date);
        setCurrentView(view);
      }}
      onSelectSlot={handleSelectSlot}
      events={events}
      localizer={localizer}
      onSelectEvent={(event) => {
        handleSelectEvent(event);
      }}
      // onEventDrop={onEventDrop}
      // onEventResize={onEventResize}
      // resizable
      style={{ height: "80vh", width: "55vw" }}
      eventPropGetter={(event) => {
        const appointment = event as Appointment;
        return {
          style: {
            backgroundColor: appointment.clientName
              ? appointment.color
              : "#FFF",
            color: appointment.clientName ? "#FFF" : "#000",
            border: appointment.clientName ? "none" : "1px solid #000",
          },
        };
      }}

      min={new Date(0, 0, 0, 8, 0, 0)} //Donne l'heure de début du calendrier
      max={new Date(0, 0, 0, 18, 0, 0)} //Donne l'heure de fin du calendrier
    />
  );
};

const locales = {
  fr: fr,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});



const DnDCalendar = Calendar;

export default DesktopCalendar;
