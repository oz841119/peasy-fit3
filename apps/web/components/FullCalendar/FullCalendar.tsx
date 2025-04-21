"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../shadcnUI/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcnUI/card";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

export interface CalendarEvent<T extends string | number = string | number> {
  id: T;
  text: string;
  date: Date;
}

interface CalendarCellProps<T extends string | number> {
  day: number;
  date: Date;
  events: CalendarEvent<T>[];
  isToday: boolean;
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent<T>) => void;
  className?: string;
}

const CalendarCell = <T extends string | number>({
  day,
  date,
  events,
  isToday,
  onEventClick,
  className = "",
}: CalendarCellProps<T>) => {
  return (
    <div
      className={`h-24 flex flex-col items-start p-1
        ${isToday ? "bg-primary/10" : ""}
        hover:bg-muted/50 cursor-pointer ${className}`}
    >
      <span className="text-xs font-medium">{day}</span>
      <div className="flex flex-col gap-1 mt-1 w-full">
        {events.map(event => (
          <div
            key={String(event.id)}
            className="w-full px-1 py-0.5 text-xs rounded-sm bg-primary/10 hover:bg-primary/20"
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(event);
            }}
          >
            {event.text}
          </div>
        ))}
      </div>
    </div>
  );
};

interface FullCalendarProps<T extends string | number = string | number> {
  events?: CalendarEvent<T>[];
  onEventClick?: (event: CalendarEvent<T>) => void;
}

const useCalendar = ({ initialDate }: { initialDate?: Date } = {}) => {
  const [viewingDate, setViewingDate] = useState(initialDate || new Date());
  const daysInMonth = dayjs(viewingDate).daysInMonth();
  const startingDay = dayjs(viewingDate).startOf("month").day();
  return { viewingDate, daysInMonth, startingDay, setViewingDate };
}

const useWeekDaysTranslations = () => {
  const t = useTranslations("common");
  return [
    t("calendar.sunday"),
    t("calendar.monday"),
    t("calendar.tuesday"),
    t("calendar.wednesday"),
    t("calendar.thursday"),
    t("calendar.friday"),
    t("calendar.saturday"),
  ];
}

export const FullCalendar = <T extends string | number = string | number>({ events = [], onEventClick }: FullCalendarProps<T>) => {
  const t = useTranslations("common");
  const weekDays = useWeekDaysTranslations();
  const { viewingDate, daysInMonth, startingDay, setViewingDate } = useCalendar({ initialDate: new Date() });
  const handlePrevMonth = () => {
    setViewingDate(new Date(viewingDate.getFullYear(), viewingDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewingDate(new Date(viewingDate.getFullYear(), viewingDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };


  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">
              {viewingDate.getFullYear()}
            </span>
            <span className="text-xl text-muted-foreground">
              <span>{viewingDate.getMonth() + 1}</span>
            </span>
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0 border border-border rounded-md">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2 border-b border-border"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: startingDay }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="h-24"
            />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(viewingDate.getFullYear(), viewingDate.getMonth(), day);
            const isToday =
              day === new Date().getDate() &&
              viewingDate.getMonth() === new Date().getMonth() &&
              viewingDate.getFullYear() === new Date().getFullYear();

            const dayEvents = getEventsForDate(date);

            return (
              <CalendarCell
                key={day}
                day={day}
                date={date}
                events={dayEvents}
                isToday={isToday}
                onEventClick={onEventClick}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

