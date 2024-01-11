"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import CustomImageRenderer from "./render/CustomImageRenderer";
import CustomCodeRenderer from "./render/CustomCodeRenderer";

import Link from "next/link";
const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
  isDetail: boolean;
}

function CustomLinkRenderer({ data }: any) {
  return (
    <Link
      href={data.link}
      className="flex justify-between items-center mx-auto w-full h-[4rem] flex-wrap border border-gray-300 shadow-md rounded-md cursor-pointer pr-4 "
    >
      <div
        className="flex flex-col justify-start items-start  w-96 p-4"
        style={{ fontSize: "8px" }}
      >
        <p className="text-sm font-bold mb-0 cursor-pointer">
          {data.meta.title}
        </p>
        <p className="text-left  font-light text-base cursor-pointer">
          {data.meta.description}
        </p>
      </div>
      <img
        src={data.meta.image.url}
        alt="image of link"
        className="w-6 rounded-md cursor-pointer flex-grow-1 "
      />
    </Link>
  );
}

const style = {
  paragraph: {
    fontSize: "0.7rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content, isDetail }) => {
  const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
  };
  if (!isDetail) {
    //  ignore this
    //  @ts-ignore
    renderers["linktool"] = CustomLinkRenderer;
  }
  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
