import Slider from "@mui/material/Slider";

const Filter = ({ value, handleChange }: { value: number[]; handleChange: (event: Event, newValue: number | number[]) => void }) => (
    <div className="">
      <p className="font-bold text-lg">Filter by Price</p>
      <p>Price -: ${value[0]} - ${value[1]}</p>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={50}
        step={5}
        max={200}
      />
    </div>
  );

  export default Filter;