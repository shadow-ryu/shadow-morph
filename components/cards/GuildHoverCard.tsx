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

const GuildHoverCard = ({ guild }: any) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          onClick={() => {
            navigate(`guilds/${guild.id}`);
          }}
          variant={"unknown"}
          className="text-white hover:bg-transparent hover:text-current"
        >
          {guild?.guildHandle}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between  items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={guild.guildLogo}
              height={30}
              width={30}
              className="rounded"
            />
            <AvatarFallback>{guild.name}</AvatarFallback>
          </Avatar>
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
      </HoverCardContent>
    </HoverCard>
  );
};

export default GuildHoverCard;
