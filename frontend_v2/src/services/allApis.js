import { serverApiConfig } from "./api_config";

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
    console.log(response);

    if (response.status != 200) return console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      `error in activy details in activity details page, error: ${error}`
    );
  }
};
