import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const EmptyState: React.FC<Props> = ({
  title,
  description,
  image = "/empty.svg",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src={image} alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
export default EmptyState;
