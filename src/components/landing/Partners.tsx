// Partners.tsx
import type { Partners } from "data/patners";

type PartnersProps = {
  partner: Partners;
};

export default function Partners({ partner }: PartnersProps) {
  return (
    <div className="flex items-center justify-center">
      <img
        src={partner.image}
        alt={partner.name}
        className="w-32 h-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
      />
    </div>
  );
}
