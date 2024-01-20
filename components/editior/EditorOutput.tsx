"use client";

import { FC, Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CustomImageRenderer from "./render/CustomImageRenderer";
import CustomCodeRenderer from "./render/CustomCodeRenderer";

import Link from "next/link";
import { Loader } from "lucide-react";
// import Output from  "editorjs-react-renderer";
const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);
interface EditorOutputProps {
  content: any;
  isDetail: boolean;
  isLoaded?: boolean;
}

function CustomLinkRenderer({ data }: any) {
  console.log("first", data);
  return (
    <Link
      href={data.link}
      className="flex justify-between items-center mx-auto w-full h-[4rem] flex-wrap border border-gray-300 shadow-md rounded-md cursor-pointer pr-4 "
    >
      <p
        className="flex flex-col justify-start items-start  w-96 p-4"
        style={{ fontSize: "8px" }}
      >
        <p className="text-sm font-bold mb-0 cursor-pointer">
          {data.meta.title}
        </p>
        <p className="text-left  font-light text-base cursor-pointer">
          {data.meta.description}
        </p>
      </p>
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

const EditorOutput: FC<EditorOutputProps> = ({
  content,
  isDetail,
  isLoaded,
}) => {
  // console.log(content)
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
    <Suspense
    fallback={
     <div className="flex justify-center items-center w-full"> <Loader className="h-5 w-5 animate-spin text-gray-100" /></div>
    }
  >
   <Output
      style={style}
      className={`text-sm `}
      renderers={renderers}
      data={content}
    />
    </Suspense>
  );
};

export default EditorOutput;
