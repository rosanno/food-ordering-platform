"use client";

type Props = {
  label: string;
  description: string;
};

const FormHeader = ({ label, description }: Props) => {
  return (
    <section className="mt-2">
      <div className="space-y-0.5">
        <h2 className="text-lg font-semibold">{label}</h2>
        <h3 className="text-[12px] text-muted-foreground">
          {description}
        </h3>
      </div>
    </section>
  );
};

export default FormHeader;
