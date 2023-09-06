import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { octokit } from "@/lib/utils";
import { IRepoData, IUserData } from "@/lib/types";
import { GithubCard } from "./github-card";
import { useToast } from "./ui/use-toast";

const GithubUsersAccordion = ({ userData }: { userData: IUserData[] }) => {
  const [repoData, setRepoData] =
    useState<[{ key: number; repos: IRepoData[] }]>();
  const { toast } = useToast();

  const findRepos = async (username: string, userIndex: number) => {
    try {
      const response = await octokit.request("GET /users/{username}/repos", {
        username,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      if (repoData) {
        const index = repoData.findIndex((v) => v.key == userIndex);
        if (index >= 0) {
          const newRepoData = repoData;
          newRepoData[index] = { key: userIndex, repos: response.data };
          setRepoData(newRepoData);
        } else {
          setRepoData([{ key: userIndex, repos: response.data }]);
        }
      } else {
        setRepoData([{ key: userIndex, repos: response.data }]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Failed to load repositories",
          description: error?.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {userData
        ? userData.map((item, index) => (
            <AccordionItem value={item.login} key={index}>
              <AccordionTrigger onClick={() => findRepos(item.login, index)}>
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage src={item.avatar_url} alt={item.login} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {item.login}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap w-full justify-center">
                  {repoData && repoData.find((v) => v.key == index) ? (
                    repoData.find((v) => v.key == index)?.repos.length ? (
                      repoData
                        .find((v) => v.key == index)!
                        .repos.map((repo: IRepoData, i) => (
                          <GithubCard
                            className="w-full lg:w-[47%] mt-2 mr-2 ml-2 mb-2"
                            key={i}
                            data={repo}
                          />
                        ))
                    ) : (
                      "No Data"
                    )
                  ) : (
                    <Loader2 className="h-10 w-10 mb-4 animate-spin" />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        : ""}
    </Accordion>
  );
};

export default GithubUsersAccordion;
