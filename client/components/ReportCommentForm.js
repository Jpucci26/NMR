import { useState } from "react";
import { currentUserAtom } from "../atoms/currentUseratom";
import { atom, useAtom } from "jotai";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const ReportCommentForm = ({ report }) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const createComment = async () => {
    const formData = {
      comment: comment,
    };
    const res = await fetch(`/api/reports/${report.id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  };

  const queryClient = useQueryClient();
  const { mutate, data } = useMutation({
    mutationKey: "Create comment",
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries();
      setComment("");
      setIsDisabled(false);
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate();
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={currentUser?.avatar}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form
          action="#"
          className="relative"
          onSubmit={handleSubmit}
          disabled={isDisabled}
        >
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              disabled={isDisabled}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
