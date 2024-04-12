"use client";

import CommonBreadcrumbs from "./common-breadcrumbs";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="space-y-10 pb-5">
      <div className="flex items-center gap-7">
        <h1 className="text-lg tracking-wide">{title}</h1>
        <CommonBreadcrumbs />
      </div>
    </header>
  );
};

export default Header;
