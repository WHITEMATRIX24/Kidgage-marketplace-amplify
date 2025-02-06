import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import "./OrderSummeryPage.css";
import { useNavigate } from "react-router";
import { SelectedCourseContext } from "../../context/courseContext";
import { BookingCourseContext } from "../../context/bookingContext";
import { addBokkingApi } from "../../services/allApis";
import CampDetails from "../../pages/CampDetails/CampDetails";
import useRefreshAlert from "../../hooks/useRefreshAlert";
import Swal from "sweetalert2";

function OrderSummeryPage2() {
  useRefreshAlert();
  const navigate = useNavigate();
  const { selectedCourseData } = useContext(SelectedCourseContext);
  const { bookingCourseData, setCourseBookingData } =
    useContext(BookingCourseContext);

  // if not data redirect
  if (!bookingCourseData || !selectedCourseData)
    return window.location.replace("/");

  const [selectedCourse, setSelectedCourse] = useState(
    selectedCourseData || {}
  );
  const [bookingData, setBookingData] = useState(bookingCourseData || {});
  const [totalFee, setTotalFee] = useState(
    bookingData.courseDuration.fee || ""
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  //   payment method check
  const handleCheckPaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const [disableContinue, setDisableContinue] = useState(true)
  const handleContinue = async () => {
    setDisableContinue(false)
    console.log('inside');

    if (!selectedPaymentMethod) return;
    const userData = JSON.parse(sessionStorage.getItem("user"));

    const finalBookingData = {
      bookingDate: new Date().toLocaleString(),
      paymentDetails: {
        isPaid: false,
        paymentMethod: selectedPaymentMethod,
      },
      ...bookingData,
    };

    const response = await addBokkingApi({
      userId: userData?._id,
      bookingDetails: finalBookingData,
    });
    console.log(response);

    if (response) {
      setCourseBookingData(response.finalBookingData);
    }

    Swal.fire({
      title: "Booking Success!",
      text: "Congrats! You have successfully booked",
      icon: "success",
      confirmButtonColor: "#ACC29E",
      customClass: {
        popup: "custom-border-radius",
      },
    });

    navigate("/thankyou");
  };

  return (
    <>
      <div className=" activity-details-row-1">
        <div className="activity-details-left-1">
          <div className="hide-on-mobile">
            <div className="activity-img-container-1">
              <img
                className="activity-image-1"
                src={selectedCourse.images[0]}
                alt=""
              />
            </div>
            {/* <div className="activity-btn-container-1">
              <button className="text-start activity-button-1">
                About This Activities
              </button>
              <FontAwesomeIcon className="icon-arrow-1" icon={faArrowRight} />
            </div> */}
            <CampDetails activityData={selectedCourse} />
          </div>
        </div>
        <div className="activity-details-rigth-1">
          <div className="rounded-4 activity-content-1 ">
            <div className=" w-100 order-content" style={{ marginTop: '-30px' }}>
              <div className="signIn-heading fw-bold">
                <h2 className="fw-bold">{bookingData.courseName}</h2>
                <h6>{bookingData.providedAcademy}</h6>
              </div>
              <div className="mt-2 mb-2  mx-5 py-1 px-2 d-flex align-items-center justify-content-between input-container border rounded-4">
                <img
                  src="http://www.skipcash-portal.com/img/skipcash-logo.png"
                  alt=""
                  style={{ width: "80px", height: "30px" }}
                  className="order-image"
                />
                <input
                  type="radio"
                  name="payment-method"
                  className="order-checkbox"
                  style={{ width: "20px", height: "20px" }}
                  disabled
                />
              </div>
              <div className="mt-2 mb-2 mx-5 py-1 px-2  d-flex align-items-center justify-content-between input-container border rounded-4">
                <div>
                  <img
                    src="https://www.pngmart.com/files/22/Debit-Card-PNG-Transparent.png"
                    alt=""
                    style={{ width: "60px", height: "30px" }}
                    className="order-image me-3"
                  />
                  Debit Card
                </div>
                <input
                  type="radio"
                  name="payment-method"
                  className="order-checkbox"
                  disabled
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="mt-2 mb-2 mx-5 py-1 px-2  d-flex align-items-center justify-content-between input-container border rounded-4">
                <div>
                  <img
                    src="https://www.pngplay.com/wp-content/uploads/7/Debit-Card-No-Background.png"
                    alt=""
                    style={{ width: "60px", height: "30px" }}
                    className="order-image me-3"
                  />
                  Credit Card
                </div>
                <input
                  type="radio"
                  name="payment-method"
                  className="order-checkbox"
                  disabled
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="mt-2 mb-3 mx-5 py-1 px-2  d-flex align-items-center justify-content-between input-container border rounded-4">
                <div>
                  <img
                    src="http://clipart-library.com/images_k/cash-icon-transparent/cash-icon-transparent-19.png"
                    alt=""
                    style={{ width: "49px", height: "34px" }}
                    className="order-image me-4"
                  />
                  Cash on pay
                </div>
                <input
                  type="radio"
                  name="payment-method"
                  value="cash-on-pay"
                  onChange={handleCheckPaymentMethod}
                  checked={selectedPaymentMethod === "cash-on-pay"}
                  className="order-checkbox"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>

              <div className="line-seperator-order-summary my-5"></div>

              <div className="border rounded mt-2 p-1 map-box  ">
                <div style={{}} className="mx-3 mt-2">
                  <p className="fw-bold" style={{ fontSize: "18px" }}>
                    {" "}
                    Order Summary
                  </p>
                  <div
                    className="d-flex justify-content-between "
                    style={{ fontSize: "18px", lineHeight: "10px" }}
                  >
                    <p>{`${bookingData.courseDuration.duration} ${bookingData.courseDuration.durationUnit} Pass`}</p>
                    <p className="fw-bold">{`QAR ${bookingData.courseDuration.fee}`}</p>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontSize: "18px", lineHeight: "8px" }}
                  >
                    <p>Tax</p>
                    <p className="fw-bold">QAR 00.00</p>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-centre justify-content-between border rounded-3  age-box  mt-3 d-none d-md-flex ">
                <div className=" age-box-content d-flex align-items-center justify-content-center ">
                  <p className="fw-bold" style={{ fontSize: "16px" }}>
                    {`Total: QAR ${totalFee} `}
                  </p>
                  {/* <p style={{ fontSize: "13px" }}>Today will start</p> */}
                </div>
                <button disabled={!disableContinue || !selectedPaymentMethod}
                  style={{
                    backgroundImage: selectedPaymentMethod
                      ? "linear-gradient(to right, #FDD687, #F5A691)"
                      : "none",
                    backgroundColor: selectedPaymentMethod ? "none" : "#D0D0D0",
                    width: "230px",
                    height: "50px",
                  }}
                  className=" ctn-btn border-0  m-1 fw-bold"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
              <div className="checkout-container">
                <div className="d-flex align-items-centre justify-content-between border rounded-3  age-box ">
                  <div className=" age-box-content d-flex align-items-center justify-content-center ">
                    <p className="fw-bold" style={{ fontSize: "16px" }}>
                      {`QAR ${totalFee} `}
                    </p>
                    {/* <p style={{ fontSize: "13px" }}>Today will start</p> */}
                  </div>
                  <button disabled={!disableContinue || !selectedPaymentMethod}
                    className=" rounded-4 ctn-btn border-0 w-50 m-1 fw-bold"
                    style={{
                      backgroundImage: selectedPaymentMethod
                        ? "linear-gradient(to right, #FDD687, #F5A691)"
                        : "none",
                      backgroundColor: selectedPaymentMethod
                        ? "none"
                        : "#D0D0D0",
                      width: "230px",
                      height: "50px",
                    }}
                    onClick={handleContinue}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummeryPage2;
