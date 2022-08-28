import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  SessionDataState,
  ShowingModalState,
  TransferringIdState,
} from "../../data/globalState";
import { createEventPending, Metadata } from "../../service/dao-service";
import { transferNFT } from "../../service/nft-service";
import Button from "../common/Button";
import HookForm from "../common/HookForm";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";

const CreatePendingEventModal = () => {
  const [showingModal, setShowingModal] = useRecoilState(ShowingModalState);
  const sessionData = useRecoilValue(SessionDataState);
  const transferringId = useRecoilValue(TransferringIdState);
  const [loading, setLoading] = useState(false);
  const [toPrincipalId, setToPrincipalId] = useState("");

  const defaultValues = {
    title: "",
    description: "",
    dueDate: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const textInputs = [
    {
      placeholder: "Enter Title",
      name: "title",
    },
    {
      placeholder: "Enter description",
      name: "description",
    },
    {
      placeholder: "Select due Date",
      name: "dueDate",
      type: "datetime-local",
    },
  ];

  const handleCreate = async () => {
    if (formValues.title.length === 0) {
      toast.error("Title is required");
      return;
    }
    if (formValues.description.length === 0) {
      toast.error("Description is required");
      return;
    }

    if (formValues.dueDate.length === 0) {
      toast.error("Due Date is required");
      return;
    }

    setLoading(true);
    try {
      const fromPrincipalId = sessionData?.principalId as string;
      const timePending =
        Math.floor(new Date(formValues.dueDate).getTime()) - Date.now();
      const metadata: Metadata = {
        title: formValues.title,
        description: formValues.description,
        timePending: timePending,
      };

      const createResponse = await createEventPending(
        fromPrincipalId,
        metadata
      );

      console.log(createResponse);
      if (createResponse.Ok) {
        toast.success("Event created successfully");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={showingModal.includes("CreatePendingEvent")}
      onClose={() => {
        setShowingModal("");
      }}
      className="flex flex-col items-center justify-center"
    >
      <HookForm
        className="grid-cols-1"
        textInputs={textInputs}
        defaultValues={defaultValues}
        onTextChange={(values) => {
          setFormValues(values as any);
        }}
      />
      <div className="">
        <Button onClick={handleCreate} loading={loading}>
          Create Pending Event
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePendingEventModal;
