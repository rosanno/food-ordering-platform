import prisma from "@/lib/prisma";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <CardHeader>
        <CardTitle>Edit menu</CardTitle>
      </CardHeader>
      <CardContent>
        <MenuForm initialData={menu} />
      </CardContent>
    </Card>
  );
};

export default UpdateMenuPage;
