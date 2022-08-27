import React from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { SessionDataState } from "../../data/globalState";
import { claimOrDeposit } from "../../service/token-service";
import Button from "../common/Button";
import GradesSection from "./GradesSection";

const GradesList = () => {
  const sessiondata = useRecoilValue(SessionDataState);
  const grades = [
    {
      name: "1670",
      grade: 7.5,
      token: 50,
      isCompleted: true,
    },
    {
      name: "1670",
      grade: 7.5,
      token: 50,
      isCompleted: true,
    },
    {
      name: "1670",
      grade: 7.5,
      token: 50,
      isCompleted: true,
    },
    {
      name: "1670",
      grade: 7.5,
      token: 50,
      isCompleted: true,
    },
    {
      name: "1670",
      grade: 7.5,
      token: 50,
      isCompleted: false,
    },
    {
      name: "1670",
      grade: 7.5,
      token: 50,
      isCompleted: false,
    },
    {
      name: "1670",
      grade: 7.5,
      token: 50,
      isCompleted: true,
    },
  ];

  const handleClaim = async (code: string, token: number) => {
    try {
      const claimResult = await claimOrDeposit(
        sessiondata?.principalId as string,
        token
      );
      console.log(claimResult);
      if (claimResult.Ok) {
        toast.success("Claim Successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-10">
      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {grades.map((grade, index) => {
          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center w-full p-2 mt-10 bg-white rounded-lg shadow-lg"
            >
              <div className="absolute px-2 py-1 text-lg text-white rounded-lg left-6 -top-5 bg-primary-300">
                SU2022 {grade.name}
              </div>
              <div className="pt-4">
                <GradesSection grade={grade.grade} className="text-2xl" />
                <Button
                  onClick={async () => {
                    await handleClaim(grade.name, grade.token);
                  }}
                >
                  {grade.isCompleted
                    ? `Claim ${grade.token} token`
                    : "In progress"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradesList;
