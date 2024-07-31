import React from "react";
import ErrorTag from "../ErrorTag/ErrorTag";

interface BadgeProps {
  response: string;
  prompt: string;
}
// This component renders the calories and prompt or an error tag if info is not good
const Badge: React.FC<BadgeProps> = ({ response, prompt }) => {
  return (
    <div className="flex items-center justify-center">
      {/* {This renders the prompt and response if response is not requesting more data} */}
      <div className="stat flex flex-col items-center justify-center h-24">
        {response && prompt && !isNaN(Number(response)) ? (
          <>
            <div className="stat-title text-center">Calories found in {prompt}:</div>
            <div className="stat-value text-logo-orange text-center">
              {response}
            </div>
          </>
        ) : (
          response && (
            <div>
              {/* {This renders the ErrorTag if api did not return calories} */}
              <div>
                <ErrorTag />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Badge;
