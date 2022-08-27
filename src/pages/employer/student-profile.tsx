import Head from "next/head";
import avatar from "../../public/images/avatar.png";
import SearchInput from "../../frontend/components/common/SearchInput";
import { Profile } from "../../frontend/components/Profile";
import { APP } from "../../frontend/enum";
import { ProfileProps } from "../../frontend/components/Profile/Profile";

function StudentProfile() {
  const profiles: ProfileProps[] = [
    {
      image: avatar,
      username: "John Doe",
      dateOfBirth: "01/01/2000",
      studentID: "123456789",
    },
    {
      image: avatar,
      username: "John Doe",
      dateOfBirth: "01/01/2000",
      studentID: "3423432423",
    },
    {
      image: avatar,
      username: "John Doe",
      dateOfBirth: "01/01/2000",
      studentID: "3423432423",
    },
    {
      image: avatar,
      username: "John Doe",
      dateOfBirth: "01/01/2000",
      studentID: "3423432423",
    },
    {
      image: avatar,
      username: "John Doe",
      dateOfBirth: "01/01/2000",
      studentID: "3423432423",
    },
  ];

  return (
    <div className="h-full">
      <Head>
        <title>{APP.APP_NAME} | Employer | View Student profile</title>
      </Head>
      <main className="container flex flex-col items-center justify-center mt-32">
        {/* <SearchInput
          layoutClassName="mb-60 w-72"
          placeholder="Search by student code"
        /> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile: ProfileProps, i) => {
            return (
              <div key={i} className="mb-24">
                <Profile {...profile} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default StudentProfile;
