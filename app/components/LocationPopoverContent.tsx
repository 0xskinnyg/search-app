"use client";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFilter } from "../context/FilterContext";
import { twMerge } from "tailwind-merge";

const LocationPopoverContent = () => {
  const [selectedCity, setSelectedCity] = useState("Vienna");
  const [selectedLocation, setSelectedLocation] = useState("");
  // const [suggestions, setSuggestions] = useState([]);
  const { withinId, setWithinId, popularLocations, menuItems, setMenuItems } =
    useFilter();

  useEffect(() => {
    if (popularLocations !== undefined && popularLocations.length) {
      const foundCity = popularLocations.find(
        (location) => location.name === selectedCity
      );
      if (foundCity) setMenuItems(foundCity.children);
    }
  }, [popularLocations, selectedCity, setMenuItems]);

  // TODO when API gets available
  // const debouncedFetchSuggestions = useRef(
  //   debounce(async (query: string) => {
  //     if (query.length < 3) {
  //       setSuggestions([]);
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         `/api/mapbox/search/suggest?q=${encodeURIComponent(query)}` // Not working ATM (403 Forbidden)
  //       );

  //       if (!response.ok) {
  //         console.log(response);
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setSuggestions(data.suggestions || []);
  //     } catch (error) {
  //       console.error("Error fetching suggestions:", error);
  //     }
  //   }, 300)
  // ).current;

  // const handleLocationSelect = async (suggestionId: string) => {
  //   try {
  //     const response = await fetch("/api/mapbox/search/retrieve", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         suggestion_id: suggestionId,
  //         session_token: sessionToken,
  //       }),
  //     });

  //     if (!response.ok) throw new Error("Network response was not ok");
  //     const data = await response.json();
  //     setSelectedLocation(data.feature.properties.name);
  //     setSuggestions([]); // Clear suggestions after selection
  //   } catch (error) {
  //     console.error("Error retrieving location:", error);
  //   }
  // };

  console.log(menuItems);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:w-[600px]">
      <div className="flex flex-col gap-6 flex-1">
        <div className="relative max-h-4">
          <AddressAutofill
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
          >
            <input
              name="address-1 lg:w-full"
              autoComplete="address-line1"
              className="text-secondary outline-none truncate font-PlusJakartaSans font-normal opacity-100 border-b border-gray-200 pb-2"
              placeholder="Insert address, neighbourhood, city, or ZIP code"
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                // debouncedFetchSuggestions(e.target.value);
              }}
            />
          </AddressAutofill>
          {/* TODO when API is available */}
          {/* {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg mt-1 z-50">
              {suggestions.map((suggestion: any) => (
                <div
                  key={suggestion.mapbox_id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationSelect(suggestion.mapbox_id)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )} */}
        </div>
        <p className="flex items-center gap-4 font-medium cursor-pointer">
          <Image
            src="/images/mdi_my-location.png"
            width={22}
            height={22}
            alt="my-location"
          />
          Current Location
        </p>
        <div>
          <p className="text-secondary text-sm mb-4">Popular Locations</p>
          <div className="flex flex-col gap-2">
            {popularLocations.map((location) => (
              <div
                className="cursor-pointer flex items-center justify-between gap-2"
                key={location.id}
                onClick={() => {
                  setSelectedCity(location.name);
                }}
              >
                <div className="flex items-center gap-4">
                  {location.name === "Vienna" && (
                    <Image
                      className="rounded-xs"
                      alt="Vienna"
                      src="/images/vienna.png"
                      height={47}
                      width={47}
                    />
                  )}
                  {location.name === "Linz" && (
                    <Image
                      className="rounded-xs"
                      alt="Linz"
                      src="/images/linz.png"
                      height={47}
                      width={47}
                    />
                  )}
                  <p className="font-medium text-base text-nowrap">
                    {location.name}
                  </p>
                </div>
                {selectedCity === location.name ? (
                  <div>
                    <Image
                      alt="Right Arrow"
                      src="/images/right-arrow.png"
                      height={10}
                      width={6}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-secondary text-sm mb-2">Recent Searches</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 cursor-pointer p-2">
              <div>
                <Image
                  alt="Location marker"
                  src="/images/typcn_location.png"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium text-nowrap">Vienna</p>
                <p className="text-secondary text-sm">Austria</p>
              </div>
            </div>
            <div className="flex items-center gap-4 cursor-pointer p-2">
              <div>
                <Image
                  alt="Location marker"
                  src="/images/typcn_location.png"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium text-nowrap">Vienna</p>
                <p className="text-secondary text-sm">Austria</p>
              </div>
            </div>
            <div className="flex items-center gap-4 cursor-pointer p-2">
              <div>
                <Image
                  alt="Location marker"
                  src="/images/typcn_location.png"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium text-nowrap">Vienna</p>
                <p className="text-secondary text-sm">Austria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-secondary text-sm mb-2">
          Districts in {selectedCity}
        </p>
        <div className="flex flex-col gap-4">
          <div
            key="alldistricts"
            className="flex items-center gap-4 cursor-pointer"
          >
            <div>
              <Image
                alt="Location marker"
                src="/images/typcn_location.png"
                width={24}
                height={24}
              />
            </div>
            <div
              className="flex flex-col"
              onClick={() => {
                const allDistricts = menuItems.map((item) => item.id);
                if (withinId.length === allDistricts.length) {
                  setWithinId([]);
                } else {
                  setWithinId(allDistricts);
                }
              }}
            >
              <p className="text-base font-medium">All Districts</p>
              <p className="text-secondary text-sm">
                {menuItems.length} Districts
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={twMerge(
                "flex items-center gap-4 cursor-pointer py-4",
                withinId.includes(item.id) && "bg-primaryLight"
              )}
              onClick={() => {
                if (withinId.includes(item.id)) {
                  setWithinId(withinId.filter((id) => id !== item.id));
                } else {
                  setWithinId([...withinId, item.id]);
                }
              }}
            >
              <div>
                <Image
                  alt="Location marker"
                  src="/images/typcn_location.png"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium text-nowrap">{item.name}</p>
                <p className="text-secondary text-sm">{item.postal_code}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationPopoverContent;
