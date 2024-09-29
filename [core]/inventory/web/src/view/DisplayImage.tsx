import { useRouter } from "../providers/RouterProvider";

export const DisplayImage = () => {
  const { context } = useRouter();

  const { url } = context["display-image"] as { url: string };

  return <img src={url} className="mt-64"/>;
};
