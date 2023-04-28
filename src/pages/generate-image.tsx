import React from "react";
import { Input } from "../components/common/input";
import { Button } from "../components/common/button";
import { RadioGroup, RadioGroupItem } from "../components/common/radio-group";
import { Label } from "../components/common/label";

const GenerateImage = () => {
  const handleStyleChange = (style: string) => {
    console.log(style);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex ">
        <Input placeholder="black cat playing guitar" />
        <Button variant="secondary">Generate</Button>
      </div>
      <div className="mt-4">
        <p className="mb-2 text-lg">Select style of image</p>
        <RadioGroup
          onValueChange={handleStyleChange}
          defaultValue="comfortable"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Lineart</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Drawing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Digital</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mt-4">
        <p className="mb-2 text-lg">Select type of image</p>
        <RadioGroup
          onValueChange={handleStyleChange}
          defaultValue="comfortable"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Minimalistic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Realistic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Comic</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default GenerateImage;
