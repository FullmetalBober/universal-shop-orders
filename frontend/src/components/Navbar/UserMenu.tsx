const image = null;

const UserMenu = () => {
  //TODO: get image from auth kit

  return (
    <div class='dropdown dropdown-end'>
      <label tabIndex={0} class='avatar placeholder btn btn-circle btn-ghost'>
        <div class='w-10 rounded-full bg-neutral-focus text-neutral-content'>
          {image && <img src={image} />}
          {!image && <span class='text-3xl'>T</span>}
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
  );
};

export default UserMenu;
