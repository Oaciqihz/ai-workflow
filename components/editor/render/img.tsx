"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImgSetting = () => {
  const ModelSelect = () => {
    const items = [
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
      { label: "System", value: "system" },
    ];

    return (
      <Select items={items}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  const ImgSettingModal = () => {
    return (
      <Popover>
        <PopoverTrigger
          render={
            <Button className="w-full" variant="outline">
              Open popover
            </Button>
          }
        />
        <PopoverContent className="w-80">
          <div></div>
        </PopoverContent>
      </Popover>
    );
  };
  return (
    <div>
      <div className="my-2 grid grid-cols-2 gap-2">
        <ModelSelect />
        <ImgSettingModal />
      </div>
      <Button className="h-auto w-full py-2">开始生成</Button>
    </div>
  );
};

export default ImgSetting;
