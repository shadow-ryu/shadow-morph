import { AvatarProps } from "@radix-ui/react-avatar";

// import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { User } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: any;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {

  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            className="h-4 w-4"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <User className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
