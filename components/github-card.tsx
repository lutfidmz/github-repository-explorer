import { CircleIcon, StarIcon } from "@radix-ui/react-icons";

import { DateTime } from "luxon";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitForkIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { IRepoData } from "@/lib/types";

export function GithubCard({
  className,
  data,
}: {
  className: string;
  data?: IRepoData;
}) {
  return (
    <Card className={className}>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>
            <Link href={data?.html_url || "http://#"} className="flex w-full">
              {data?.name}
            </Link>
          </CardTitle>
          <CardDescription className="text-clip overflow-hidden max-h-16 max-w-[15rem] h-16">
            {data?.description}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Link href={data?.html_url || "http://#"} className="flex w-full">
            <Button variant="secondary" className="px-3 shadow-none w-full">
              <StarIcon className="mr-2 h-4 w-4" />
              <h1>{data?.stargazers_count}</h1>
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            {data?.topics && (
              <Badge variant="outline">{data?.topics[0] || "No Topics"}</Badge>
            )}
          </div>
          <div className="flex items-center">
            <GitForkIcon className="mr-1 h-3 w-3" />
            {data?.forks}
          </div>
          <div>
            {data?.pushed_at &&
              "Updated " +
                DateTime.fromISO(data?.pushed_at).toFormat("MMM yyyy")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
