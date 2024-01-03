"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { UserValidation } from "@/lib/validations/user";
import { updateUser } from "@/lib/actions/user.actions";
// import { register } from "module";

interface Props {
  user: {
    // email: string;
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const { startUpload } = useUploadThing("media");

  // const [files, setFiles] = useState<File[]>([]);

  // const form = useForm<z.infer<typeof UserValidation>>({
  //   resolver: zodResolver(UserValidation),
  //   defaultValues: {
  //     profile_photo: user?.image ? user.image : "",
  //     name: user?.name ? user.name : "",
  //     username: user?.username ? user.username : "",
  //     bio: user?.bio ? user.bio : "",
  //   },
  // });
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name || "",
      // email: user?.email || "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  })
  console.log(user,"user");
  // <z.infer<typeof UserValidation>>({
  //   resolver: zodResolver(UserValidation),
    
  // });
  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (values:any) => {
    console.log(values,"values");
    await updateUser({
      id: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      email: values.email,
      isSetup: true
    });
  };
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        // fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col gap-3"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <input className="bg-white" defaultValue="test" {...register("name")} />
      <input className="bg-white" defaultValue="test" {...register("bio")} />
      <input
        type="file"
        accept="image/*"
        placeholder="Add profile photo"
        className="account-form_image-input"

        // onChange={(e) => handleImage(e)}
        {...register("profile_photo")}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        className="bg-white"
        {...register("bio", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <Button type="submit"> sve</Button>
    </form>
  );
};

export default AccountProfile;
