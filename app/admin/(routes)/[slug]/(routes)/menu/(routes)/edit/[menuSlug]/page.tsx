import prisma from "@/lib/prisma";

import Card from "@/components/ui/card";
import Header from "@/components/ui/header";
import MenuForm from "@/components/ui/menu-form";

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
    <Card>
      <Header title="Edit Menu" />
      <MenuForm initialData={menu} />
    </Card>
  );
};

export default UpdateMenuPage;
