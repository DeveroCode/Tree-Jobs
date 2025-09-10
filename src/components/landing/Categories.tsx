import type { Categories } from "data/categories";

type CategoriesProps = {
  cat: Categories;
};

export default function Categories({ cat }: CategoriesProps) {
  return (
    <div className="category-card bg-purple-200/10 transition-all duration-300 cursor-pointer py-5 px-6 flex items-center gap-3 rounded-2xl shadow-lg shadow-purple-200 hover:scale-105">
      {cat.icon && <cat.icon className="w-6 h-6 text-purple-600" />}
      <p className="font-medium text-gray-800">{cat.name}</p>
    </div>
  );
}
