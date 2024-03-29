"use client";

import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";



import { CommentValidation } from "@/lib/validations/comment";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { addComment } from "@/lib/actions/comments.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface CreateCommentProps {
  postId: string;
  replyToId?: string;
  userId?: string;
  isReply?: boolean;
  currentUserImg: string;

}

const CreateComment: FC<CreateCommentProps> = ({
  postId,
  isReply=false,
  replyToId,
  userId,
  currentUserImg,
}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomToasts();
  
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addComment({
      userId:userId!,
      postId,
      // @ts-ignore
      content:content,
      isReply: isReply,
      pathname,
      commentId: replyToId,
    });
    form.reset();
  };

 


  
  return (
    <Form {...form}>
    <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name='content'
        render={({ field }) => (
          <FormItem className='flex w-full justify-center items-center gap-3'>
            <FormLabel>
              <Image
                src={currentUserImg}
                alt='current_user'
                width={38}
                height={38}
                className='rounded-full object-cover'
              />
            </FormLabel>
            <FormControl className='border-none bg-transparent'>
              <Input
                type='text'
                {...field}
                placeholder='Comment...'
                className='no-focus text-light-1 outline-none'
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button type='submit' className='comment-form_btn'>
        Reply
      </Button>
    </form>
  </Form>
  );
};


export default  CreateComment