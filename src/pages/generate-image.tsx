import React, { useState } from "react";
import { Button } from "../components/common/button";
import { api } from "../utils/api";
import Image from "next/image";
import { Textarea } from "../components/common/text-area";
import { cn } from "../lib/utils";

type PromptOption = { name: string; prompt: string; image: string };
type PromptOptions = {
  style: readonly PromptOption[];
};

const promptOptions: PromptOptions = {
  style: [
    {
      name: "realistic",
      prompt: "realistic style",
      image: "/style-preview/realistic.png",
    },
    {
      name: "minimalistic",
      prompt: "minimalistic",
      image: "/style-preview/minimalistic.png",
    },
    {
      name: "comic",
      prompt: "comic",
      image: "/style-preview/comic.png",
    },
    {
      name: "single stroke",
      prompt: "in single stroke style",
      image: "/style-preview/comic.png",
    },
  ] as const,
};

const GenerateImage = () => {
  const [form, setForm] = useState({
    prompt: "",
    style: promptOptions.style[0],
  });
  const [resultImageUrl, setResultImageUrl] = useState("");

  const generateImage = api.dalle.generateImage.useMutation({
    onSuccess(url) {
      setResultImageUrl(url || "");
    },
  });

  const handleStyleChange = (style: PromptOption) => {
    setForm((prev) => ({
      ...prev,
      style,
    }));
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      prompt: e.target.value,
    }));
  };

  const handleGenerateImage = () => {
    if (form.prompt && form.style) {
      generateImage.mutate({
        prompt: form.prompt,
        style: form.style.prompt,
      });
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col p-4">
      <div className="pb-8">
        <h1 className="text-center text-6xl">GENERATE TATTOO</h1>
      </div>
      <div className="flex ">
        <Textarea
          onChange={handlePromptChange}
          placeholder="pirate cat riding a scooter"
          className="text-lg"
        />
      </div>
      <div className="mt-4">
        <p className="my-4 text-xl font-bold">Select style</p>
        <div className="flex gap-4">
          {promptOptions.style.map((style) => (
            <button
              onClick={() => handleStyleChange(style)}
              key={style.name}
              className={cn(
                "relative aspect-square w-60 rounded-sm transition-all",
                form.style === style && "scale-[103%] ring-4 ring-secondary-300"
              )}
            >
              <Image src={style.image} className="rounded-sm" alt="" fill />
              <p className="absolute top-0 z-10 rounded-br-md bg-primary-950 p-2">
                {style.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleGenerateImage}
        disabled={generateImage.isLoading}
        className="mx-auto mt-8 w-full max-w-sm text-xl font-bold"
        size="lg"
      >
        Generuj
      </Button>
      {resultImageUrl && (
        <div>
          <h3>result</h3>
          <div className="relative mt-4 aspect-square w-96">
            <Image src={resultImageUrl} alt="generated image" fill />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateImage;
