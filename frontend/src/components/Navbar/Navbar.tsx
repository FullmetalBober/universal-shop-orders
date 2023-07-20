const img = null;

const Navbar = () => {
  return (
    <div class='flex justify-center'>
      <nav class='navbar sticky top-0 bg-base-100 md:w-[1500px] '>
        <div class='navbar-start'>
          <a class='btn btn-ghost text-xl normal-case'>F5</a>
        </div>
        <div class='navbar-center md:w-[650px]'>
          <div class='form-control w-full'>
            <input
              type='text'
              placeholder='Search'
              class='input input-bordered'
            />
          </div>
        </div>
        <div class='navbar-end gap-2'>
          <div class='dropdown-end dropdown'>
            <label
              tabIndex={0}
              class='avatar placeholder btn btn-circle btn-ghost'
            >
              <div class='w-10 rounded-full bg-neutral-focus text-neutral-content'>
                {img && <img src={img} />}
                {!img && <span class='text-3xl'>T</span>}
              </div>
            </label>
            <ul
              tabIndex={0}
              class='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
            >
              <li>
                <a class='justify-between'>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
