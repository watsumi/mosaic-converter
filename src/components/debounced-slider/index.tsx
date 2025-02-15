import { Slider } from "@mantine/core";

const marks = [
  { value: 0, label: "0" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

type Props = {
  value: number;
  onChange: (value: number) => void;
  onChangeBeforeDebounce?: () => void;
};

export const DebouncedSlider = ({
  value,
  onChange,
  onChangeBeforeDebounce,
}: Props) => {
  const bounsedOnChange = async (value: number) => {
    onChangeBeforeDebounce?.();
    // 3s 待ってから onChange を実行
    await new Promise((resolve) => setTimeout(resolve, 3_000));
    onChange(value);
  };

  return (
    <Slider
      defaultValue={value}
      marks={marks}
      onChange={bounsedOnChange}
      max={100}
      step={1}
    />
  );
};
