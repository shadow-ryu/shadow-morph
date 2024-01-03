"use client";

import { useCustomToasts } from "@/hooks/use-custom-toast";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";

import { isBase64Image } from "@/lib/utils";

import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GuildValidation } from "@/lib/validations/guild";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { BuildGuild } from "@/lib/actions/guild.actions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const GuildForm = ({ guild }: any) => {
  const { loginToast } = useCustomToasts();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const { userId } = useAuth();
  if (!userId) {
    router.push(`/sign-in`);
  }
  const { startUpload } = useUploadThing("media");

  const form = useForm<z.infer<typeof GuildValidation>>({
    resolver: zodResolver(GuildValidation),
    defaultValues: {
      guild_logo: guild?.guild_logo || "",
      name: guild?.name || "",
      ownerID: userId!,
      guild_handle: guild?.guild_handle || "",
      info: guild?.info || "",
      tags: guild?.tags || "",
    },
  });
  const {
    formState: { errors },
  } = form;
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors);
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

  const onSubmit = async (values: z.infer<typeof GuildValidation>) => {
    const blob = values.guild_logo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      // console.log(imgRes, "dddd");
      console.log(imgRes);
      if (imgRes && imgRes[0].url) {
        values.guild_logo = imgRes[0]?.url;
      }
    }
    console.log(values);
    console.log("fff");
    const {
      name,
      info,
      tags,
      guild_logo,
      guild_handle,
      ownerID: owner_id,
    } = values;
    const res = await BuildGuild({
      name,
      info,
      tags,
      guild_logo,
      guild_handle,
      owner_id,
    });
    console.log(res);
    if (res) {
      // TODO: proper ssucees and fails modal or tost message handle
    }
  };
  return (
    <div className="container flex items-center h-fit max-w-3xl mx-auto">
      <div className="relative  text-white w-full h-fit p-4 rounded-lg space-y-6">
        <Form {...form}>
          <form
            className="flex flex-col justify-start gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="guild_logo"
              render={({ field }) => (
                <FormItem className="flex   items-center gap-4">
                  <FormLabel className="account-form_image-label">
                    {!!field.value ? (
                      <Image
                        src={field.value}
                        alt="profile_icon"
                        width={96}
                        height={96}
                        priority
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <Image
                        src="/assets/profile.svg"
                        alt="profile_icon"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    )}
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold  text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Add guild logo"
                      className="account-form_image-input bg-[#f6faef]"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold  ">
                    Guild Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus bg-[#f6faef]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guild_handle"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold ">
                    Guild handle
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus bg-[#f6faef]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold ">info</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className="account-form_input no-focus bg-[#f6faef] "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold ">
                    Guild Tags
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-[#f6faef] account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-[#AA4B86] hover:bg-[#b13581]">
              build
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GuildForm;
