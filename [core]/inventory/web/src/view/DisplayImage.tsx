import { useRouter } from "@lib/react-shared/providers/RouterProvider";

export const DisplayImage = () => {
  const { getStepContext } = useRouter();

  const { url } = getStepContext<{ url: string }>("display-image");

  return <img src={url} className="mt-64" />;
};
