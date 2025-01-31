import { AddressAutofill } from "@mapbox/search-js-react";

const SearchBarAddressAutofill = () => {
  return (
    <div>
      <AddressAutofill accessToken="pk.eyJ1IjoibHlzdGlvIiwiYSI6ImNtMjA3cmFoejBnMngycXM4anNuNXFmaTQifQ.y-WiEerYZrFOm8Xd8a7GwQ">
        <input className="text-[#787878]" placeholder="Search address, neighbourhood, city, or ZIP code"></input>
      </AddressAutofill>
    </div>
  );
};

export default SearchBarAddressAutofill;
