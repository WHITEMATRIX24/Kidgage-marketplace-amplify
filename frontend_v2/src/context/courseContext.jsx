import React, { createContext, useState } from "react";

export const SelectedCourseContext = createContext({
  selectedCourseData: null,
  setSelectedCourseData: () => {},
});

const CourseContext = ({ children }) => {
  const [selectedCourseData, setSelectedCourseData] = useState(null);
  return (
    <SelectedCourseContext.Provider
      value={{ selectedCourseData, setSelectedCourseData }}
    >
      {children}
    </SelectedCourseContext.Provider>
  );
};

export default CourseContext;
