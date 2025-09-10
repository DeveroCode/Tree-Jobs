export default function CategorieSelectMobile() {
  return (
    <div className="md:hidden w-full overflow-x-auto bg-white py-3 px-4 shadow-sm gap-2 flex justify-between items-center">
      <select name="category" id="category" className="bg-gray-50 rounded-md p-2 focus:ring-0 focus:outline-none">
        <option value="" disabled selected>Category</option>
        <option value="all">All</option>
        <option value="engineering">Engineering</option>
        <option value="design">Design</option>
      </select>
      <select name="category" id="category" className="bg-gray-50 rounded-md p-2 focus:ring-0 focus:outline-none">
        <option value="" disabled selected>Location</option>
        <option value="all">All</option>
        <option value="nvo_casas_grandes">Nvo. Casas Grandes</option>
        <option value="chihuahua">Chihuahua</option>
        <option value="cd_juarez">CD. Juarez</option>
        <option value="el_pueblo">El Pueblo</option>
      </select>
      <select name="category" id="category" className="bg-gray-50 rounded-md p-2 focus:ring-0 focus:outline-none">
        <option value="" disabled selected>💵</option>
        <option value="all">All</option>
        <option value="nvo_casas_grandes">1200</option>
        <option value="chihuahua">1200 - 1500</option>
        <option value="cd_juarez">1500 - 2500</option>
        <option value="el_pueblo">2500+</option>
      </select>
    </div>
  )
}
