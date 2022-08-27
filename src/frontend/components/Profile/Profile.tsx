import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { SessionDataState, UserRoleState } from "../../data/globalState";
import Button from "../common/Button";
import avatar from "../../../public/images/avatar.png";
import { useState, useEffect } from "react";
import { balanceOf } from "../../service/token-service";

export interface ProfileProps {
  image: any;
  username: string;
  dateOfBirth: string;
  studentID: string;
}

const Profile = ({
  image,
  username,
  dateOfBirth,
  studentID = "N/A",
}: ProfileProps) => {
  const router = useRouter();
  const userRole = useRecoilValue(UserRoleState);
  const sessiondata = useRecoilValue(SessionDataState);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    (async () => {
      const _balance = await balanceOf(sessiondata?.principalId as string);

      setBalance(_balance.toString());
    })();
  }, []);

  return (
    <div className="relative bg-white rounded-lg shadow-lg">
      <div className="absolute flex justify-center w-full -top-1/3">
        <div className="w-40 h-40 overflow-hidden rounded-full">
          <Image
            src={image || avatar}
            alt="profile picture"
            // layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="p-4 pt-16">
        <div className="text-xl font-bold text-center text-primary-400">
          <span>{username}</span>
        </div>
        <div className="flex flex-col">
          <Label text={dateOfBirth} label="Date of Birth" />
          <Label text={studentID} label="Student ID" />
          {userRole === "Student" && (
            <div>
              <Label
                text={balance?.toString()}
                label="Number of Token"
                className="font-semibold gradient-text"
              />
              <Button
                onClick={() => {
                  router.push("/transfer");
                }}
              >
                Transfer
              </Button>
            </div>
          )}
          {userRole === "Admin" && (
            <div>
              <Label
                text={balance.toString()}
                label="Number of Token"
                className="font-semibold gradient-text"
              />
              <Button
                onClick={() => {
                  router.push("/transfer");
                }}
              >
                View Profile
              </Button>
            </div>
          )}
          {userRole === "Employer" && (
            <div>
              <Button
                onClick={() => {
                  router.push("/transfer");
                }}
              >
                View Profile (10 Token)
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Label = ({
  label,
  text,
  className,
}: {
  label?: string;
  text: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-row p-2 rounded-lg ">
      {label && (
        <div className={`text-primary-400 font-medium`}>{label}:&nbsp;</div>
      )}
      <span className={`text-center text-primary-400 ${className}`}>
        {text}
      </span>
    </div>
  );
};
export default Profile;
