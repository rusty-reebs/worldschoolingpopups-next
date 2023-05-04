import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "./Button";
import Nav from "./Nav";
import Input, { CountryInput, SessionSelect, TextAreaInput } from "./Input";
import { format } from "date-fns";
import { supabaseAdmin } from "../supabase";

export default function EventForm({ isNew }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  //   useEffect(() => {
  //     const getEvent = async () => {
  //       try {
  //         const data = await fetch(myApi + "/events/" + eventId, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include",
  //         });
  //         if (data.ok) {
  //           const result = await data.json();
  //           console.log("👉 result", result);
  //           setForm({
  //             ...result,
  //             date: {
  //               ...result.date,
  //               start: format(new Date(result?.date?.start), "yyyy-MM-dd"),
  //               end: format(new Date(result?.date?.end), "yyyy-MM-dd"),
  //             },
  //           });
  //           setIsLoading(false);
  //         } else navigate("/login");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getEvent();
  //   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      if (isNew) {
        const { error } = await supabaseAdmin.from("testEvents").insert({
          ...form,
          //   images: images,
        });
        if (error) {
          setErrorMessage("Oh no! Something broke. 😪");
          console.log(error);
        }
      } else {
        const { error } = await supabaseAdmin.from("testEvents").insert({
          name: form?.name,
          country: form?.country,
          isGlobal: form?.isGlobal,
          city: form?.city,
          isMultiple: form?.isMultiple,
          lat: form?.lat,
          lon: form?.lon,
          eventType: form?.eventType,
          start: form?.start,
          end: form?.end,
          min: form?.min,
          max: form?.max,
          description: form?.description,
          email: form?.email,
          fbPage: form?.fbPage,
          website: form?.website,
          //   images: images,
        });
        if (error) {
          setErrorMessage("Oh no! Something broke. 😪");
          console.log(error);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-yellow min-h-screen w-full">
      <Nav />
      {isLoading ? (
        <div className="bg-yellow flex h-screen w-full align-middle">
          <div className="flex justify-center flex-col mx-auto">
            <div className="flex items-center justify-center space-x-2 animate-pulse">
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
            </div>
            <div className="text-center text-sm text-black mt-4">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-3">
            <h3 className="text-base text-center mb-4 lg:text-2xl">
              {isNew ? "Create Event" : "Update Event"}
            </h3>
            <div className="lg:w-1/3 lg:mx-auto">
              <p className="text-xs italic font-light text-red mb-2">
                * required
              </p>
              <form onSubmit={handleSubmit}>
                <Input
                  name="eventName"
                  placeholder=""
                  label="Event Name"
                  type="text"
                  required="true"
                  value={form?.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <div className="flex gap-2">
                  <CountryInput
                    name="country"
                    label="Country"
                    disabled={form?.isGlobal}
                    value={form?.country}
                    onChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        country: value,
                      }))
                    }
                  />
                  <div className="flex items-center mx-auto">
                    <label
                      htmlFor="global"
                      className="flex gap-4 text-sm font-light placeholder-black"
                    >
                      Global?
                      <input
                        name="global"
                        type="checkbox"
                        className="scale-150"
                        checked={form?.isGlobal}
                        onChange={(value) =>
                          setForm((prev) => ({
                            ...prev,
                            isGlobal: !prev?.isGlobal,
                          }))
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    name="city"
                    placeholder=""
                    label="City"
                    type="text"
                    disabled={form?.isMultiple}
                    value={form?.city}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                  />
                  <div className="flex items-center">
                    <label
                      htmlFor="multiple"
                      className="flex gap-4 text-sm font-light placeholder-black"
                    >
                      Multiple?
                      <input
                        name="multiple"
                        type="checkbox"
                        className="scale-150"
                        checked={form?.isMultiple}
                        onChange={(value) =>
                          setForm((prev) => ({
                            ...prev,
                            isMultiple: !prev?.isMultiple,
                          }))
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <Input
                    name="lat"
                    placeholder="eg. 50.112"
                    label="Latitude"
                    type="number"
                    value={form?.lat}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        lat: e.target.value,
                      }))
                    }
                  />
                  <Input
                    name="lon"
                    placeholder="eg. -118.203"
                    label="Longitude"
                    type="number"
                    value={form?.lon}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        lon: e.target.value,
                      }))
                    }
                  />
                </div>
                <SessionSelect
                  name="eventType"
                  placeholder=""
                  label="Event Type"
                  values={[
                    ["Fixed Session", "Fixed Session"],
                    ["Open-ended / Continuous", "Open-ended / Continuous"],
                    ["Full School Year", "Full School Year"],
                  ]}
                  selectedValue={"Fixed Session"}
                  value={form?.eventType}
                  callback={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      eventType: value,
                    }))
                  }
                />
                <Input
                  name="dateStart"
                  placeholder=""
                  label="Start Date"
                  type="date"
                  value={form?.start}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      start: e.target.value,
                    }))
                  }
                />
                <Input
                  name="dateEnd"
                  placeholder=""
                  label="End Date"
                  type="date"
                  value={form?.end}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      end: e.target.value,
                    }))
                  }
                />
                <div className="flex gap-x-2">
                  <Input
                    name="ageMin"
                    placeholder=""
                    label="Minimum Age"
                    type="number"
                    value={form?.min}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                  />
                  <Input
                    name="ageMax"
                    placeholder=""
                    label="Maximum Age"
                    type="number"
                    value={form?.max}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                  />
                </div>
                <TextAreaInput
                  name="description"
                  placeholder="Write description here..."
                  label="Event Description"
                  required="true"
                  value={form?.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <Input
                  name="email"
                  placeholder="contact@gmail.com"
                  label="Contact Email"
                  type="email"
                  value={form?.email}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <Input
                  name="fbPage"
                  placeholder="www.facebook.com/myevent"
                  label="Facebook Page"
                  type="text"
                  value={form?.fbPage}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      fbPage: e.target.value,
                    }))
                  }
                />
                <Input
                  name="website"
                  placeholder="www.example.com"
                  label="Website"
                  type="text"
                  value={form?.website}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                />
                {/* <div className="flex justify-center mb-2">
                  <div>
                    <CloudinaryUploadWidget
                      setCheckmark={setCheckmark}
                      checkmark={checkmark}
                      images={images}
                      setImages={setImages}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-light ml-2">Maximum 3, 1MB each.</p>
                    <p className="text-xs font-light ml-2">
                      First image will be cover image.
                    </p>
                    <div className="flex justify-center">
                      {checkmark
                        ? checkmark.map((check, index) => {
                            return (
                              <p key={index} className="text-center">
                                <FaCheckCircle className="text-green" />
                              </p>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div> */}
                {errorMessage && (
                  <div className="flex bg-red text-white text-sm px-2 py-1 items-center rounded-full w-fit mx-auto">
                    {errorMessage}
                  </div>
                )}
                <div className="flex justify-center mt-5">
                  <Button name="Submit"></Button>
                </div>
                {success ? (
                  <p className="text-center">
                    <FaCheckCircle
                      className="inline text-green"
                      style={{ verticalAlign: "middle" }}
                    />
                    &nbsp;Success!
                  </p>
                ) : null}
              </form>
            </div>
            <div className="h-16"></div>
          </div>
        </>
      )}
    </div>
  );
}
