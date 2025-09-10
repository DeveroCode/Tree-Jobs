export default function AsideFilterMobile() {
  return (
    <aside className="block md:hidden w-full mt-5 px-4">
      <p className="font-semibold mb-2 text-gray-700">Filters</p>

      {/* Job Type */}
      <div className="mb-4">
        <label className="block text-gray-500 mb-1">Job Type</label>
        <select className="w-full border border-gray-300 rounded-md p-2">
          <option value="">Select job type</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      {/* Salary */}
      <div className="mb-4">
        <label className="block text-gray-500 mb-1">Salary</label>
        <select className="w-full border border-gray-300 rounded-md p-2">
          <option value="">Select salary range</option>
          <option value="0-500">$0 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000-2000">$1000 - $2000</option>
        </select>
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block text-gray-500 mb-1">City</label>
        <select className="w-full border border-gray-300 rounded-md p-2">
          <option value="">Select city</option>
          <option value="chihuahua">Chihuahua</option>
          <option value="cdjuarez">CD. Juárez</option>
          <option value="novocasasgrandes">Nvo. Casas Grandes</option>
          <option value="casasgrandes">Casas Grandes</option>
        </select>
      </div>
    </aside>
  );
}
