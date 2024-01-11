"use client";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { formatDateString } from "@/lib/utils";
import { navigate } from "@/lib/actions/common.action";

const GuildHoverCard = ({ guild, background, children }: any) => {
  console.log(guild);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          onClick={() => {
            navigate(`guilds/${guild.id}`);
          }}
          variant={"unknown"}
          className="text-white w-[20rem] hover:bg-transparent hover:text-current"
        >
          {children}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-80"
        style={{
          background: background,
        }}
      >
        <div className="flex flex-col justify-between  items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={guild.guildLogo}
              height={40}
              width={40}
              className="rounded-xl h-6 w-6"
            />
            <AvatarFallback>{guild.name}</AvatarFallback>
          </Avatar>

          <div className="">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                {guild?.name.toLocaleUpperCase()} @{guild.guildHandle}
              </h4>
              <p className="text-sm">{guild?.info}</p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Created {formatDateString(guild.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GuildHoverCard;
