import { AddressAutofill } from "@mapbox/search-js-react";

const SearchBarAddressAutofill = () => {
  return (
    <div>
      <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''}>
        <input className="text-[#787878]" placeholder="Search address, neighbourhood, city, or ZIP code"></input>
      </AddressAutofill>
    </div>
  );
};

export default SearchBarAddressAutofill;
