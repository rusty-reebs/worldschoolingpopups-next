import { useEffect, useState } from "react";
import { FaCheckCircle, FaHourglass } from "react-icons/fa";
import Button from "./Button";
import Nav from "./Nav";
import Input, { CountryInput, SessionSelect, TextAreaInput } from "./Input";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { CloudinaryUploadWidget } from "../_helpers/cloudinary";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
const lookup = require("country-code-lookup");

export default function EventForm({ isNew, id }) {
  const supabaseClient = useSupabaseClient();

  const initialValues = {
    name: "",
    city: "",
    isGlobal: false,
    isOnline: false,
    isMultipleLocations: false,
    start: undefined,
    end: undefined,
    description: "",
    email: "",
    fbPage: "",
    website: "",
  };
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);
  const [checkmark, setCheckmark] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!id) setIsLoading(false);
    if (id) {
      getEvent();
    }
  }, []);

  // useEffect(() => {
  //   if (form.isMultipleLocations) setForm((prev) => ({...prev, city: ""}))
  // },[form.isMultipleLocations])

  const getEvent = async () => {
    try {
      const { data } = await supabaseClient
        .from("testEvents")
        .select("*")
        .eq("id", id)
        .single();
      console.log("👉 data", data);
      if (data.country) {
        const info = lookup.byCountry(data.country);
        setForm({ ...data, countryCode: info.iso2 });
      } else {
        setForm(data);
      }
      setImages(data.images);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) {
      setErrorMessage("Please include at least one image.");
      return setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
    setErrorMessage("");
    setIsUpdating(true);
    // if (!form.start) {
    //   setForm((prev) => ({ ...prev, start: undefined }));
    // }
    // if (!form.end) {
    //   setForm((prev) => ({ ...prev, end: undefined }));
    // }
    try {
      if (isNew) {
        let countryCode = null;
        if (form.country) {
          const info = lookup.byCountry(form.country);
          countryCode = info.iso2;
        }
        const { error } = await supabaseClient.from("testEvents").insert({
          ...form,
          countryCode: countryCode,
          images: images,
        });
        if (error) {
          console.log(error);
          setIsUpdating(false);
          setErrorMessage("Oh no! Something broke. 😪");
          return setTimeout(() => {
            setErrorMessage("");
          }, 1000);
          //TODO more error handling here
          //TODO delete images
        }
      } else {
        const { error } = await supabaseClient
          .from("testEvents")
          .update({ ...form, updated: new Date().toISOString() })
          .eq("id", id);
        if (error) {
          console.log(error);
          setIsUpdating(false);
          setErrorMessage("Oh no! Something broke. 😪");
          return setTimeout(() => {
            setErrorMessage("");
          }, 1000);
          //TODO more error handling here
        }
      }
      setIsUpdating(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 800);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-yellow min-h-screen w-full">
      <Nav />
      <div className="mx-3">
        <h3 className="text-base text-center mb-4 lg:text-2xl">
          {isNew ? "Create Event" : "Update Event"}
        </h3>
        {!isNew && form.updated && (
          <div className="text-sm italic text-center">
            Last updated: {format(new Date(form.updated), "MMM d, y")}
          </div>
        )}
        <div className="lg:w-1/3 lg:mx-auto">
          <p className="text-xs italic font-light text-red mb-2">* required</p>
          <form
            onSubmit={handleSubmit}
            className={isLoading ? "animate-pulse blur-sm" : ""}
          >
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
            <div className="flex gap-3">
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
                  className="flex gap-2 text-sm font-light placeholder-black"
                >
                  Global?
                  <input
                    name="global"
                    type="checkbox"
                    className="scale-150"
                    checked={form?.isGlobal}
                    onChange={(e) => {
                      if (e.currentTarget.checked)
                        setForm((prev) => ({ ...prev, country: "" }));
                      setForm((prev) => ({
                        ...prev,
                        isGlobal: !prev?.isGlobal,
                      }));
                    }}
                  />
                </label>
              </div>
              <div className="flex items-center mx-auto">
                <label
                  htmlFor="online"
                  className="flex gap-2 text-sm font-light placeholder-black"
                >
                  Online?
                  <input
                    name="online"
                    type="checkbox"
                    className="scale-150"
                    checked={form?.isOnline}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        isOnline: !prev?.isOnline,
                      }));
                    }}
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
                disabled={form?.isMultipleLocations}
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
                  className="flex gap-3 text-sm font-light placeholder-black"
                >
                  Multiple Locations?
                  <input
                    name="multiple"
                    type="checkbox"
                    className="scale-150"
                    checked={form?.isMultipleLocations}
                    onChange={(e) => {
                      if (e.currentTarget.checked)
                        setForm((prev) => ({ ...prev, city: "" }));
                      setForm((prev) => ({
                        ...prev,
                        isMultipleLocations: !prev?.isMultipleLocations,
                      }));
                    }}
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
                ["Multiple Sessions", "Multiple Sessions"],
                ["Open-ended / Continuous", "Open-ended / Continuous"],
                ["Follows School Year", "Follows School Year"],
              ]}
              value={form?.eventType}
              callback={(value) => {
                console.log("👉 value", value);
                setForm((prev) => ({
                  ...prev,
                  eventType: value,
                }));
              }}
            />
            <div className="flex gap-2">
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
                isDisabled={
                  form?.eventType === "Multiple Sessions" ||
                  form?.eventType === "Open-ended / Continuous" ||
                  form?.eventType === "Follows School Year"
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
                isDisabled={
                  form?.eventType === "Multiple Sessions" ||
                  form?.eventType === "Open-ended / Continuous" ||
                  form?.eventType === "Follows School Year"
                }
              />
            </div>
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
            {isNew && (
              <div className="flex justify-center mb-2">
                <div>
                  <CloudinaryUploadWidget
                    setCheckmark={setCheckmark}
                    images={images}
                    setImages={setImages}
                  />
                </div>
                <div>
                  <p className="text-xs font-light ml-2">
                    Maximum 3, 1MB each.
                  </p>
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
              </div>
            )}
            {errorMessage && (
              <div className="flex bg-red text-white text-sm px-2 py-1 mt-4 items-center rounded-full w-fit mx-auto">
                {errorMessage}
              </div>
            )}
            <div className="mt-5 w-full text-center relative">
              <Button
                name="Submit"
                type="submit"
                disabled={errorMessage || isUpdating ? true : false}
              ></Button>
              <div className="inline-block absolute ml-3 mt-2">
                {isUpdating && (
                  <FaHourglass className="animate-spin" size={16} />
                )}
              </div>
            </div>
            {success ? (
              <p className="text-center mt-2">
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
    </div>
  );
}
