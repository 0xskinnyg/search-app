import { styled, Slider } from "@mui/material";
import { useFilter } from "../context/FilterContext";
import { useMemo } from "react";

const CustomSlider = styled(Slider)({
  color: "#A540F3",
  "& .MuiSlider-thumb": {
    backgroundColor: "#FFF",
    width: "30px",
    height: "30px",
    "&:hover, &.Mui-focusVisible": {},
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px rgba(165, 64, 243, 0.16)`,
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.32,
  },
  "& .MuiSlider-track": {
    border: "#A540F3",
    borderRadius: "10px",
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#A540F3",
  },
});

type PricePopoverContentProps = {
  rent: number[];
  setRent: (rent: number[]) => void;
};

const PricePopoverContent = (props: PricePopoverContentProps) => {
  const { rent, setRent } = props;
  const { priceHistogram } = useFilter();

  const histogramBars = useMemo(() => {
    if (!priceHistogram.histogram?.length) return [];

    const maxCount = Math.max(...priceHistogram.histogram);
    const barWidth = (priceHistogram.range[1] - priceHistogram.range[0]) / priceHistogram.histogram.length;

    return priceHistogram.histogram.map((count, index) => ({
      height: count > 0 ? Math.max(0, (count / maxCount) * 60) : 0,
      count,
      priceRange: {
        min: Math.round(priceHistogram.range[0] + (barWidth * index)),
        max: Math.round(priceHistogram.range[0] + (barWidth * (index + 1)))
      }
    }));
  }, [priceHistogram]);

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setRent(newValue as number[]);
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <p className="font-semibold text-lg mb-4">Price Range</p>
      <div className="flex gap-0.5 items-baseline">
        {histogramBars.map((bar, index) => (
          <div
            key={index}
            className={`group/histogram relative w-1 lg:w-2 border border-primary border-b border-1 border-solid ${
              bar.height > 0 ? 'bg-primary' : ''
            }`}
            style={{ height: `${bar.height || 1}px` }}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/histogram:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-10">
              <div className="flex flex-col items-center">
                <span>{bar.count} properties</span>
                <span>€{bar.priceRange.min.toLocaleString()} - €{bar.priceRange.max.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CustomSlider
        className="absolute bottom-[38px] left-0 w-full"
        aria-label="Price Range"
        value={rent}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={priceHistogram.range[0]}
        max={priceHistogram.range[1]}
      />

      <div className="grid grid-cols-2 justify-between gap-4 overflow-hidden w-full">
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="min">Min</label>
          <div className="relative">
            <input
              className="outline-none max-w-24"
              type="number"
              id="min"
              value={rent[0]}
              min={priceHistogram.range[0]}
              max={priceHistogram.range[1]}
              onChange={(e) => setRent([Number(e.target.value), rent[1]])}
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2">€</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="max">
            Max
          </label>
          <div className="relative">
            <input
              className="outline-none max-w-24"
              type="number"
              id="max"
              value={rent[1]}
              min={priceHistogram.range[0]}
              max={priceHistogram.range[1]}
              onChange={(e) => setRent([rent[0], Number(e.target.value)])}
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2">€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePopoverContent;
