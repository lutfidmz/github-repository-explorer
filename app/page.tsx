"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChangeEvent, useState } from "react";
import GithubUsersAccordion from "@/components/github-users-accordion";
import { octokit } from "@/lib/utils";
import { IUserData } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Loader2, XCircle } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [userData, setUserData] = useState<IUserData[] | undefined>();

  const { toast } = useToast();
  const getUsers = async () => {
    try {
      setIsLoading(true);
      const result = await octokit.request("GET /search/users", {
        q: keyword,
        per_page: 5,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      setIsLoading(false);

      return result;
    } catch (error) {
      setIsLoading(false);

      if (error instanceof Error) {
        toast({
          title: "Failed to find users",
          description: error?.message,
          variant: "destructive",
        });
      }
    }
  };

  const findUser = async () => {
    try {
      const response = await getUsers();
      setUserData(response?.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeywordType = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  return (
    <main className="flex min-h-screen w-full flex-col md:container items-center md:p-24 p-4">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Github Repo Explorer
        </h1>
      </div>
      <div className="flex w-full flex-col max-w-4xl space-y-3 mt-5">
        <Label htmlFor="userName">User Name</Label>
        <div className="flex items-center">
          <Input
            id="userName"
            type="text"
            placeholder="Example: lutfidmz"
            value={keyword}
            onKeyUp={(e) => e.code == "Enter" && findUser()}
            onChange={handleKeywordType}
          />
          {keyword && (
            <button
              className="-ml-8 transition  ease-in-out duration-100"
              onClick={() => setKeyword("")}
            >
              <XCircle className="text-primary" />
            </button>
          )}
        </div>
        <Button type="button" onClick={findUser} disabled={keyword == ""}>
          Search
        </Button>
      </div>
      <div className="flex w-full flex-wrap max-w-4xl space-y-3 space-x-12 mt-5">
        {isLoading ? (
          <div className="flex w-full justify-center mt-20">
            <Loader2 className=" w-24 h-24 animate-spin" />
          </div>
        ) : (
          userData && <GithubUsersAccordion userData={userData} />
        )}
      </div>
      <Toaster />
    </main>
  );
}
