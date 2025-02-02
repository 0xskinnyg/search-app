import { AddressAutofill } from "@mapbox/search-js-react";
import { useEffect, useState } from "react";
import { useGeo } from "../context/GeoContext";
import Image from "next/image";
import { useFilter } from "../context/FilterContext";
import { twMerge } from "tailwind-merge";

const LocationPopoverContent = () => {
  const [selectedCity, setSelectedCity] = useState("Vienna");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [menuItems, setMenuItems] = useState<
    { name: string; id: string; postal_code: string }[]
  >([]);
  const { withinId, setWithinId } = useFilter();

  const { popularLocations } = useGeo();

  useEffect(() => {
    if (popularLocations !== undefined && popularLocations.length) {
      const foundCity = popularLocations.find(
        (location) => location.name === selectedCity
      );
      if (foundCity) setMenuItems(foundCity.children);
    }
  }, [popularLocations, selectedCity]);

  console.log(menuItems);
  return (
    <div className="flex flex-row gap-4 lg:min-w-96 max-h-80 overflow-y-scroll">
      <div className="flex flex-col gap-4">
        <AddressAutofill
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
          options={{
            language: "de",
            country: "at",
          }}
        >
          <input
            name="address-1 lg:w-full"
            autoComplete="address-line1"
            className="text-secondary outline-none"
            placeholder="Search address, neighbourhood, city, or ZIP code"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          />
        </AddressAutofill>
        <p className="flex items-center gap-2 font-medium">
          <Image
            src="/images/mdi_my-location.png"
            width={22}
            height={22}
            alt="my-location"
          />
          Current Location
        </p>
        <div>
          <p className="text-secondary text-sm mb-2">Popular Locations</p>
          <div className="flex flex-col gap-2">
            {popularLocations.map((location) => (
              <div
                className="cursor-pointer flex items-center justify-between gap-2"
                key={location.id}
                onClick={() => {
                  setSelectedCity(location.name);
                }}
              >
                <div className="flex items-center gap-2">
                  {location.name === "Vienna" && (
                    <Image
                      alt="Vienna"
                      src="/images/vienna.png"
                      height={47}
                      width={47}
                    />
                  )}
                  {location.name === "Linz" && (
                    <Image
                      alt="Linz"
                      src="/images/linz.png"
                      height={47}
                      width={47}
                    />
                  )}
                  <p className="font-medium text-nowrap">{location.name}</p>
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
            <p>Vienna, Austria</p>
            <p>Vienna, Austria</p>
            <p>Vienna, Austria</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-secondary text-sm mb-2">
          Districts in {selectedCity}
        </p>
        <div className="flex flex-col gap-4">
          <div
            key="alldistricts"
            className="flex items-center gap-2 cursor-pointer"
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
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={twMerge(
              "flex items-center gap-2 cursor-pointer p-2",
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
  );
};

export default LocationPopoverContent;
