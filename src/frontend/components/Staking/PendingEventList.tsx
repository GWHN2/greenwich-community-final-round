import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  IsStakeholderState,
  SessionDataState,
  ShowingModalState,
  VotedStakeHolderState as VotedStakeholderState,
} from "../../data/globalState";
import { getAllEventPending, voteCreateEvent } from "../../service/dao-service";
import { shortenAddress } from "../../utils/stringsFunction";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Titles from "../common/Titles";

export interface ProfileProps {
  image: any;
  username: string;
  dateOfBirth: string;
  StudentID: string;
  numOfToken: number;
}

const PendingEventList = () => {
  const sectionData = useRecoilValue(SessionDataState);
  const [pendingEvents, setPendingEvents] = useState<any[]>([]);
  const setShowingModal = useSetRecoilState(ShowingModalState);
  const [loadingList, setLoadingList] = useState(false);
  const isStakeholder = useRecoilValue(IsStakeholderState);
  const [isVoting, setIsVoting] = useState(false);
  const [votedStakeholder, setVotedStakeholder] = useRecoilState(
    VotedStakeholderState
  );

  useEffect(() => {
    (async () => {
      setLoadingList(true);
      try {
        const _pendingEvents = await getAllEventPending();
        const mappedPendingEvents = _pendingEvents.map((event: any) => ({
          ...event[1],
          eventPendingId: event[0],
          eventmaker: event[1].eventmaker.toString(),
        }));
        setPendingEvents(mappedPendingEvents);
      } catch (error) {
        console.log(error);
      }
      setLoadingList(false);
    })();
  }, []);

  const handleVote = async (eventPendingId: number, vote: "Up" | "Down") => {
    setIsVoting(true);
    try {
      const voteResponse = await voteCreateEvent(
        sectionData?.principalId as string,
        eventPendingId,
        vote
      );

      if (voteResponse.Ok) {
        setVotedStakeholder([
          ...votedStakeholder,
          {
            eventPendingId: eventPendingId,
            principalId: sectionData?.principalId as string,
          },
        ]);

        toast.success("You have voted");
      }
    } catch (error) {
      console.log(error);
    }
    setIsVoting(false);
  };

  if (loadingList) {
    return <Spinner />;
  }
  if (!isStakeholder) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <Button onClick={() => setShowingModal("CreatePendingEvent")}>
        Create pending Event
      </Button>

      <Titles title="Pending Event List" className="text-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pendingEvents &&
          pendingEvents.length > 0 &&
          pendingEvents.map((event, index) => {
            const indexOf = votedStakeholder.findIndex((voted) => {
              return (
                voted.eventPendingId === event.eventPendingId &&
                voted.principalId === sectionData?.principalId
              );
            });
            const isVoted = indexOf !== -1;
            return (
              <div
                className="flex flex-col items-center justify-around p-4 rounded-lg shadow-lg dropdown-container"
                key={index}
              >
                <span className="text-lg font-semibold">
                  Name: {event.title}
                </span>
                <span className="">Description: {event.description}</span>
                <span>Maker: {shortenAddress(event.eventmaker)}</span>
                <div className="flex flex-row items-center justify-around w-full">
                  <span>Approved: {event.voteUp.toString()}</span>
                  <span>Rejected: {event.voteDown.toString()}</span>
                </div>
                <div className="flex flex-row items-center justify-around w-full">
                  <Button
                    disabled={isVoting || isVoted}
                    onClick={async () => {
                      await handleVote(event.eventPendingId, "Up");
                    }}
                  >
                    <ChevronDoubleUpIcon className="w-5" />
                  </Button>
                  <Button
                    disabled={isVoting || isVoted}
                    onClick={async () => {
                      await handleVote(event.eventPendingId, "Down");
                    }}
                  >
                    <ChevronDoubleDownIcon className="w-5" />
                  </Button>
                </div>
                <span>
                  Vote end at{" "}
                  {new Date(
                    Date.now() + +event.timePending.toString()
                  ).toLocaleString()}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PendingEventList;
