import React, { createContext, useState } from "react";

export const BookingCourseContext = createContext({
  bookingCourseData: null,
  // {
  //   courseName: null,
  //   providedAcademy: null,
  //   courseDuration: {
  //     duration: null,
  //     durationUnit: null,
  //     startDate: null,
  //     endDate: null,
  //     bookedDates: [],
  //   },
  // },
  setCourseBookingData: () => {},
});

const BookingContext = ({ children }) => {
  const [bookingCourseData, setCourseBookingData] = useState(null);
  return (
    <BookingCourseContext.Provider
      value={{ bookingCourseData, setCourseBookingData }}
    >
      {children}
    </BookingCourseContext.Provider>
  );
};

export default BookingContext;
