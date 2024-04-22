import Header from "@/components/ui/header";
import MenuForm from "@/components/ui/menu-form";
import prisma from "@/lib/prisma";

const UpdateMenuPage = async ({
  params,
}: {
  params: { menuId: string };
}) => {
  const menu = await prisma.menu.findUnique({
    where: {
      id: params.menuId,
    },
  });

  return (
    <>
      <Header title="Edit Menu" />
      <MenuForm initialData={menu} />
    </>
  );
};

export default UpdateMenuPage;
