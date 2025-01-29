export const handleShare = async ({ courseName, courseDesc }) => {
  const shareData = {
    title: courseName || "Check this out!",
    text: courseDesc || "Check out this activity on Kidgage!",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      const isShared = await navigator.share(shareData);
    } catch (error) {
      console.log(`error in share error: ${error}`);
    }
  } else {
    console.log("Web Share API not supported on this platform.");
  }
};
