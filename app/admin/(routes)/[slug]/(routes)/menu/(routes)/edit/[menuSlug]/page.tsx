import Header from "@/components/ui/header";
import MenuForm from "@/components/ui/menu-form";
import prisma from "@/lib/prisma";

const UpdateMenuPage = async ({
  params,
}: {
  params: { menuSlug: string };
}) => {
  const menu = await prisma.menu.findFirst({
    where: {
      slug: params.menuSlug,
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
