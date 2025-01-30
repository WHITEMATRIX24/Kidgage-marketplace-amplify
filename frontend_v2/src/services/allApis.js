import { serverApiConfig } from "./api_config";

// common
export const getSearchedActivitesApi = async ({ location, gender, age }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/courses/search?location=${location}&gender=${gender}&age=${age}`,
      apiMethod: "GET",
    });

    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      `error in fetching activites in search component or page, error: ${error}`
    );
  }
};

// landing page
export const getAllActivitesApi = async () => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: "/course-category/categories",
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in fetching activites in landing page, error: ${error}`);
  }
};

export const getAllTopBrandsApi = async () => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: "/users/all",
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      `error in fetching top brands in landing page, error: ${error}`
    );
  }
};
export const getAllBannersApi = async () => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: "/banners",
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in fetching banners in landing page, error: ${error}`);
  }
};

export const getAllRecentEventsApi = async () => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: "/posters",
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      `error in fetching recent events in landing page, error: ${error}`
    );
  }
};

export const getlandingNewsApi = async () => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: "/news/kidgage-news",
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in fetching news in landing page, error: ${error}`);
  }
};

// activity page
export const getAllActivityByCategoryApi = async ({ category }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/courses/by-course-type?courseType=${category}`,
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      `error in fetching activites by category in activity page, error: ${error}`
    );
  }
};

//KidgageNews
export const getKidgageNewsApi = async () => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: "/news/kidgage-news",
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in fetching kidgage news, error: ${error}`);
  }
};

// activity details
export const getActivitydetailsByIdApi = async ({ activityId }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/courses/course/${activityId}`,
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      `error in activy details in activity details page, error: ${error}`
    );
  }
};

//Get user Details of user who use "Signin with Google" button
export const getUserSignindetailsByGoogleSigninApi = async (data) => {
  console.log(data);

  try {
    const response = await serverApiConfig({
      apiEndPoint: "customers/get-google-user",
      apiMethod: "POST",
      data: data,
    });

    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`133 error in Fetching User Details, error: ${error}`);
  }
};

//api o check whether user exist
export const getExistingUserDetailsAPi = async (data) => {
  console.log(data);

  try {
    const response = await serverApiConfig({
      apiEndPoint: "customers/get-existing-user",
      apiMethod: "POST",
      data: data,
    });

    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`133 error in Fetching User Details, error: ${error}`);
  }
};
export const getEventDetailsByIdApi = async ({ eventId }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/posters/poster/${eventId}`,
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in event details, error: ${error}`);
  }
};
export const getNewsDetailsByIdApi = async ({ newsId }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/news/${newsId}`,
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in news details, error: ${error}`);
  }
};

export const getProviderDetailsApi = async ({ providerId }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/users/provider/${providerId}`,
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in fetching provider details: ${error}`);
  }
};
export const getOtherNewsDetailsApi = async ({ newsId }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/news/kidgage-news/${newsId}`,
      apiMethod: "GET",
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in other news details, error: ${error}`);
  }
};

// booking api
export const addBokkingApi = async ({ userId, bookingDetails }) => {
  try {
    const response = await serverApiConfig({
      apiEndPoint: `/customers/book-course/${userId}`,
      apiMethod: "POST",
      data: bookingDetails,
    });
    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(`error in booking courses, error: ${error}`);
  }
};
