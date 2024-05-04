import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useHandleOrder = (
  isSignedIn: boolean | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  menuId: string,
  quantity: number
) => {
  const router = useRouter();

  const handleOrder = async () => {
    try {
      setLoading(true);
      if (!isSignedIn) {
        router.push("/sign-in");
      } else {
        const data = { menuId, quantity };
        const response = await axios.post("/api/cart", {
          data,
        });

        toast.success(response.data.message);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something error");
    } finally {
      setLoading(false);
    }
  };

  return handleOrder;
};

export default useHandleOrder;
