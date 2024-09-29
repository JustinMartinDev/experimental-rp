import { useRouter } from "../providers/RouterProvider";

export const DisplayImage = () => {
  const { context } = useRouter();

  console.log("context", context);

  return <div>My image</div>;
};
