import { useRouter } from "@lib/preact-shared/providers/RouterProvider";

export const DisplayImage = () => {
  const { getStepContext } = useRouter();

  const { url } = getStepContext<{ url: string }>("display-image");

  return (
    <div className="flex justify-center w-full h-full">
      <img src={url} className="mt-64" />
    </div>
  );
};
