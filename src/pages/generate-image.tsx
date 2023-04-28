import React, { useState } from "react";
import { Input } from "../components/common/input";
import { Button } from "../components/common/button";
import { RadioGroup, RadioGroupItem } from "../components/common/radio-group";
import { Label } from "../components/common/label";
import { api } from "../utils/api";
import Image from "next/image";

const GenerateImage = () => {
  const [form, setForm] = useState({
    prompt: "",
    style: "",
    type: "",
  });
  const [resultImageUrl, setResultImageUrl] = useState("");

  const generateImage = api.dalle.generateImage.useMutation({
    onSuccess(url) {
      setResultImageUrl(url || "");
    },
  });

  const handleStyleChange = (style: string) => {
    setForm((prev) => ({
      ...prev,
      style,
    }));
  };

  const handleTypeChange = (type: string) => {
    setForm((prev) => ({
      ...prev,
      type,
    }));
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      prompt: e.target.value,
    }));
  };

  const handleGenerateImage = () => {
    generateImage.mutate({
      ...form,
    });
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex ">
        <Input
          onChange={handlePromptChange}
          placeholder="czarny kot grający na gitarze, kot siedzi na globusie"
        />
      </div>
      <div className="mt-4">
        <p className="mb-2 text-lg">Wybierz styl projektu</p>
        <RadioGroup
          onValueChange={handleStyleChange}
          defaultValue="comfortable"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Kontury</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Rysunek</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Cyfrowy</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mt-4">
        <p className="mb-2 text-lg">Wybierz typ projektu</p>
        <RadioGroup onValueChange={handleTypeChange} defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Minimalistyczny</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Realistyczny</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Komiczny</Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        onClick={handleGenerateImage}
        disabled={generateImage.isLoading}
        className="mt-8 w-fit"
      >
        Generuj
      </Button>
      {generateImage.isSuccess && (
        <div className="relative aspect-square w-96">
          <Image src={resultImageUrl} alt="generated image" fill />
        </div>
      )}
    </div>
  );
};

export default GenerateImage;
