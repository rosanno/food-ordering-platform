import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useFavoriteHandler = (
  item: any,
  isSignedIn: boolean | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const router = useRouter();

  const handleFavorite = async () => {
    try {
      setLoading(true);
      if (!isSignedIn) {
        router.push("/sign-in");
      } else {
        const response = await axios.post(
          `/api/favorites`,
          {
            menuId: item?.id,
          }
        );

        toast.success(response.data.message);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return handleFavorite;
};

export default useFavoriteHandler;
