"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

const CommonBreadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter((item) => item !== "");

  const items = segments.map((item, index) => {
    return (
      <React.Fragment key={item}>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {index === segments.length - 1 ? (
            <BreadcrumbPage>{item}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              href={`/${segments
                .slice(0, index + 1)
                .join("/")}`}
              className="capitalize"
            >
              {item}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CommonBreadcrumbs;
