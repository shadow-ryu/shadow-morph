"use client";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
// import { uploadFiles } from '@/lib/uploadthing'
// import { PostCreationRequest, PostValidator } from '@/lib/validators/post'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "@/styles/editor.css";
import { PostCreationRequest, PostValidator } from "@/lib/validations/post";
import { uploadFiles, useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { createPost } from "@/lib/actions/post.actions";
import { navigate } from "@/lib/actions/common.action";
import { ScrollArea } from "@/components/ui/scroll-area";

type FormData = z.infer<typeof PostValidator>;

interface EditorProps {
  guildId?: string;
  isGuild?:boolean,
  postId?:string;


}

export const Editor: React.FC<EditorProps> = ({postId, guildId,isGuild=false}) => {
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { userId } = useAuth();
  const { startUpload } = useUploadThing("media");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      // subredditId,
      title: "",
      userId: userId||"-1",
      content: null,
    },
  });
  const pathname = usePathname();
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const res = await startUpload([file]);
                  if (!res) {
                    return {
                      success: 0,
                      file: {
                        url: "",
                      },
                    };
                  }
                  return {
                    success: 1,
                    file: {
                      url: res[0]?.url || "",
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      // setTimeout(() => {
      //   _titleRef?.current?.focus();
      // }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);
  //  const { mutate: createPonst } = useMutation({
  //     mutationFn: async ({
  //       title,
  //       content,
  //       userId
  //     }: PostCreationRequest) => {
  //       const payload: PostCreationRequest = { title, content,userId }
  //       const { data } = await axios.post('/api/post/create', payload)
  //       return data
  //     },
  //     onError: () => {
  //       return toast({
  //         title: 'Something went wrong.',
  //         description: 'Your post was not published. Please try again.',
  //         variant: 'destructive',
  //       })
  //     },
  //     onSuccess: () => {
  //       // turn pathname /r/mycommunity/submit into /r/mycommunity
  //       const newPathname = pathname.split('/').slice(0, -1).join('/')
  //       router.push(newPathname)

  //       router.refresh()

  //       return toast({
  //         description: 'Your post has been published.',
  //       })
  //     },
  //   })
  async function onSubmit(data: any) {
    const blocks = await ref.current?.save();

    const payload: any = {
      title: data.title,
      content: blocks,
      userId: userId,
      isGuild:isGuild,
      postId,
      guildId:guildId
    };
     const result:any =await createPost(payload);
     if(result&&[200,201].includes(result.status||404)){
      toast({
        title: "Post Created",
        description:" post was successfully" ,
        variant: "success",
      });
      navigate(`/posts/${result.data.id}`)
     }
  }

  if (!isMounted) {
    return null;
  }
  const { ref: titleRef, ...rest } = register("title");
  return (
    <div className="w-full p-4  text-gray-950  ">
      <form action="" id="post-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              //   @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden p-4 bg-[#f6faef] text-3xl  rounded-md font-bold focus:outline-none"
          />
          <div className="bg-[#f6faef] flex-col justify-start rounded-md items-center">
           <div id="editor" />
            <p className="p-2 text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editor;
