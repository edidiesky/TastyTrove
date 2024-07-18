import React from "react";

export default function Bottom() {
  return (
    <div>
      <div className="w-100 flex items-start gap-16 justify-between topWrapper">
        <div className="flex flex-col gap-8 flex-1">
          <div className="family3 text-4xl uppercase text-light text-dark">
            Additional informations
          </div>
          <h4 className="family2 md:pl-20 md:pr-8 leading-[1.5] text-xl text-light text-dark">
            Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec
            sollicitudin molestie malesuada. Proin eget tortor risus. Nulla
            porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id
            imperdiet et, porttitor at sem. Donec sollicitudin molestie
            malesuada.
          </h4>
        </div>
        <div style={{ gap: ".1rem" }} className="flex flex-col flex-1">
          <div className="details flex" style={{ gap: ".1rem" }}>
            <div className="detailsInfoL text-2xl text-start family3">
              Calories
            </div>
            <div className="detailsInfoR text-xl family2">860</div>
          </div>
          <div className="details flex" style={{ gap: ".1rem" }}>
            <div className="detailsInfoL text-2xl text-start family3">
              Lactose free
            </div>
            <div className="detailsInfoR text-xl family2">860</div>
          </div>
          <div className="details flex" style={{ gap: ".1rem" }}>
            <div className="detailsInfoL text-2xl text-start family3">
              Gluten free
            </div>
            <div className="detailsInfoR text-xl family2">860</div>
          </div>
        </div>
      </div>
    </div>
  );
}
