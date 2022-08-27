import dynamic from "next/dynamic";
import React, { useState } from "react";
import UploadingFilesToIPFS from "../Rating/UploadingFilesToIPFS";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import Button from "../common/Button";
import { SessionDataState } from "../../data/globalState";
import { useRecoilValue } from "recoil";
import { chargeFee } from "../../service/token-service";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const CreateAdvertisement = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [details, setDetails] = useState("");
  const sessiondata = useRecoilValue(SessionDataState);

  const handleChargeFee = async () => {
    try {
      const feeResult = await chargeFee(
        sessiondata?.principalId as string,
        300
      );
    } catch (error) {
      console.log(error);
    }
  };

  const mdParser = new MarkdownIt();
  return (
    <div className="p-4 mb-20 bg-white rounded-lg shadow-xl">
      <p className="py-4 text-2xl font-semibold text-center">
        Make an Advertisement cost <span className="gradient-text">300</span>{" "}
        tokens
      </p>
      <div className="mt-10">
        <UploadingFilesToIPFS
          callback={(metaData) => {
            setImageUrl(metaData.url);
          }}
        />
        <p>Details:</p>
        <MdEditor
          className="w-full h-64 mt-2"
          renderHTML={(text) => mdParser.render(text)}
          value={details}
          onChange={(text) => setDetails(text.text)}
        />
      </div>
      <Button>Make advertisement</Button>
    </div>
  );
};

export default CreateAdvertisement;
