import { useRouter } from "@lib/preact-shared/providers/RouterProvider";

export const BoosterView = () => {
  const { getStepContext } = useRouter();

  const { images } = getStepContext<{ images: string[] }>("booster-view");

  return (
    <div className="flex justify-center w-full h-full">
      <div class="grid gap-4 grid-cols-3 grid-rows-1 mt-64">
        {images.map((url) => (
          <img src={url} className="mt-64" />
        ))}
      </div>
    </div>
  );
};
